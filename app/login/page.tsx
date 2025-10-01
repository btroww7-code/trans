'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2, Truck } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      toast.error('Nieprawidłowy email lub hasło')
      setLoading(false)
      return
    }

    toast.success('Zalogowano pomyślnie!')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <Truck className="w-12 h-12 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">Transport Marketplace</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Zaloguj się</h2>
          <p className="mt-2 text-gray-600">
            Nie masz konta?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Zarejestruj się
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adres email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="twoj@email.pl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Hasło
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Zapamiętaj mnie
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Zapomniałeś hasła?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logowanie...
                </>
              ) : (
                'Zaloguj się'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Lub kontynuuj jako</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/listings"
                className="w-full btn btn-secondary py-3 text-center block"
              >
                Przeglądaj zlecenia bez logowania
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Logując się akceptujesz nasz{' '}
          <Link href="/terms" className="text-primary-600 hover:text-primary-700">
            Regulamin
          </Link>{' '}
          i{' '}
          <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
            Politykę Prywatności
          </Link>
        </p>
      </div>
    </div>
  )
}