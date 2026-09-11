'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { Plus, Edit, Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      setCategories(categories.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erro ao excluir categoria')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p>Carregando categorias...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Categorias</h1>
          <button
            onClick={() => router.push('/admin/categorias/nova')}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Adicionar Categoria
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {category.image && (
                <div className="aspect-video bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.slug}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    category.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.active ? 'Ativa' : 'Inativa'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/categorias/${category.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Nenhuma categoria cadastrada</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}