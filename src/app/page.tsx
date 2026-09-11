import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-16">Carregando...</div>}>
        <HomeClient />
      </Suspense>
      <Footer />
    </div>
  )
}
