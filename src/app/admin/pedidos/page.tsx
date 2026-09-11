'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { Search, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchOrders()
    
    // Atualizar pedidos em tempo real a cada 30 segundos
    const interval = setInterval(() => {
      fetchOrders()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Erro ao atualizar status')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <p>Carregando pedidos...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">Pedidos</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option value="">Todos os status</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-black"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}