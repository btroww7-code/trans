'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar } from 'lucide-react'

interface SearchBarProps {
  onSearch?: (filters: any) => void
  className?: string
}

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [filters, setFilters] = useState({
    query: '',
    fromCity: '',
    toCity: '',
    category: '',
    dateFrom: '',
    dateTo: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(filters)
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Czego szukasz?"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              className="input pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Miasto początkowe"
              value={filters.fromCity}
              onChange={(e) => setFilters({ ...filters, fromCity: e.target.value })}
              className="input pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Miasto docelowe"
              value={filters.toCity}
              onChange={(e) => setFilters({ ...filters, toCity: e.target.value })}
              className="input pl-10"
            />
          </div>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="input"
          >
            <option value="">Wszystkie kategorie</option>
            <option value="meble">🪑 Meble</option>
            <option value="przeprowadzki">🚚 Przeprowadzki</option>
            <option value="samochody">🚗 Samochody</option>
            <option value="palety">📦 Palety</option>
            <option value="paczki">📮 Paczki</option>
            <option value="ladunki">🧱 Ładunki</option>
            <option value="maszyny">🛠️ Maszyny</option>
            <option value="zwierzeta">🐶 Zwierzęta</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              placeholder="Data od"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="input pl-10"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              placeholder="Data do"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="input pl-10"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <Search className="w-4 h-4 mr-2" />
            Szukaj
          </button>
        </div>
      </form>
    </div>
  )
}