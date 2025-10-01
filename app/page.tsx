import Link from 'next/link'
import { Truck, Package, Shield, Star, MapPin, Calendar, TrendingUp, Users, CheckCircle, Search } from 'lucide-react'
import { SearchBar } from './components/SearchBar'
import { CategoryGrid } from './components/CategoryGrid'
import { RecentListings } from './components/RecentListings'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Znajdź przewoźnika.<br />
                Porównaj oferty.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-50">
                Szybko, bezpiecznie i tanio. Tysiące sprawdzonych przewoźników czeka na Twoje zlecenie.
              </p>

              <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
                <SearchBar />
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/listings"
                  className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Przeglądaj zlecenia
                </Link>
                <Link
                  href="/listings/new"
                  className="btn bg-primary-800 text-white hover:bg-primary-900 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Dodaj zlecenie
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-white/20 rounded-lg p-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-100">Aktywnych zleceń</div>
                        <div className="text-2xl font-bold">1,250+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/20 rounded-lg p-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-100">Zweryfikowanych przewoźników</div>
                        <div className="text-2xl font-bold">850+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/20 rounded-lg p-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-100">Średnia ocena</div>
                        <div className="text-2xl font-bold">4.8/5.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Popularne kategorie</h2>
            <p className="text-xl text-gray-600">Wybierz rodzaj transportu i otrzymaj oferty</p>
          </div>

          <CategoryGrid />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Jak to działa?</h2>
            <p className="text-xl text-gray-600">Prosty proces w trzech krokach</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-center">
                  <div className="text-primary-600 font-bold text-lg mb-2">Krok 1</div>
                  <h3 className="text-xl font-semibold mb-3">Dodaj zlecenie</h3>
                  <p className="text-gray-600">Opisz swój transport: skąd dokąd, co i kiedy. To zajmie tylko 2 minuty.</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-center">
                  <div className="text-primary-600 font-bold text-lg mb-2">Krok 2</div>
                  <h3 className="text-xl font-semibold mb-3">Porównaj oferty</h3>
                  <p className="text-gray-600">Otrzymaj oferty od zweryfikowanych przewoźników. Sprawdź ceny i oceny.</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-center">
                  <div className="text-primary-600 font-bold text-lg mb-2">Krok 3</div>
                  <h3 className="text-xl font-semibold mb-3">Bezpieczna realizacja</h3>
                  <p className="text-gray-600">Śledź przesyłkę w czasie rzeczywistym. Płać dopiero po dostarczeniu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Najnowsze zlecenia</h2>
            <p className="text-xl text-gray-600">Sprawdź aktualne oferty transportowe</p>
          </div>

          <RecentListings />

          <div className="text-center mt-8">
            <Link href="/listings" className="btn btn-primary text-lg px-8 py-3">
              Zobacz wszystkie zlecenia
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Dlaczego Transport Marketplace?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Zweryfikowani przewoźnicy</h3>
                    <p className="text-gray-600">Wszystkie firmy transportowe są weryfikowane. Sprawdzamy dokumenty i licencje.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bezpieczne płatności</h3>
                    <p className="text-gray-600">Płacisz dopiero po dostarczeniu. Pieniądze są zabezpieczone na platformie.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">System ocen i opinii</h3>
                    <p className="text-gray-600">Każdy transport możesz ocenić. Pomagasz innym w wyborze najlepszych.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Śledzenie przesyłki</h3>
                    <p className="text-gray-600">Zawsze wiesz gdzie jest Twoja przesyłka. Aktualizacje w czasie rzeczywistym.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="text-center border-b border-gray-200 pb-6">
                    <div className="text-5xl font-bold text-primary-600 mb-2">3,400+</div>
                    <div className="text-gray-600">Zrealizowanych transportów</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                      <div className="text-sm text-gray-600">Zadowolonych klientów</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-1">24h</div>
                      <div className="text-sm text-gray-600">Średni czas odpowiedzi</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white text-center">
                    <Star className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                    <div className="text-3xl font-bold mb-1">4.8/5.0</div>
                    <div className="text-primary-100">Średnia ocena platformy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gotowy na start?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Dołącz do tysięcy zadowolonych użytkowników już dziś. Rejestracja jest darmowa!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              Zarejestruj się za darmo
            </Link>
            <Link
              href="/login"
              className="btn bg-primary-700 text-white hover:bg-primary-800 text-lg px-8 py-4 border-2 border-white/20 hover:border-white/40 transition-all"
            >
              Mam już konto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
