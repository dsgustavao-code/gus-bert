'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Package, Truck, Clock } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      router.push('/')
      return
    }

    // Fetch order details
    fetchOrderDetails(sessionId)
  }, [searchParams, router])

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/orders/session/${sessionId}`)
      const data = await response.json()
      
      if (response.ok) {
        setOrder(data)
        // Clear cart
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cart-updated'))
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Carregando informações do pedido...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-black">Pedido Confirmado!</h1>
            <p className="text-gray-600">Obrigado pela sua compra</p>
          </div>

          {order && (
            <>
              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-black">Detalhes do Pedido</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {order.status === 'paid' ? 'Pago' : 'Pendente'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Número do Pedido:</span>
                    <span className="font-medium text-black">{order.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-medium text-black">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forma de Pagamento:</span>
                    <span className="font-medium text-black">
                      {order.paymentMethod === 'pix' ? 'Pix' : 'Cartão de Crédito'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-black">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-black">Informações de Entrega</h2>
                <div className="space-y-2">
                  <p className="text-black">{order.customerName}</p>
                  <p className="text-gray-600">{order.address}, {order.number}</p>
                  {order.complement && <p className="text-gray-600">{order.complement}</p>}
                  <p className="text-gray-600">{order.neighborhood}</p>
                  <p className="text-gray-600">{order.city} - {order.state}</p>
                  <p className="text-gray-600">CEP: {order.cep}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-black">Itens do Pedido</h2>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-black">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qtd: {item.quantity} | Tamanho: {item.size} | Cor: {item.color}
                        </p>
                      </div>
                      <span className="font-medium text-black">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Acompanhamento do Pedido</h3>
                    <p className="text-gray-600 text-sm">
                      Seu pedido está sendo processado. Você receberá atualizações sobre o status da entrega por email.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={() => router.push(`/meus-pedidos/${order.id}`)}
                  className="flex-1 py-3 border border-black text-black rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Acompanhar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
