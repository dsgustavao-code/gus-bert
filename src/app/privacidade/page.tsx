import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Política de Privacidade</h1>
        
        <div className="prose max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Coleta de Informações</h2>
            <p>
              Na GUS & BERT, coletamos informações que você nos fornece diretamente, como nome, e-mail, 
              endereço e informações de pagamento quando você faz uma compra ou se cadastra em nossa loja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Uso das Informações</h2>
            <p>
              Utilizamos suas informações para processar pedidos, enviar atualizações sobre seu pedido, 
              melhorar nossa loja e personalizar sua experiência de compra.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Compartilhamos dados apenas com serviços essenciais 
              para processar pagamentos e entregar seus pedidos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Segurança</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, 
              alteração ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Seus Direitos</h2>
            <p>
              Você tem direito a acessar, corrigir ou excluir suas informações pessoais. Entre em contato 
              conosco para exercer esses direitos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contato</h2>
            <p>
              Para dúvidas sobre esta política de privacidade, entre em contato:
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
