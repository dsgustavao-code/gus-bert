'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { ArrowLeft, Package, MapPin, CreditCard, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      const data = await response.json()
      setOrder(data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      await fetch(`/api/orders/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      setOrder({ ...order, status: newStatus })
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Erro ao atualizar status')
    }
  }

  const statusOptions = [
    { value: 'pending', label: 'Aguardando Pagamento', color: 'yellow' },
    { value: 'approved', label: 'Pagamento Aprovado', color: 'green' },
    { value: 'preparing', label: 'Em Preparação', color: 'blue' },
    { value: 'shipped', label: 'Enviado', color: 'purple' },
    { value: 'delivered', label: 'Entregue', color: 'green' },
    { value: 'cancelled', label: 'Cancelado', color: 'red' }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Carregando pedido...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Pedido não encontrado</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-3xl font-bold">Pedido #{order.id.slice(0, 8)}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package size={24} />
                Informações do Cliente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-semibold">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-semibold">{order.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin size={24} />
                Endereço de Entrega
              </h2>
              <div className="space-y-2">
                <p className="font-semibold">{order.address}, {order.number}</p>
                {order.complement && <p className="text-gray-600">{order.complement}</p>}
                <p className="text-gray-600">{order.neighborhood}</p>
                <p className="text-gray-600">{order.city} - {order.state}</p>
                <p className="text-gray-600">CEP: {order.cep}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{item.product?.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.size && `Tamanho: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `Cor: ${item.color}`}
                      </p>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                      {item.product?.purchaseLink && (
                        <a
                          href={item.product.purchaseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={14} />
                          Link de Compra
                        </a>
                      )}
                    </div>
                    <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Status do Pedido</h2>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard size={24} />
                Pagamento
              </h2>
              <p className="text-gray-600">{order.paymentMethod}</p>
            </div>

            {/* Total */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Resumo</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">R$ {(order.total - order.shipping).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-semibold">R$ {order.shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Date */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Data do Pedido</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString('pt-BR')} às{' '}
                {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}