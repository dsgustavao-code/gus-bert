'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SlidersHorizontal, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy, sortOrder, priceRange])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      if (selectedCategory) params.append('category', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)
      params.append('sortBy', sortBy)
      params.append('sortOrder', sortOrder)

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      
      // Filter by price range
      const filtered = data.filter((product: any) => {
        const price = product.promotionalPrice || product.price
        return price >= priceRange.min && price <= priceRange.max
      })
      
      setProducts(filtered)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-black">Produtos</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Buscar
            </button>
          </form>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 md:hidden mb-4"
          >
            <SlidersHorizontal size={20} />
            Filtros
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h3 className="font-semibold mb-4 text-black">Filtros</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-black">Categoria</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="">Todas</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-black">Faixa de Preço</h4>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-black">Ordenar por</h4>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-')
                    setSortBy(sort)
                    setSortOrder(order)
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="createdAt-desc">Mais recentes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('')
                  setPriceRange({ min: 0, max: 1000 })
                  setSortBy('createdAt')
                  setSortOrder('desc')
                }}
                className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Carregando produtos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum produto encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="aspect-square bg-gray-300 relative overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600">Sem imagem</span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold">Esgotado</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition text-black">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-black">
                          R$ {(product.promotionalPrice || product.price).toFixed(2)}
                        </span>
                        {product.promotionalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}