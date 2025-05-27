import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import Resume from '@/models/Resume'
import User from '@/models/User'

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Helper function to get user from token
async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    await connectDB()
    return await User.findById(decoded.userId)
  } catch (error) {
    return null
  }
}

// Input validation schema for creating/updating resumes
const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  template: z.enum(['classic', 'modern', 'minimal', 'developer', 'creative', 'startup']),
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

// GET /api/resumes - List all resumes for the current user
export async function GET() {
  try {
    const token = (await cookies()).get('auth_token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    await connectDB()
    const resumes = await Resume.find({ userId: user._id })
      .select('-__v')
      .sort({ updatedAt: -1 })

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error('List resumes error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/resumes - Create a new resume
export async function POST(request: Request) {
  try {
    const token = (await cookies()).get('auth_token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = resumeSchema.parse(body)

    await connectDB()
    const resume = await Resume.create({
      ...validatedData,
      userId: user._id,
    })

    return NextResponse.json({
      message: 'Resume created successfully',
      resume,
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create resume error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 