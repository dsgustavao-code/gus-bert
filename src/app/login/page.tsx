'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou senha inválidos')
      } else {
        // Check if user is admin
        const response = await fetch('/api/auth/me')
        const user = await response.json()

        if (user.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
        router.refresh()
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-black">Login</h1>
              <p className="text-gray-600">Acesse sua conta GUS & BERT</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem conta?{' '}
                <Link href="/registro" className="text-black font-semibold hover:underline">
                  Crie uma conta
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/admin/login" className="text-gray-500 hover:text-gray-700 text-sm">
                Acesso Admin
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                Voltar para a loja
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
