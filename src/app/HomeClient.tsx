'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomeClient() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [newProducts, setNewProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/fire.png)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider"
          >
            GUS & BERT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-white mb-6 font-semibold"
          >
            QUALIDADE E PREÇO BAIXO
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Da nossa cidade, para o mundo, Pederneiras-Sp
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              EXPLORAR COLEÇÃO
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      {!loading && featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-black text-center">Promoções</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sem imagem</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-black">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-400 line-through text-sm">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <span className="text-black font-bold ml-2 text-xl">
                            R$ {product.promotionalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Products */}
      {!loading && newProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-black text-center">Novidades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sem imagem</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-black">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-black font-bold text-xl">
                          R$ {(product.promotionalPrice || product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {!loading && categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-black text-center">Categorias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/produtos?category=${category.id}`}
                  className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden group transform hover:scale-105 transition-all"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para encontrar seu estilo?</h2>
          <p className="text-gray-300 mb-8 text-xl">Explore nossa coleção exclusiva de streetwear e sneakers</p>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Ver Todos os Produtos
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
