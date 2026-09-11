'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Menu, X, Search, User, ShoppingCart } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [newProducts, setNewProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetchData()
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
      setFeaturedProducts(productsData.filter((p: any) => p.featured).slice(0, 4))
      setNewProducts(productsData.slice(0, 4))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const categoryImages = {
    'tenis': 'https://images.unsplash.com/photo-1606107557495-ffef5b8c7e5?w=800&q=80&auto=format&fit=crop',
    'camisetas': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop',
    'moletons': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop',
    'calcas': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop',
    'acessorios': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80&auto=format&fit=crop'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-3xl font-bold tracking-wider text-white">
              GUS <span className="text-gray-400">&</span> BERT
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">INÍCIO</Link>
              <Link href="/produtos" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">LOJA</Link>
              <Link href="/produtos?categoria=tenis" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">TÊNIS</Link>
              <Link href="/produtos?categoria=camisetas" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">CAMISETAS</Link>
              <Link href="/produtos?categoria=moletons" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">MOLETONS</Link>
              <Link href="/produtos?categoria=calcas" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">CALÇAS</Link>
              <Link href="/produtos?categoria=acessorios" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">ACESSÓRIOS</Link>
              <Link href="/produtos?destaque=true" className="text-white hover:text-gray-300 transition text-sm font-medium tracking-wide">OFERTAS</Link>
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="text-white hover:text-gray-300 transition">
                <Search size={20} />
              </button>
              <button className="text-white hover:text-gray-300 transition">
                <User size={20} />
              </button>
              <Link href="/carrinho" className="text-white hover:text-gray-300 transition relative">
                <ShoppingCart size={20} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-black/95 backdrop-blur-md"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-gray-300 transition text-lg font-medium">INÍCIO</Link>
              <Link href="/produtos" className="text-white hover:text-gray-300 transition text-lg font-medium">LOJA</Link>
              <Link href="/produtos?categoria=tenis" className="text-white hover:text-gray-300 transition text-lg font-medium">TÊNIS</Link>
              <Link href="/produtos?categoria=camisetas" className="text-white hover:text-gray-300 transition text-lg font-medium">CAMISETAS</Link>
              <Link href="/produtos?categoria=moletons" className="text-white hover:text-gray-300 transition text-lg font-medium">MOLETONS</Link>
              <Link href="/produtos?categoria=calcas" className="text-white hover:text-gray-300 transition text-lg font-medium">CALÇAS</Link>
              <Link href="/produtos?categoria=acessorios" className="text-white hover:text-gray-300 transition text-lg font-medium">ACESSÓRIOS</Link>
              <Link href="/produtos?destaque=true" className="text-white hover:text-gray-300 transition text-lg font-medium">OFERTAS</Link>
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
                <button className="text-white hover:text-gray-300 transition">
                  <Search size={20} />
                </button>
                <button className="text-white hover:text-gray-300 transition">
                  <User size={20} />
                </button>
                <Link href="/carrinho" className="text-white hover:text-gray-300 transition">
                  <ShoppingCart size={20} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/fire.png"
            alt="GUS & BERT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            GUS <span className="text-gray-400">&</span> BERT
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-200 mb-6 tracking-widest uppercase"
          >
            Qualidade e preço baixo
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Da nossa cidade, para o mundo, Pederneiras-Sp
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/produtos"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-lg font-semibold hover:bg-gray-200 transition transform hover:scale-105"
            >
              EXPLORAR COLEÇÃO
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-black tracking-tight">CATEGORIAS</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore nossa coleção completa</p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
              >
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  className="group relative h-80 rounded-lg overflow-hidden block"
                >
                  <img
                    src={categoryImages[category.slug as keyof typeof categoryImages] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.name.toUpperCase()}</h3>
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      VER COLEÇÃO <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2 tracking-tight">PRODUTOS EM DESTAQUE</h2>
              <p className="text-gray-600">Nossas peças mais exclusivas</p>
            </div>
            <Link href="/produtos?destaque=true" className="hidden md:flex items-center gap-2 text-black hover:text-gray-600 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto em destaque disponível</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <Link
                    href={`/produto/${product.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Sem imagem</span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">ESGOTADO</span>
                        </div>
                      )}
                      {product.promotionalPrice && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                          OFERTA
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</p>
                      <h3 className="font-semibold mb-2 text-black group-hover:text-gray-600 transition line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-black">
                          R$ {(product.promotionalPrice || product.price).toFixed(2)}
                        </span>
                        {product.promotionalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="md:hidden mt-8 text-center">
            <Link href="/produtos?destaque=true" className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Latest Drop */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-black text-white"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2 tracking-tight">THE LATEST DROP</h2>
              <p className="text-gray-400">As últimas adições à nossa coleção</p>
            </div>
            <Link href="/produtos?ordenar=recentes" className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-700 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : newProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhum produto disponível</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {newProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <Link
                    href={`/produto/${product.slug}`}
                    className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-800">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-600">Sem imagem</span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">ESGOTADO</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</p>
                      <h3 className="font-semibold mb-2 text-white group-hover:text-gray-300 transition line-clamp-2">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-white">
                        R$ {(product.promotionalPrice || product.price).toFixed(2)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="md:hidden mt-8 text-center">
            <Link href="/produtos?ordenar=recentes" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Essentials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-white"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2 tracking-tight">ESSENTIALS</h2>
              <p className="text-gray-600">Peças essenciais para completar seu estilo</p>
            </div>
            <Link href="/produtos" className="hidden md:flex items-center gap-2 text-black hover:text-gray-600 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <div className="aspect-square bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto disponível</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.slice(0, 4).map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                >
                  <Link
                    href={`/produto/${product.slug}`}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-black transition-all duration-300 block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">Sem imagem</span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">ESGOTADO</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</p>
                      <h3 className="font-semibold mb-2 text-black group-hover:text-gray-600 transition line-clamp-2">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-black">
                        R$ {(product.promotionalPrice || product.price).toFixed(2)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="md:hidden mt-8 text-center">
            <Link href="/produtos" className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition font-medium">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-gray-100"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">NASCIDA EM PEDERNEIRAS.</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                A GUS & BERT nasceu da união de dois amigos, Gus e Bertolino, com uma paixão por streetwear, sneakers e estilo.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                De Pederneiras para qualquer lugar. Representando quem você é através do que você veste.
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition"
              >
                CONHEÇA NOSSA HISTÓRIA
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 lg:h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1559563452-8679c944d0dd?w=800&q=80&auto=format&fit=crop"
                alt="Streetwear Lifestyle"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Instagram Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 bg-white"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle size={48} className="mx-auto mb-6 text-black" />
          </motion.div>
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">@GUSEBERT</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Acompanhe nossos próximos drops e novidades exclusivas
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition"
            >
              <MessageCircle size={20} />
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black text-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition"
            >
              TikTok
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}