import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Política de Troca e Devolução</h1>
        
        <div className="prose max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Prazo para Troca</h2>
            <p>
              Você tem até 30 dias após o recebimento do produto para solicitar troca ou devolução, 
              desde que o produto esteja em perfeitas condições.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Condições para Troca</h2>
            <p>
              O produto deve estar com etiquetas originais, sem sinais de uso e na embalagem original. 
              Calçados não podem ter sido usados em ambientes externos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Como Solicitar</h2>
            <p>
              Entre em contato através do email contato@gus-bert.com ou WhatsApp informando o número 
              do pedido e o motivo da troca. Nossa equipe irá orientar sobre o processo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Devolução em Dinheiro</h2>
            <p>
              Após recebermos e inspecionar o produto, o reembolso será feito através do mesmo método 
              de pagamento utilizado na compra, em até 10 dias úteis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Troca por Tamanho</h2>
            <p>
              Se precisar trocar apenas o tamanho, entre em contato para verificar a disponibilidade. 
              Enviamos o novo tamanho após recebermos o produto original.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contato</h2>
            <p>
              Para dúvidas sobre trocas e devoluções, entre em contato:
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
