import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-black">GUS & BERT</h1>
        <p className="text-gray-600 mb-8">Streetwear & Sneakers Premium</p>
        <a href="/produtos" className="inline-block px-6 py-3 bg-black text-white rounded-lg">
          Ver Produtos
        </a>
      </div>
      <Footer />
    </div>
  )
}
