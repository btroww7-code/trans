import React from 'react';

export default function ReviewsList({ reviews }) {
  return (
    <div>
      {reviews.map(r => (
        <div key={r.id} className="border rounded p-4 mb-2">
          <div className="font-bold">{r.overall_rating} ★</div>
          <div className="text-xs text-gray-500">
            Komunikacja: {r.categories_json.communication} ★, Terminowość: {r.categories_json.timeliness} ★, Profesjonalizm: {r.categories_json.professionalism} ★, Jakość/cena: {r.categories_json.value} ★
          </div>
          <div className="mt-2">{r.comment}</div>
          <div className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</div>
          {r.response && (
            <div className="mt-2 bg-gray-100 p-2 rounded text-sm">
              <span className="font-semibold">Odpowiedź:</span> {r.response}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
