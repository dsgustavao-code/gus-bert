import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SlidersHorizontal, Search } from 'lucide-react'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-16">Carregando...</div>}>
        <ProductsClient />
      </Suspense>
      <Footer />
    </div>
  )
}
