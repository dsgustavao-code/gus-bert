import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, ShoppingBag } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-black">Pedido Realizado com Sucesso!</h1>
            <p className="text-gray-600">
              Obrigado pela sua compra. Você receberá um e-mail de confirmação com os detalhes do seu pedido.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="font-semibold mb-4 text-black">Próximos Passos</h2>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Confira seu e-mail para a confirmação do pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Acompanhe o status do pedido pelo e-mail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Receba atualizações sobre o envio</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              <ShoppingBag size={20} />
              Continuar Comprando
            </Link>
            <br />
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}