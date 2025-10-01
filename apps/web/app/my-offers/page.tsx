import React, { useEffect, useState } from 'react';

export default function MyOffersPage() {
  const [offers, setOffers] = useState([]);
  const [tab, setTab] = useState('PENDING');

  useEffect(() => {
    fetch(`/api/offers?carrier_id=me&status=${tab}`)
      .then(res => res.json())
      .then(data => setOffers(data));
  }, [tab]);

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">Moje oferty</h1>
      <div className="flex gap-2 mb-4">
        {['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'].map(status => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${tab === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTab(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div>
        {offers.map(offer => (
          <div key={offer.id} className="border rounded p-4 mb-2 flex justify-between items-center">
            <div>
              <div className="font-bold">{offer.listing?.title}</div>
              <div className="text-sm text-gray-600">
                {offer.listing?.from_address_json?.city} → {offer.listing?.to_address_json?.city}
              </div>
              <div className="text-xs text-gray-500">{offer.price} {offer.currency}</div>
              <div className="text-xs text-gray-500">{offer.created_at?.slice(0, 10)}</div>
            </div>
            <div>
              <span className={`px-2 py-1 rounded ${offer.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : offer.status === 'REJECTED' ? 'bg-red-100 text-red-800' : offer.status === 'WITHDRAWN' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {offer.status}
              </span>
              {offer.status === 'PENDING' && (
                <button className="ml-2 text-red-500" /* onClick={withdrawOffer} */>Wycofaj</button>
              )}
              <button className="ml-2 text-blue-500">Zobacz</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
