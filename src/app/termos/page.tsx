import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Termos de Uso</h1>
        
        <div className="prose max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a loja GUS & BERT, você concorda em cumprir estes termos de uso 
              e todas as leis e regulamentos aplicáveis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Uso da Loja</h2>
            <p>
              A GUS & BERT se reserva o direito de recusar serviço a qualquer pessoa por qualquer motivo, 
              a qualquer momento. Você concorda em não usar a loja para fins ilegais ou não autorizados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Produtos e Preços</h2>
            <p>
              Nosso objetivo é mostrar com precisão as cores e imagens de nossos produtos, mas não podemos 
              garantir que a exibição do monitor de qualquer computador seja precisa. Reservamo-nos o direito 
              de modificar preços a qualquer momento sem aviso prévio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Pagamento</h2>
            <p>
              Aceitamos pagamentos através de cartão de crédito e outras formas de pagamento disponíveis. 
              Ao fornecer suas informações de pagamento, você garante que tem autorização para usar o método 
              de pagamento escolhido.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da GUS & BERT, incluindo textos, gráficos, logotipos e imagens, é propriedade 
              da GUS & BERT e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contato</h2>
            <p>
              Para dúvidas sobre estes termos de uso, entre em contato:
            </p>
            <p className="mt-2">
              Email: contato@gus-bert.com<br />
              Telefone: (11) 99999-9999
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
