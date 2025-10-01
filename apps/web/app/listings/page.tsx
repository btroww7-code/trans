'use client';

import React, { useEffect, useState } from 'react';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/search/listings?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setListings(data.data || []);
        setTotal(data.total || 0);
      })
      .catch(err => console.error('Error loading listings:', err));
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Wszystkie zlecenia</h1>
        <p className="text-gray-600">{total} wyników znalezionych</p>
      </div>
      <div className="grid gap-4">
        {listings.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Brak zleceń do wyświetlenia
          </div>
        ) : (
          listings.map((listing: any) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <p className="text-gray-600">{listing.description}</p>
            </div>
          ))
        )}
        {total > 40 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(total / 40) }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
