import React, { useState } from 'react';

export default function OfferModal({ listingId, onClose }) {
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    // Validation: price > 0, dates future, pickup < delivery
    setLoading(true);
    await fetch('/api/offers', {
      method: 'POST',
      body: JSON.stringify({
        listing_id: listingId,
        price,
        currency,
        estimated_pickup_date: pickupDate,
        estimated_delivery_date: deliveryDate,
        message,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    setLoading(false);
    setSent(true);
    // toast success
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="font-bold mb-4">Złóż ofertę</h2>
        <input type="number" min={1} value={price} onChange={e => setPrice(e.target.value)} placeholder="Cena" className="mb-2 w-full border rounded px-2 py-1" />
        <select value={currency} onChange={e => setCurrency(e.target.value)} className="mb-2 w-full border rounded px-2 py-1">
          <option value="PLN">PLN</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="mb-2 w-full border rounded px-2 py-1" />
        <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="mb-2 w-full border rounded px-2 py-1" />
        <textarea maxLength={1000} value={message} onChange={e => setMessage(e.target.value)} placeholder="Wiadomość do klienta" className="mb-2 w-full border rounded px-2 py-1" />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
          disabled={loading || sent}
        >
          {sent ? 'Oferta wysłana' : loading ? 'Wysyłanie...' : 'Wyślij ofertę'}
        </button>
        <button className="mt-2 text-gray-500 w-full" onClick={onClose}>Anuluj</button>
      </div>
    </div>
  );
}
