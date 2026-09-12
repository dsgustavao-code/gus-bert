import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    console.log('=== API /api/products START ===')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 20))
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    console.log('Query params:', { category, search, featured, sortBy, sortOrder })

    const where: any = {
      active: true
    }

    if (category) {
      where.categoryId = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (featured === 'true') {
      where.featured = true
    }

    console.log('Query where clause:', JSON.stringify(where))

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      }
    })
    
    console.log('Products fetched successfully:', products.length)
    console.log('=== API /api/products END ===')

    return NextResponse.json(products)
  } catch (error) {
    console.error('=== API /api/products ERROR ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available')
    console.error('Prisma error code:', (error as any).code)
    console.error('Full error:', error)
    console.error('=== API /api/products ERROR END ===')
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        details: errorMessage,
        database: process.env.DATABASE_URL ? 'configured' : 'missing',
        errorType: error instanceof Error ? error.constructor.name : typeof error
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      slug,
      categoryId,
      brand,
      price,
      promotionalPrice,
      description,
      stock,
      shoeSizes,
      clothingSizes,
      colors,
      featured,
      purchaseLink,
      images
    } = body

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        categoryId,
        brand,
        price,
        promotionalPrice,
        description,
        stock,
        shoeSizes,
        clothingSizes,
        colors,
        featured,
        purchaseLink,
        images: {
          create: images.map((img: { url: string; order: number }) => ({
            url: img.url,
            order: img.order
          }))
        }
      },
      include: {
        category: true,
        images: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}