import { Users, Package, TrendingUp, AlertTriangle, Shield, Settings, BarChart3, FileText } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  // Mock admin stats
  const stats = {
    totalUsers: 1247,
    activeListings: 89,
    totalRevenue: 45670,
    pendingVerifications: 12
  }

  const recentActivity = [
    {
      id: '1',
      type: 'user_registered',
      message: 'Nowy użytkownik: jan.kowalski@email.com',
      timestamp: '5 min temu'
    },
    {
      id: '2',
      type: 'listing_created',
      message: 'Nowe zlecenie: Transport mebli Warszawa-Kraków',
      timestamp: '15 min temu'
    },
    {
      id: '3',
      type: 'payment_completed',
      message: 'Płatność zakończona: 450 PLN',
      timestamp: '1 godz. temu'
    },
    {
      id: '4',
      type: 'verification_request',
      message: 'Prośba o weryfikację: TransFast Sp. z o.o.',
      timestamp: '2 godz. temu'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel Administratora</h1>
        <p className="text-gray-600 mt-2">Zarządzaj platformą i monitoruj aktywność</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Użytkownicy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktywne zlecenia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Przychody (PLN)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Oczekujące weryfikacje</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/users" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Zarządzanie użytkownikami</h3>
              <p className="text-sm text-gray-600">Przeglądaj, edytuj i moderuj użytkowników</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/listings" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Moderacja zleceń</h3>
              <p className="text-sm text-gray-600">Zarządzaj zleceniami i ofertami</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/verifications" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Weryfikacje</h3>
              <p className="text-sm text-gray-600">Zatwierdź lub odrzuć prośby o weryfikację</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/analytics" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Analityka</h3>
              <p className="text-sm text-gray-600">Raporty i statystyki platformy</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/reports" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Zgłoszenia</h3>
              <p className="text-sm text-gray-600">Przeglądaj zgłoszenia użytkowników</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/settings" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Settings className="w-8 h-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Ustawienia</h3>
              <p className="text-sm text-gray-600">Konfiguracja platformy</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Ostatnia aktywność</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user_registered' ? 'bg-blue-100' :
                  activity.type === 'listing_created' ? 'bg-green-100' :
                  activity.type === 'payment_completed' ? 'bg-purple-100' :
                  'bg-yellow-100'
                }`}>
                  {activity.type === 'user_registered' && <Users className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'listing_created' && <Package className="w-4 h-4 text-green-600" />}
                  {activity.type === 'payment_completed' && <TrendingUp className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'verification_request' && <Shield className="w-4 h-4 text-yellow-600" />}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}