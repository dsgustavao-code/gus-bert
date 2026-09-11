'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { ArrowLeft, Upload, X } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    brand: '',
    price: '',
    promotionalPrice: '',
    description: '',
    stock: '',
    shoeSizes: '',
    clothingSizes: '',
    colors: '',
    featured: false,
    active: true,
    purchaseLink: '',
    images: [] as { url: string; order: number }[]
  })

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
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limitar a 3 imagens
    if (formData.images.length >= 3) {
      alert('Máximo de 3 imagens permitidas por produto')
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('existingImagesCount', formData.images.length.toString())

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const data = await response.json()
      
      if (response.ok) {
        setFormData({
          ...formData,
          images: [...formData.images, { url: data.url, order: formData.images.length }]
        })
      } else {
        alert(data.error || 'Erro ao fazer upload da imagem')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          promotionalPrice: formData.promotionalPrice ? parseFloat(formData.promotionalPrice) : null,
          stock: parseInt(formData.stock),
          shoeSizes: formData.shoeSizes || null,
          clothingSizes: formData.clothingSizes || null,
          purchaseLink: formData.purchaseLink || null
        })
      })

      if (response.ok) {
        router.push('/admin/produtos')
      } else {
        alert('Erro ao criar produto')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-3xl font-bold">Adicionar Produto</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-medium mb-2">Categoria *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Marca *</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Preço *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preço Promocional</label>
              <input
                type="number"
                step="0.01"
                value={formData.promotionalPrice}
                onChange={(e) => setFormData({ ...formData, promotionalPrice: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Estoque *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Sizes and Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tamanhos de Tênis (separados por vírgula)</label>
              <input
                type="text"
                value={formData.shoeSizes}
                onChange={(e) => setFormData({ ...formData, shoeSizes: e.target.value })}
                placeholder="38, 39, 40, 41, 42"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tamanhos de Roupas (separados por vírgula)</label>
              <input
                type="text"
                value={formData.clothingSizes}
                onChange={(e) => setFormData({ ...formData, clothingSizes: e.target.value })}
                placeholder="P, M, G, GG"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cores (separadas por vírgula)</label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="Preto, Branco, Azul"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          {/* Purchase Link */}
          <div>
            <label className="block text-sm font-medium mb-2">Link de Compra (somente para admin)</label>
            <input
              type="url"
              value={formData.purchaseLink}
              onChange={(e) => setFormData({ ...formData, purchaseLink: e.target.value })}
              placeholder="https://exemplo.com/produto"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <p className="text-xs text-gray-500 mt-1">Link externo para comprar o produto (visível apenas no painel admin)</p>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Imagens (máximo 3)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || formData.images.length >= 3}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center cursor-pointer ${formData.images.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload size={32} className="text-gray-400 mb-2" />
                <span className="text-gray-600">
                  {uploading ? 'Enviando...' : `Clique para fazer upload (${formData.images.length}/3)`}
                </span>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Produto em destaque</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Produto ativo</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Adicionar Produto'}
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