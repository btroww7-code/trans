import { Search, Filter, MapPin, Calendar, Package, Truck, Eye, Heart, Star, Shield, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { SearchBar } from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ListingsPage() {
  // Mock listings data
  const listings = [
    {
      id: '1',
      title: 'Transport mebli z Warszawy do Krakowa',
      description: 'Potrzebuję przewieźć meble z mieszkania 2-pokojowego. Około 15m³ ładunku. Meble są w dobrym stanie, wymagają ostrożnego transportu.',
      category: { name_pl: 'Meble', icon: '🪑' },
      from_address: { city: 'Warszawa', street: 'ul. Marszałkowska 1' },
      to_address: { city: 'Kraków', street: 'ul. Floriańska 10' },
      distance_km: 295,
      weight_kg: 800,
      pickup_date_from: '2024-01-25',
      delivery_date_to: '2024-01-26',
      offers_count: 12,
      views_count: 45,
      saved: false,
      created_at: '2024-01-20',
      owner: {
        profile: {
          company_name: 'Jan Kowalski',
          verified: true,
          rating_avg: 4.8
        }
      }
    },
    {
      id: '2',
      title: 'Przeprowadzka mieszkania - Gdańsk',
      description: 'Przeprowadzka całego mieszkania 3-pokojowego. Potrzebny transport + ekipa do pakowania i przenoszenia.',
      category: { name_pl: 'Przeprowadzki', icon: '🚚' },
      from_address: { city: 'Gdańsk', street: 'ul. Długa 15' },
      to_address: { city: 'Gdańsk', street: 'ul. Westerplatte 5' },
      distance_km: 12,
      weight_kg: 1200,
      pickup_date_from: '2024-01-28',
      delivery_date_to: '2024-01-28',
      offers_count: 8,
      views_count: 67,
      saved: true,
      created_at: '2024-01-19',
      owner: {
        profile: {
          company_name: 'Anna Nowak',
          verified: false,
          rating_avg: 4.2
        }
      }
    },
    {
      id: '3',
      title: 'Transport samochodu Wrocław - Poznań',
      description: 'Przewóz samochodu osobowego na lawecie. Auto sprawne, nie wymaga holowania. Pilne!',
      category: { name_pl: 'Samochody', icon: '🚗' },
      from_address: { city: 'Wrocław', street: 'ul. Świdnicka 20' },
      to_address: { city: 'Poznań', street: 'ul. Święty Marcin 30' },
      distance_km: 170,
      weight_kg: 1500,
      pickup_date_from: '2024-01-30',
      delivery_date_to: '2024-01-31',
      offers_count: 15,
      views_count: 23,
      saved: false,
      created_at: '2024-01-18',
      owner: {
        profile: {
          company_name: 'Piotr Wiśniewski',
          verified: true,
          rating_avg: 4.9
        }
      }
    },
    {
      id: '4',
      title: 'Transport palet - Warszawa okolice',
      description: 'Transport 5 palet z materiałami budowlanymi. Waga około 2 ton.',
      category: { name_pl: 'Palety', icon: '📦' },
      from_address: { city: 'Warszawa', street: 'ul. Puławska 100' },
      to_address: { city: 'Piaseczno', street: 'ul. Warszawska 50' },
      distance_km: 25,
      weight_kg: 2000,
      pickup_date_from: '2024-02-01',
      delivery_date_to: '2024-02-01',
      offers_count: 6,
      views_count: 18,
      saved: false,
      created_at: '2024-01-21',
      owner: {
        profile: {
          company_name: 'BudMat Sp. z o.o.',
          verified: true,
          rating_avg: 4.6
        }
      }
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Zlecenia transportowe</h1>
        <p className="text-gray-600 mt-2">Znajdź idealne zlecenie dla swojego transportu lub dodaj własne</p>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Znaleziono <span className="font-semibold">{listings.length}</span> zleceń
        </p>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
            <option value="created_at">Najnowsze</option>
            <option value="pickup_date">Data odbioru</option>
            <option value="offers_count">Liczba ofert</option>
            <option value="distance">Odległość</option>
            <option value="price">Cena</option>
          </select>
          <Link href="/listings/new" className="btn btn-primary">
            <Package className="w-4 h-4 mr-2" />
            Dodaj zlecenie
          </Link>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="space-y-6">
        {listings.map((listing) => (
          <div key={listing.id} className="card hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary-500">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{listing.category.icon}</span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                        <Link href={`/listings/${listing.id}`}>
                          {listing.title}
                        </Link>
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="badge badge-info">{listing.category.name_pl}</span>
                        {listing.created_at === '2024-01-21' && (
                          <span className="badge bg-green-100 text-green-800">Nowe</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <button className={`p-1 rounded-full transition-colors ${listing.saved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                        <Heart className={`w-4 h-4 ${listing.saved ? 'fill-current' : ''}`} />
                      </button>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {listing.views_count}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{listing.created_at}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{listing.description}</p>

                {/* Route Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-green-500" />
                    <span className="font-medium">{listing.from_address.city}</span>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-red-500" />
                    <span className="font-medium">{listing.to_address.city}</span>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {listing.distance_km} km
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    <span>{listing.weight_kg} kg</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{listing.pickup_date_from} - {listing.delivery_date_to}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    <span>Transport standardowy</span>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {listing.owner.profile.company_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {listing.owner.profile.company_name}
                        </span>
                        {listing.owner.profile.verified && (
                          <Shield className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                        {listing.owner.profile.rating_avg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-64 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {listing.offers_count}
                    </div>
                    <div className="text-sm text-gray-600">
                      {listing.offers_count === 1 ? 'oferta' : 'ofert'}
                    </div>
                    {listing.offers_count > 10 && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        Popularne!
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Link 
                    href={`/listings/${listing.id}`}
                    className="btn btn-outline w-full text-center"
                  >
                    Zobacz szczegóły
                  </Link>
                  <button className="btn btn-secondary w-full">
                    <Truck className="w-4 h-4 mr-2" />
                    Złóż ofertę
                  </button>
                  <button className="btn btn-primary w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Napisz wiadomość
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Poprzednia
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-600 text-sm font-medium text-white">
            2
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            4
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Następna
          </button>
        </nav>
      </div>
    </div>
  )
}