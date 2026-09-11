'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import AdminLayout from '@/components/AdminLayout'
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp,
  ArrowRight
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    totalSales: 0,
    todaySales: 0,
    monthSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockProducts: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch orders
      const ordersResponse = await fetch('/api/orders')
      const orders = await ordersResponse.json()

      // Fetch products
      const productsResponse = await fetch('/api/products')
      const products = await productsResponse.json()

      // Calculate stats
      const totalSales = orders.reduce((sum: number, order: any) => sum + order.total, 0)
      const today = new Date().toDateString()
      const todaySales = orders
        .filter((order: any) => new Date(order.createdAt).toDateString() === today)
        .reduce((sum: number, order: any) => sum + order.total, 0)
      
      const thisMonth = new Date().getMonth()
      const monthSales = orders
        .filter((order: any) => new Date(order.createdAt).getMonth() === thisMonth)
        .reduce((sum: number, order: any) => sum + order.total, 0)

      const lowStockProducts = products.filter((p: any) => p.stock < 5 && p.stock > 0).length

      setStats({
        totalSales,
        todaySales,
        monthSales,
        totalOrders: orders.length,
        totalProducts: products.length,
        lowStockProducts
      })

      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Carregando dashboard...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo, {session?.user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="text-green-600" size={24} />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-2xl font-bold">R$ {stats.totalSales.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Vendas totais</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-blue-600" size={24} />
              <span className="text-sm text-gray-500">Hoje</span>
            </div>
            <p className="text-2xl font-bold">R$ {stats.todaySales.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Vendas de hoje</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="text-purple-600" size={24} />
              <span className="text-sm text-gray-500">Pedidos</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-gray-600">Total de pedidos</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Package className="text-orange-600" size={24} />
              <span className="text-sm text-gray-500">Produtos</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-gray-600">Cadastrados</p>
          </div>
        </div>

        {/* Alerts */}
        {stats.lowStockProducts > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800 font-semibold">
              ⚠️ {stats.lowStockProducts} produtos com estoque baixo
            </p>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Pedidos Recentes</h2>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum pedido ainda</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {order.total.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'approved' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-center">
              <a
                href="/admin/pedidos"
                className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
              >
                Ver todos os pedidos
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}