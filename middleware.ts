import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// JWT secret key - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// List of public routes that don't require authentication
const publicRoutes = [
  '/', // home page
  '/login',
  '/signup',
  '/api/auth/login',
  '/api/auth/signup',
  '/builder',
  '/templates',
  '/examples',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get the token from the cookie
  const token = request.cookies.get('auth_token')?.value

  // If no token is present, redirect to login
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(JWT_SECRET)
    await jwtVerify(token, secret)
    // Token is valid, proceed with the request
    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }
}

// Only run middleware on protected routes
export const config = {
  matcher: [
    '/profile',
    '/profile/(.*)',
    '/api/user/profile',
    '/api/user/profile/(.*)',
  ],
} 