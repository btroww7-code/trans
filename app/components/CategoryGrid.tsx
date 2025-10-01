'use client'

import Link from 'next/link'
import { Home, Car, Package, Dog, Box, Sofa, Bike, Wrench, Ruler } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const iconMap: { [key: string]: any } = {
  home: Home,
  car: Car,
  package: Package,
  dog: Dog,
  box: Box,
  sofa: Sofa,
  bike: Bike,
  tool: Wrench,
  ruler: Ruler,
}

interface Category {
  id: number
  name_pl: string
  slug: string
  icon: string
  parent_id: number | null
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .eq('active', true)
        .order('order_index')
        .limit(6)

      if (data) {
        setCategories(data as Category[])
      }
    }

    fetchCategories()
  }, [])

  if (categories.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-32"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Package
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-primary-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {category.name_pl}
              </h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
