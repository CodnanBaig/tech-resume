import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Clear the auth cookie
    cookies().delete('auth_token')
    
    return NextResponse.json({
      message: 'Logged out successfully'
    })
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 