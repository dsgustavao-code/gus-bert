import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Contato</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Entre em contato</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-black">Email</h3>
                <p className="text-gray-700">contato@gus-bert.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">Telefone</h3>
                <p className="text-gray-700">(11) 99999-9999</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">WhatsApp</h3>
                <a 
                  href="https://wa.me/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  Clique para abrir WhatsApp
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">Instagram</h3>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700"
                >
                  @gusbert
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-black">Endereço</h3>
                <p className="text-gray-700">
                  Pederneiras, SP<br />
                  Brasil
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">Envie uma mensagem</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Assunto</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Assunto da mensagem"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Mensagem</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Sua mensagem"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
