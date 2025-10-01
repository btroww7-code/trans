'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Package, MapPin, Calendar, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function NewListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    fromAddress: '',
    toAddress: '',
    pickupDate: '',
    deliveryDate: '',
    flexibleDates: false,
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    quantity: 1,
    vehicleType: '',
    images: [],
    additionalInfo: ''
  })

  const categories = [
    { id: 'meble', name: 'Meble', icon: '🪑', description: 'Sofy, stoły, szafy, krzesła' },
    { id: 'przeprowadzki', name: 'Przeprowadzki', icon: '🚚', description: 'Całe mieszkania, domy' },
    { id: 'samochody', name: 'Samochody', icon: '🚗', description: 'Auta osobowe, motocykle' },
    { id: 'palety', name: 'Palety', icon: '📦', description: 'Towary na paletach' },
    { id: 'paczki', name: 'Paczki', icon: '📮', description: 'Małe przesyłki' },
    { id: 'ladunki', name: 'Ładunki', icon: '🧱', description: 'Materiały budowlane' },
    { id: 'maszyny', name: 'Maszyny', icon: '🛠️', description: 'Sprzęt przemysłowy' },
    { id: 'zwierzeta', name: 'Zwierzęta', icon: '🐶', description: 'Transport zwierząt' }
  ]

  const steps = [
    { id: 1, name: 'Kategoria', icon: Package },
    { id: 2, name: 'Trasa', icon: MapPin },
    { id: 3, name: 'Terminy', icon: Calendar },
    { id: 4, name: 'Szczegóły', icon: FileText },
    { id: 5, name: 'Podsumowanie', icon: CheckCircle }
  ]

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Submitting:', formData)
    // Here you would submit to your API
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/listings" className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do zleceń
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Dodaj nowe zlecenie</h1>
        <p className="text-gray-600 mt-2">Wypełnij formularz, aby dodać swoje zlecenie transportowe</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive ? 'border-primary-600 bg-primary-600 text-white' :
                  isCompleted ? 'border-green-500 bg-green-500 text-white' :
                  'border-gray-300 bg-white text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-primary-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="card">
        {/* Step 1: Category */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Wybierz kategorię</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    formData.category === category.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Route */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Określ trasę</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł zlecenia
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="np. Transport mebli z Warszawy do Krakowa"
                  className="input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres odbioru
                  </label>
                  <input
                    type="text"
                    value={formData.fromAddress}
                    onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                    placeholder="Warszawa, ul. Marszałkowska 1"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres dostawy
                  </label>
                  <input
                    type="text"
                    value={formData.toAddress}
                    onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
                    placeholder="Kraków, ul. Floriańska 10"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opis zlecenia
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Opisz szczegółowo co ma być transportowane..."
                  rows={4}
                  className="input"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Dates */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Określ terminy</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="flexibleDates"
                  checked={formData.flexibleDates}
                  onChange={(e) => setFormData({ ...formData, flexibleDates: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="flexibleDates" className="ml-2 block text-sm text-gray-900">
                  Mam elastyczne terminy
                </label>
              </div>

              {!formData.flexibleDates && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data odbioru
                    </label>
                    <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data dostawy
                    </label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Szczegóły transportu</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waga (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="np. 500"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ilość
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    min="1"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wymiary (cm)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      dimensions: { ...formData.dimensions, length: e.target.value }
                    })}
                    placeholder="Długość"
                    className="input"
                  />
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      dimensions: { ...formData.dimensions, width: e.target.value }
                    })}
                    placeholder="Szerokość"
                    className="input"
                  />
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      dimensions: { ...formData.dimensions, height: e.target.value }
                    })}
                    placeholder="Wysokość"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ pojazdu
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="input"
                >
                  <option value="">Wybierz typ pojazdu</option>
                  <option value="van">Dostawczy</option>
                  <option value="truck">Ciężarowy</option>
                  <option value="trailer">Naczepa</option>
                  <option value="special">Specjalistyczny</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dodatkowe informacje
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Dodatkowe wymagania, uwagi..."
                  rows={3}
                  className="input"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Podsumowanie</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Szczegóły zlecenia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Kategoria:</span>
                    <span className="ml-2 font-medium">
                      {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tytuł:</span>
                    <span className="ml-2 font-medium">{formData.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Z:</span>
                    <span className="ml-2 font-medium">{formData.fromAddress}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Do:</span>
                    <span className="ml-2 font-medium">{formData.toAddress}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Waga:</span>
                    <span className="ml-2 font-medium">{formData.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ilość:</span>
                    <span className="ml-2 font-medium">{formData.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informacja</h4>
                <p className="text-sm text-blue-800">
                  Po opublikowaniu zlecenia, przewoźnicy będą mogli składać oferty. 
                  Otrzymasz powiadomienia o nowych ofertach na email i w aplikacji.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`btn ${currentStep === 1 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-secondary'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wstecz
          </button>

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="btn btn-primary"
            >
              Dalej
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn btn-success"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Opublikuj zlecenie
            </button>
          )}
        </div>
      </div>
    </div>
  )
}