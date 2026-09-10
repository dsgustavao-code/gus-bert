'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { AlertTriangle, Package } from 'lucide-react'

export default function AdminStockPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const lowStockProducts = products.filter(p => p.stock < 5)
  const outOfStockProducts = products.filter(p => p.stock === 0)

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Carregando estoque...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">Gerenciamento de Estoque</h1>

        {/* Alerts */}
        {outOfStockProducts.length > 0 && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-600" size={20} />
              <span className="font-semibold text-red-800">
                {outOfStockProducts.length} produtos esgotados
              </span>
            </div>
            <p className="text-sm text-red-600">
              Estes produtos precisam de reposição urgente
            </p>
          </div>
        )}

        {lowStockProducts.length > 0 && outOfStockProducts.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-yellow-600" size={20} />
              <span className="font-semibold text-yellow-800">
                {lowStockProducts.length} produtos com estoque baixo
              </span>
            </div>
            <p className="text-sm text-yellow-600">
              Considere repor o estoque destes produtos em breve
            </p>
          </div>
        )}

        {/* Stock Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package size={24} />
              Todos os Produtos
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Nenhum produto cadastrado
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded object-cover"
                                src={product.images[0].url}
                                alt=""
                              />
                            ) : (
                              <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Sem img</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.category?.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          product.stock === 0 ? 'text-red-600' :
                          product.stock < 5 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-800'
                            : product.stock < 5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock === 0 ? 'Esgotado' :
                           product.stock < 5 ? 'Baixo' : 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => router.push(`/admin/produtos/${product.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar Estoque
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500 mb-2">Total de Produtos</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500 mb-2">Estoque Baixo</h3>
            <p className="text-3xl font-bold text-yellow-600">{lowStockProducts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500 mb-2">Esgotados</h3>
            <p className="text-3xl font-bold text-red-600">{outOfStockProducts.length}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}