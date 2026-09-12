import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Server is working',
    env: {
      database: process.env.DATABASE_URL ? 'configured' : 'missing',
      databasePrefix: process.env.DATABASE_URL?.substring(0, 30),
      timestamp: new Date().toISOString()
    }
  })
}
