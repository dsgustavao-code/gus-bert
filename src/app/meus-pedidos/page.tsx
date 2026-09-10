'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Package, CheckCircle, Clock, ArrowRight } from 'lucide-react'

export default function MyOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    fetchOrders()
  }, [status, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders/my-orders')
      const data = await response.json()
      
      if (response.ok) {
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago'
      case 'processing':
        return 'Em Processamento'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregue'
      default:
        return 'Pendente'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Carregando pedidos...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black">Meus Pedidos</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">Você ainda não tem pedidos</p>
              <button
                onClick={() => router.push('/produtos')}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Começar a Comprar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(`/meus-pedidos/${order.id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-semibold text-black">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-black">
                        {getStatusText(order.status)}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                    </p>
                    <p className="font-bold text-black">R$ {order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
