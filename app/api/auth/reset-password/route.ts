import { NextResponse } from 'next/server'
import { z } from 'zod'
import connectDB from '@/lib/db'
import User from '@/models/User'

// Input validation schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = resetPasswordSchema.parse(body)
    
    await connectDB()
    
    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: validatedData.token,
      resetTokenExpiry: { $gt: Date.now() },
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }
    
    // Update password and clear reset token
    user.password = validatedData.password // Will be hashed by the pre-save hook
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()
    
    return NextResponse.json({
      message: 'Password has been reset successfully',
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 