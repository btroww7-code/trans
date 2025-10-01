'use client';

import React, { useEffect, useState } from 'react';

export default function PayPage({ params }: { params: { id: string } }) {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/contracts/${params.id}`)
      .then(res => res.json())
      .then(setContract)
      .catch(err => console.error('Error loading contract:', err));
  }, [params.id]);

  if (!contract) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Płatność za kontrakt</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">ID kontraktu: {contract.id}</p>
        <p className="text-2xl font-bold mb-4">
          Kwota: {contract.amount} {contract.currency}
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            Integracja płatności Stripe będzie dostępna po skonfigurowaniu kluczy API.
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-colors"
          disabled
        >
          Opłać (wkrótce)
        </button>
      </div>
    </div>
  );
}
