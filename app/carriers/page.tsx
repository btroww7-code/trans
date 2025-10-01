'use client'

import { useState } from 'react'
import { Search, Star, Shield, Truck, MapPin, Phone, Mail, Filter } from 'lucide-react'
import Link from 'next/link'

export default function CarriersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const carriers = [
    {
      id: '1',
      name: 'TransFast Sp. z o.o.',
      description: 'Profesjonalny transport mebli i przeprowadzki w całej Polsce. Doświadczenie 15 lat.',
      avatar: 'TF',
      verified: true,
      rating: 4.9,
      reviewsCount: 156,
      location: 'Warszawa',
      phone: '+48 123 456 789',
      email: 'kontakt@transfast.pl',
      specializations: ['Meble', 'Przeprowadzki', 'AGD'],
      vehicleTypes: ['Dostawczy', 'Ciężarowy'],
      completedJobs: 234,
      responseTime: '2 godz.',
      priceRange: '2-5 PLN/km',
      availability: 'Dostępny',
      images: [
        'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '2',
      name: 'AutoTransport Pro',
      description: 'Specjalizujemy się w transporcie samochodów na lawetach. Ubezpieczenie do 500k PLN.',
      avatar: 'AP',
      verified: true,
      rating: 4.8,
      reviewsCount: 89,
      location: 'Kraków',
      phone: '+48 987 654 321',
      email: 'biuro@autotransport.pl',
      specializations: ['Samochody', 'Motocykle'],
      vehicleTypes: ['Laweta', 'Specjalistyczny'],
      completedJobs: 145,
      responseTime: '1 godz.',
      priceRange: '3-8 PLN/km',
      availability: 'Zajęty do 25.01',
      images: [
        'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '3',
      name: 'LogiTrans',
      description: 'Transport palet i ładunków przemysłowych. Obsługujemy całą Europę.',
      avatar: 'LT',
      verified: false,
      rating: 4.6,
      reviewsCount: 67,
      location: 'Gdańsk',
      phone: '+48 555 123 456',
      email: 'info@logitrans.pl',
      specializations: ['Palety', 'Ładunki', 'Przemysł'],
      vehicleTypes: ['Ciężarowy', 'Naczepa'],
      completedJobs: 98,
      responseTime: '4 godz.',
      priceRange: '1.5-4 PLN/km',
      availability: 'Dostępny',
      images: [
        'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '4',
      name: 'QuickMove',
      description: 'Szybkie przeprowadzki i transport mebli. Działamy 24/7.',
      avatar: 'QM',
      verified: true,
      rating: 4.7,
      reviewsCount: 123,
      location: 'Wrocław',
      phone: '+48 777 888 999',
      email: 'kontakt@quickmove.pl',
      specializations: ['Przeprowadzki', 'Meble', 'Express'],
      vehicleTypes: ['Dostawczy'],
      completedJobs: 187,
      responseTime: '30 min',
      priceRange: '2.5-6 PLN/km',
      availability: 'Dostępny',
      images: [
        'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ]

  const filteredCarriers = carriers.filter(carrier => {
    const matchesSearch = carrier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         carrier.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || carrier.specializations.includes(selectedCategory)
    const matchesLocation = !selectedLocation || carrier.location === selectedLocation
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Przewoźnicy</h1>
        <p className="text-gray-600 mt-2">Znajdź zaufanych przewoźników w swojej okolicy</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj przewoźników..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            <option value="">Wszystkie specjalizacje</option>
            <option value="Meble">Meble</option>
            <option value="Przeprowadzki">Przeprowadzki</option>
            <option value="Samochody">Samochody</option>
            <option value="Palety">Palety</option>
            <option value="AGD">AGD</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="input"
          >
            <option value="">Wszystkie miasta</option>
            <option value="Warszawa">Warszawa</option>
            <option value="Kraków">Kraków</option>
            <option value="Gdańsk">Gdańsk</option>
            <option value="Wrocław">Wrocław</option>
          </select>

          <button className="btn btn-primary">
            <Filter className="w-4 h-4 mr-2" />
            Filtruj
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Znaleziono <span className="font-semibold">{filteredCarriers.length}</span> przewoźników
        </p>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option value="rating">Najwyżej oceniani</option>
          <option value="reviews">Najwięcej opinii</option>
          <option value="jobs">Najwięcej zleceń</option>
          <option value="response">Najszybsza odpowiedź</option>
        </select>
      </div>

      {/* Carriers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCarriers.map((carrier) => (
          <div key={carrier.id} className="card hover:shadow-lg transition-all duration-200">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">{carrier.avatar}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {carrier.name}
                  </h3>
                  {carrier.verified && (
                    <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{carrier.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({carrier.reviewsCount})</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {carrier.location}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    carrier.availability === 'Dostępny' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {carrier.availability}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{carrier.description}</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {carrier.specializations.map((spec) => (
                  <span key={spec} className="badge badge-info">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{carrier.completedJobs}</div>
                <div className="text-xs text-gray-500">Zleceń</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{carrier.responseTime}</div>
                <div className="text-xs text-gray-500">Odpowiedź</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{carrier.priceRange}</div>
                <div className="text-xs text-gray-500">Cena/km</div>
              </div>
            </div>

            {/* Vehicle Types */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>{carrier.vehicleTypes.join(', ')}</span>
              </div>
            </div>

            {/* Images */}
            {carrier.images.length > 0 && (
              <div className="mb-4">
                <div className="flex space-x-2">
                  {carrier.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${carrier.name} ${index + 1}`}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                  ))}
                  {carrier.images.length > 3 && (
                    <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                      +{carrier.images.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <Link 
                href={`/carriers/${carrier.id}`}
                className="btn btn-outline flex-1 text-center"
              >
                Zobacz profil
              </Link>
              <button className="btn btn-primary flex-1">
                Wyślij wiadomość
              </button>
              <a 
                href={`tel:${carrier.phone}`}
                className="btn btn-secondary p-2"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${carrier.email}`}
                className="btn btn-secondary p-2"
              >
                <Mail className="w-4 h-4" />
              </a>
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
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            Następna
          </button>
        </nav>
      </div>
    </div>
  )
}