'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [params.slug])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products/${params.slug}`)
      const data = await response.json()
      setProduct(data)
      if (data.images && data.images.length > 0) {
        setCurrentImage(0)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho')
      return
    }
    if (!selectedColor) {
      alert('Por favor, selecione uma cor')
      return
    }
    if (product.stock < quantity) {
      alert('Quantidade indisponível em estoque')
      return
    }

    // Add to cart logic here
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.promotionalPrice || product.price,
      image: product.images?.[0]?.url,
      size: selectedSize,
      color: selectedColor,
      quantity
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Trigger custom event to update cart count in header
    window.dispatchEvent(new Event('cart-updated'))

    alert('Produto adicionado ao carrinho!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center">Carregando produto...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center">Produto não encontrado.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const shoeSizes = product.shoeSizes ? product.shoeSizes.split(',') : []
  const clothingSizes = product.clothingSizes ? product.clothingSizes.split(',') : []
  const colors = product.colors ? product.colors.split(',') : []
  const price = product.promotionalPrice || product.price
  const allSizes = [...shoeSizes, ...clothingSizes]

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[currentImage]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      currentImage === index ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">R$ {price.toFixed(2)}</span>
                {product.promotionalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.promotionalPrice && (
                <span className="text-green-600 text-sm">
                  {Math.round((1 - product.promotionalPrice / product.price) * 100)}% OFF
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-700 mb-6">{product.description}</p>
            )}

            {/* Size Selection */}
            {shoeSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Tamanhos de Tênis</h3>
                <div className="flex flex-wrap gap-2">
                  {shoeSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {clothingSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Tamanhos de Roupas</h3>
                <div className="flex flex-wrap gap-2">
                  {clothingSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Cor</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {color.trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantidade</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
                <span className="text-gray-600">
                  {product.stock} disponíveis
                </span>
              </div>
            </div>

            {/* Stock Status */}
            {product.stock === 0 ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-semibold">Produto esgotado</p>
              </div>
            ) : product.stock < 5 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-600 font-semibold">
                  Últimas {product.stock} unidades disponíveis!
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <Heart size={20} />
              </button>
              <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <Share2 size={20} />
              </button>
            </div>

            {/* Category */}
            <div className="text-sm text-gray-600">
              Categoria: <span className="font-medium">{product.category?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}