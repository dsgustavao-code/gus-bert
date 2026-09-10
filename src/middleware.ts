import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')

  // Protect admin routes (except login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Redirect logged-in admin away from login page
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}