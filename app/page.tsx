import Link from 'next/link'
import { Truck, Users, Shield, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transport Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Zleć przewóz, znajdź przewoźnika, porównaj oferty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                Przeglądaj zlecenia
              </Link>
              <Link href="/listings/new" className="btn bg-primary-700 text-white hover:bg-primary-800 text-lg px-8 py-3">
                Dodaj zlecenie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Jak to działa?</h2>
            <p className="text-xl text-gray-600">Prosty proces w trzech krokach</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Dodaj zlecenie</h3>
              <p className="text-gray-600">Opisz swój transport i otrzymaj oferty od przewoźników</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Porównaj oferty</h3>
              <p className="text-gray-600">Wybierz najlepszą ofertę spośród zgłoszeń przewoźników</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Bezpieczna realizacja</h3>
              <p className="text-gray-600">Monitoruj przesyłkę i dokonaj płatności po dostawie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1,250+</div>
              <div className="text-gray-600">Aktywnych zleceń</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">850+</div>
              <div className="text-gray-600">Przewoźników</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">3,400+</div>
              <div className="text-gray-600">Zrealizowanych transportów</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.8</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                Średnia ocena
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Gotowy na start?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Dołącz do tysięcy zadowolonych użytkowników już dziś
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary text-lg px-8 py-3">
              Zarejestruj się
            </Link>
            <Link href="/login" className="btn btn-secondary text-lg px-8 py-3">
              Zaloguj się
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}