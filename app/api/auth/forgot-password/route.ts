import { NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import connectDB from '@/lib/db'
import User from '@/models/User'

// Input validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// TODO: Replace with actual email service
async function sendPasswordResetEmail(email: string, resetToken: string) {
  // This is a mock implementation
  // In production, use a service like SendGrid, AWS SES, or Nodemailer
  console.log(`Password reset email would be sent to ${email} with token: ${resetToken}`);
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = forgotPasswordSchema.parse(body)
    
    await connectDB()
    
    // Find user by email
    const user = await User.findOne({ email: validatedData.email })
    
    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link',
      })
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now
    
    // Save reset token to user
    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()
    
    // Send reset email
    await sendPasswordResetEmail(user.email, resetToken)
    
    return NextResponse.json({
      message: 'If an account exists with this email, you will receive a password reset link',
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 