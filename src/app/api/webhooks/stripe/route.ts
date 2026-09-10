import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import stripe from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature') || ''

    let event: any

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      // Create order in database
      const order = await prisma.$transaction(async (tx) => {
        const metadata = session.metadata
        const items = JSON.parse(metadata.items || '[]')

        const newOrder = await tx.order.create({
          data: {
            customerName: metadata.customerName,
            customerEmail: metadata.customerEmail,
            customerPhone: metadata.customerPhone,
            cep: metadata.cep,
            state: metadata.state,
            city: metadata.city,
            address: metadata.address,
            number: metadata.number,
            complement: metadata.complement || null,
            neighborhood: metadata.neighborhood,
            total: session.amount_total / 100, // Convert cents to BRL
            shipping: 20, // Flat shipping rate
            paymentMethod: session.payment_method_types?.[0] === 'pix' ? 'pix' : 'credit_card',
            status: 'paid',
            userId: metadata.userId,
            items: {
              create: items.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color
              }))
            }
          },
          include: {
            items: true
          }
        })

        // Update stock for each product
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        }

        return newOrder
      })

      console.log('Order created:', order.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
