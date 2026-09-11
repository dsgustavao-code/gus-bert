'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { ArrowLeft, Upload, X } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    description: '',
    active: true
  })

  useEffect(() => {
    const id = params.id as string
    if (id) {
      fetchCategory(id)
    }
  }, [params.id])

  const fetchCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`)
      const data = await response.json()
      
      if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
          image: data.image || '',
          description: data.description || '',
          active: data.active
        })
      }
    } catch (error) {
      console.error('Error fetching category:', error)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setFormData({ ...formData, image: data.url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/categorias')
      } else {
        alert('Erro ao atualizar categoria')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Erro ao atualizar categoria')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-3xl font-bold">Editar Categoria</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
              }}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Imagem</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload size={32} className="text-gray-400 mb-2" />
                <span className="text-gray-600">
                  {uploading ? 'Enviando...' : 'Clique para fazer upload da imagem'}
                </span>
              </label>
            </div>

            {formData.image && (
              <div className="mt-4 relative">
                <img
                  src={formData.image}
                  alt="Categoria"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Categoria ativa</span>
          </label>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}