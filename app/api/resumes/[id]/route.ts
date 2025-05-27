import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import Resume, { IResume } from '@/models/Resume'
import User, { IUser } from '@/models/User'
import { z } from 'zod'

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Helper function to get user from token
async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    await connectDB()
    const user = await User.findById(decoded.userId)
    return user
  } catch (error) {
    return null
  }
}

// Input validation schema for updating resumes
const updateResumeSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  template: z.enum(['classic', 'modern', 'minimal', 'developer', 'creative', 'startup']).optional(),
  status: z.enum(['draft', 'published']).optional(),
  personalInfo: z.object({
    fullName: z.string().optional(),
    jobTitle: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    summary: z.string().optional(),
  }).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })).optional(),
  projects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.string(),
    link: z.string().url().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    gpa: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
})

// GET /api/resumes/[id] - Get a specific resume
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      )
    }

    await connectDB()
    const resume = await Resume.findOne({
      _id: params.id,
      userId: user._id,
    }).select('-__v')

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/resumes/[id] - Update a specific resume
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateResumeSchema.parse(body)

    await connectDB()
    const resume = await Resume.findOneAndUpdate(
      {
        _id: params.id,
        userId: user._id,
      },
      { $set: validatedData },
      { new: true, runValidators: true }
    ).select('-__v')

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/resumes/[id] - Delete a specific resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = (await cookies()).get('token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      )
    }

    await connectDB()
    const resume = await Resume.findOneAndDelete({
      _id: params.id,
      userId: user._id,
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 