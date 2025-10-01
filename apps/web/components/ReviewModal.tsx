import React, { useState } from 'react';

export default function ReviewModal({ contractId, reviewedId, reviewerId, onClose }) {
  const [categories, setCategories] = useState({
    communication: 5,
    timeliness: 5,
    professionalism: 5,
    value: 5,
  });
  const [comment, setComment] = useState('');
  const overall = Math.round(
    (categories.communication + categories.timeliness + categories.professionalism + categories.value) / 4
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contract_id: contractId,
        reviewer_id: reviewerId,
        reviewed_id: reviewedId,
        overall_rating: overall,
        categories_json: categories,
        comment,
      }),
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="font-bold mb-4">Wystaw ocenę</h2>
        {Object.keys(categories).map(key => (
          <div key={key} className="mb-2">
            <label>{key}</label>
            <input
              type="range"
              min={1}
              max={5}
              value={categories[key]}
              onChange={e => setCategories({ ...categories, [key]: Number(e.target.value) })}
            />
            <span className="ml-2">{categories[key]} ★</span>
          </div>
        ))}
        <div className="mb-2">
          <label>Komentarz</label>
          <textarea
            maxLength={2000}
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="mb-2 font-bold">Ocena końcowa: {overall} ★</div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Wysyłanie...' : 'Wyślij ocenę'}
        </button>
        <button className="mt-2 text-gray-500 w-full" onClick={onClose}>Anuluj</button>
      </div>
    </div>
  );
}
