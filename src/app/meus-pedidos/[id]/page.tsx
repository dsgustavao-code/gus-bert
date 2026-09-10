'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Package, Truck, Clock, CheckCircle, ArrowLeft } from 'lucide-react'

export default function OrderTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }

    fetchOrder()
  }, [params.id, session, router])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      const data = await response.json()
      
      if (response.ok) {
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'processing':
        return <Package className="w-6 h-6 text-blue-600" />
      case 'shipped':
        return <Truck className="w-6 h-6 text-purple-600" />
      default:
        return <Clock className="w-6 h-6 text-gray-600" />
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
          <p className="text-center">Carregando pedido...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Pedido não encontrado</p>
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
          {/* Back Button */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
          >
            <ArrowLeft size={20} />
            Voltar para a loja
          </button>

          {/* Order Header */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-black">Pedido #{order.id.slice(0, 8).toUpperCase()}</h1>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="font-medium text-black">{getStatusText(order.status)}</span>
              </div>
            </div>
            <p className="text-gray-600">
              Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')} às {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
            </p>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Acompanhamento</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${order.status === 'paid' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <p className="font-medium text-black">Pedido Confirmado</p>
                  <p className="text-sm text-gray-600">Pagamento recebido</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <p className="font-medium text-black">Em Processamento</p>
                  <p className="text-sm text-gray-600">Separando itens para envio</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <p className="font-medium text-black">Enviado</p>
                  <p className="text-sm text-gray-600">Pedido a caminho</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <p className="font-medium text-black">Entregue</p>
                  <p className="text-sm text-gray-600">Pedido entregue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Itens do Pedido</h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Qtd: {item.quantity} | Tamanho: {item.size} | Cor: {item.color}
                    </p>
                    <p className="font-medium text-black">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Endereço de Entrega</h2>
            <div className="space-y-2">
              <p className="text-black">{order.customerName}</p>
              <p className="text-gray-600">{order.address}, {order.number}</p>
              {order.complement && <p className="text-gray-600">{order.complement}</p>}
              <p className="text-gray-600">{order.neighborhood}</p>
              <p className="text-gray-600">{order.city} - {order.state}</p>
              <p className="text-gray-600">CEP: {order.cep}</p>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-black">Total</span>
              <span className="text-2xl font-bold text-black">R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
