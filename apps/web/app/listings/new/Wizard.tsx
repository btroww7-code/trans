'use client';

import React, { useState } from 'react';

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-1/4 h-2 rounded ${
                s <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Wybierz kategorię</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            <option value="">Wybierz kategorię</option>
            <option value="furniture">Meble</option>
            <option value="car">Pojazdy</option>
            <option value="construction">Materiały budowlane</option>
          </select>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Trasa transportu</h2>
          <p className="text-gray-600">Określ punkt początkowy i końcowy</p>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Szczegóły przesyłki</h2>
          <p className="text-gray-600">Waga, wymiary, ilość</p>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Podsumowanie</h2>
          <p className="text-gray-600">Sprawdź dane i opublikuj</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="btn btn-secondary">
            Wstecz
          </button>
        )}
        {step < 4 && (
          <button onClick={() => setStep(step + 1)} className="btn btn-primary ml-auto">
            Dalej
          </button>
        )}
        {step === 4 && (
          <button className="btn btn-primary ml-auto">Opublikuj</button>
        )}
      </div>
    </div>
  );
}
