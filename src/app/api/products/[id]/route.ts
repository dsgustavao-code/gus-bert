import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching product with ID:', params.id)
    
    // Try to find by ID first, then by slug
    let product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!product) {
      console.log('Product not found by ID, trying slug:', params.id)
      product = await prisma.product.findUnique({
        where: { slug: params.id },
        include: {
          category: true,
          images: {
            orderBy: { order: 'asc' }
          }
        }
      })
    }

    if (!product) {
      console.log('Product not found')
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    console.log('Product found:', product.name)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      active,
      featured,
      purchaseLink,
      images
    } = body

    // First, delete existing images
    await prisma.productImage.deleteMany({
      where: { productId: params.id }
    })

    const product = await prisma.product.update({
      where: { id: params.id },
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
        active,
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

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}