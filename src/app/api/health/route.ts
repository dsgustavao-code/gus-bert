import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test connection
    await prisma.$connect()
    
    // Check if tables exist by trying to query them
    const categories = await prisma.category.findMany()
    const products = await prisma.product.findMany()
    const users = await prisma.user.findMany()
    
    return NextResponse.json({
      status: 'success',
      database: 'connected',
      tables: {
        categories: categories.length,
        products: products.length,
        users: users.length
      },
      sampleData: {
        categories: categories.slice(0, 3),
        users: users.slice(0, 3)
      }
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      database: 'disconnected'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
