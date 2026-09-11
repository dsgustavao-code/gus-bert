'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react'

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartCount(cart.length)
      } catch (error) {
        console.error('Error reading cart:', error)
      }
    }
    
    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cart-updated', updateCartCount)
    
    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cart-updated', updateCartCount)
    }
  }, [mounted])

  const handleUserClick = () => {
    if (session) {
      if (session.user.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else {
        window.location.href = '/meus-pedidos'
      }
    } else {
      window.location.href = '/login'
    }
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-3xl font-bold tracking-wider text-white">
              GUS <span className="text-gray-400">&</span> BERT
            </Link>
            <div className="flex items-center space-x-6">
              <button className="text-white">
                <Search size={20} />
              </button>
              <button className="text-white">
                <User size={20} />
              </button>
              <Link href="/carrinho" className="text-white">
                <ShoppingCart size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
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
            <button 
              onClick={handleUserClick}
              className="text-white hover:text-gray-300 transition relative"
              title={session ? `Logado como ${session.user.email}` : 'Fazer login'}
            >
              <User size={20} />
              {session && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-2 h-2 rounded-full"></span>
              )}
            </button>
            <Link href="/carrinho" className="text-white hover:text-gray-300 transition relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
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
              <button 
                onClick={handleUserClick}
                className="text-white hover:text-gray-300 transition"
              >
                <User size={20} />
              </button>
              <Link href="/carrinho" className="text-white hover:text-gray-300 transition relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
