import { Package, Truck, MessageSquare, Star, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Eye, FileEdit as Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data
  const stats = {
    activeListings: 8,
    totalOffers: 34,
    completedTransports: 18,
    rating: 4.8,
    totalEarnings: 12450,
    pendingPayments: 2
  }

  const recentListings = [
    {
      id: '1',
      title: 'Transport mebli Warszawa - Kraków',
      status: 'OPEN',
      offers: 12,
      views: 45,
      createdAt: '2024-01-15',
      expiresAt: '2024-02-15'
    },
    {
      id: '2',
      title: 'Przeprowadzka mieszkania',
      status: 'ASSIGNED',
      offers: 8,
      views: 67,
      createdAt: '2024-01-14',
      assignedTo: 'TransFast Sp. z o.o.'
    },
    {
      id: '3',
      title: 'Transport palet',
      status: 'IN_TRANSIT',
      offers: 6,
      views: 23,
      createdAt: '2024-01-13',
      carrier: 'LogiTrans'
    },
    {
      id: '4',
      title: 'Transport samochodu',
      status: 'COMPLETED',
      offers: 15,
      views: 89,
      createdAt: '2024-01-10',
      completedAt: '2024-01-20'
    }
  ]

  const recentOffers = [
    {
      id: '1',
      listingTitle: 'Transport AGD',
      price: 450,
      status: 'PENDING',
      carrier: 'TransFast Sp. z o.o.',
      createdAt: '2024-01-20',
      expiresAt: '2024-01-27'
    },
    {
      id: '2',
      listingTitle: 'Przewóz samochodu',
      price: 800,
      status: 'ACCEPTED',
      carrier: 'AutoTransport Pro',
      createdAt: '2024-01-19',
      acceptedAt: '2024-01-21'
    },
    {
      id: '3',
      listingTitle: 'Transport mebli',
      price: 320,
      status: 'REJECTED',
      carrier: 'QuickMove',
      createdAt: '2024-01-18',
      rejectedAt: '2024-01-19'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800'
      case 'ASSIGNED': return 'bg-blue-100 text-blue-800'
      case 'IN_TRANSIT': return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED': return 'bg-gray-100 text-gray-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN': return 'Otwarte'
      case 'ASSIGNED': return 'Przydzielone'
      case 'IN_TRANSIT': return 'W transporcie'
      case 'COMPLETED': return 'Zakończone'
      case 'PENDING': return 'Oczekuje'
      case 'ACCEPTED': return 'Zaakceptowana'
      case 'REJECTED': return 'Odrzucona'
      default: return status
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Witaj ponownie! Oto przegląd Twojej aktywności</p>
          </div>
          <Link href="/listings/new" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Dodaj zlecenie
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktywne zlecenia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Otrzymane oferty</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOffers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Zrealizowane</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTransports}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Średnia ocena</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Zarobki (PLN)</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Oczekujące płatności</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Listings */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Moje zlecenia</h2>
            <Link href="/my-listings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Zobacz wszystkie
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                      {getStatusText(listing.status)}
                    </span>
                    <span className="text-sm text-gray-500">{listing.offers} ofert</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {listing.views}
                    </span>
                    <span className="text-sm text-gray-500">{listing.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/listings/${listing.id}`} className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link href={`/listings/${listing.id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Offers */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ostatnie oferty</h2>
            <Link href="/my-offers" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Zobacz wszystkie
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOffers.map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{offer.listingTitle}</h3>
                  <p className="text-sm text-gray-600">{offer.carrier}</p>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-lg font-bold text-gray-900">{offer.price} PLN</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                      {getStatusText(offer.status)}
                    </span>
                    <span className="text-sm text-gray-500">{offer.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {offer.status === 'PENDING' && (
                    <>
                      <button className="btn btn-success text-xs px-3 py-1">
                        Akceptuj
                      </button>
                      <button className="btn btn-danger text-xs px-3 py-1">
                        Odrzuć
                      </button>
                    </>
                  )}
                  <Link href={`/offers/${offer.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Zobacz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Szybkie akcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/listings/new" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Dodaj zlecenie</h3>
                <p className="text-sm text-gray-600">Utwórz nowe zlecenie transportowe</p>
              </div>
            </div>
          </Link>

          <Link href="/messages" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Wiadomości</h3>
                <p className="text-sm text-gray-600">Sprawdź nowe wiadomości</p>
              </div>
            </div>
          </Link>

          <Link href="/analytics" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Analityka</h3>
                <p className="text-sm text-gray-600">Zobacz statystyki</p>
              </div>
            </div>
          </Link>

          <Link href="/profile" className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Profil</h3>
                <p className="text-sm text-gray-600">Zarządzaj swoim profilem</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Ostatnia aktywność</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">Nowe zlecenie zostało opublikowane</p>
                <p className="text-xs text-gray-500">Transport mebli Warszawa - Kraków • 2 godz. temu</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">Oferta została zaakceptowana</p>
                <p className="text-xs text-gray-500">Przewóz samochodu • TransFast Sp. z o.o. • 5 godz. temu</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">Nowa wiadomość</p>
                <p className="text-xs text-gray-500">Jan Kowalski wysłał wiadomość • 1 dzień temu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}