'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Menu, X, Search, User, ShoppingCart } from 'lucide-react'

export default function HomeClient() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [newProducts, setNewProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    fetchData()
    updateCartCount()
    window.addEventListener('cart-updated', updateCartCount)
    return () => window.removeEventListener('cart-updated', updateCartCount)
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ])
      
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      
      setProducts(productsData)
      setCategories(categoriesData)
      
      // Featured products (with promotional price)
      setFeaturedProducts(productsData.filter((p: any) => p.promotionalPrice).slice(0, 4))
      
      // New products (latest 4)
      setNewProducts(productsData.slice(0, 4))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.promotionalPrice || product.price,
        image: product.images?.[0]?.url || '',
        quantity: 1,
        size: 'M',
        color: 'Preto'
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
    alert('Produto adicionado ao carrinho!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-black to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            GUS & BERT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            Streetwear & Sneakers Premium
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Link
              href="/produtos"
              className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver Produtos
            </Link>
            <Link
              href="/carrinho"
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Ver Carrinho
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-black">Promoções</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-black">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 line-through text-sm">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-black font-bold ml-2">
                        R$ {product.promotionalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-black">Novidades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-black">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold">
                      R$ {(product.promotionalPrice || product.price).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-black">Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos?category=${category.id}`}
                className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para encontrar seu estilo?</h2>
          <p className="text-gray-300 mb-8">Explore nossa coleção exclusiva de streetwear e sneakers</p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Ver Todos os Produtos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
