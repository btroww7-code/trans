'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Skąd (miasto lub kod pocztowy)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Dokąd (miasto lub kod pocztowy)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full btn btn-primary py-3 text-lg font-semibold"
      >
        <Search className="w-5 h-5 mr-2" />
        Szukaj transportu
      </button>
    </form>
  )
}