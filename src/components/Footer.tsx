import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold tracking-wider mb-4">
              GUS <span className="text-gray-400">&</span> BERT
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              De Pederneiras para qualquer lugar. Streetwear & Sneakers Premium.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <MessageCircle size={24} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-sm tracking-wide">NAVEGAÇÃO</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition">Início</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition">Loja</Link></li>
              <li><Link href="/produtos?categoria=tenis" className="hover:text-white transition">Tênis</Link></li>
              <li><Link href="/produtos?categoria=camisetas" className="hover:text-white transition">Camisetas</Link></li>
              <li><Link href="/produtos?categoria=moletons" className="hover:text-white transition">Moletons</Link></li>
              <li><Link href="/produtos?categoria=calcas" className="hover:text-white transition">Calças</Link></li>
              <li><Link href="/produtos?categoria=acessorios" className="hover:text-white transition">Acessórios</Link></li>
              <li><Link href="/produtos?destaque=true" className="hover:text-white transition">Ofertas</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-sm tracking-wide">ATENDIMENTO</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/contato" className="hover:text-white transition">Contato</Link></li>
              <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-sm tracking-wide">INFORMAÇÕES</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/privacidade" className="hover:text-white transition">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-white transition">Termos de Uso</Link></li>
              <li><Link href="/politicas" className="hover:text-white transition">Política de Troca/Devolução</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3 text-gray-400">
              <Mail size={20} />
              <span>contato@gus-bert.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Phone size={20} />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <MapPin size={20} />
              <span>Pederneiras, SP</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 GUS & BERT. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}