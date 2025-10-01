'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Package, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { pl } from 'date-fns/locale'

interface Listing {
  id: string
  title: string
  slug: string
  from_address: any
  to_address: any
  distance_km: number
  created_at: string
  category_id: number
}

export function RecentListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'OPEN')
        .order('created_at', { ascending: false })
        .limit(6)

      if (data) {
        setListings(data as Listing[])
      }
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48"></div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Brak aktywnych zleceń</h3>
        <p className="text-gray-600 mb-6">Bądź pierwszy! Dodaj swoje zlecenie transportowe.</p>
        <Link href="/listings/new" className="btn btn-primary">
          Dodaj zlecenie
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/listings/${listing.slug}`}
          className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {listing.title}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{listing.from_address?.city || 'N/A'}</div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="truncate">{listing.to_address?.city || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-primary-600" />
                <span>
                  {formatDistanceToNow(new Date(listing.created_at), {
                    addSuffix: true,
                    locale: pl,
                  })}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dystans:</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round(Number(listing.distance_km))} km
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
              Zobacz szczegóły →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
