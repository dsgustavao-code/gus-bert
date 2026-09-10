import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import stripe from '@/lib/stripe'

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Find order by userId and check metadata
    const order = await prisma.order.findFirst({
      where: {
        userId: session.metadata?.userId,
        customerEmail: session.metadata?.customerEmail,
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
