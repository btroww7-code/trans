import Link from 'next/link'
import { Mail, Lock, User, Building, Phone } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Utwórz nowe konto
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Lub{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              zaloguj się do istniejącego konta
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Typ konta
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="CLIENT"
                  className="sr-only"
                  defaultChecked
                />
                <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary-500 focus-within:border-primary-500 bg-white">
                  <div className="flex items-center justify-center mb-2">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Klient</div>
                    <div className="text-xs text-gray-500">Zlecam transport</div>
                  </div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="CARRIER"
                  className="sr-only"
                />
                <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary-500 focus-within:border-primary-500 bg-white">
                  <div className="flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">Przewoźnik</div>
                    <div className="text-xs text-gray-500">Realizuję transport</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adres email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="twoj@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                Nazwa firmy / Imię i nazwisko
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company_name"
                  name="company_name"
                  type="text"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Nazwa firmy lub imię i nazwisko"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Numer telefonu
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="+48 123 456 789"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Minimum 8 znaków"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Potwierdź hasło
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Powtórz hasło"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Akceptuję{' '}
              <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                regulamin
              </Link>{' '}
              i{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                politykę prywatności
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Utwórz konto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}