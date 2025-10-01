import React from 'react';
import Link from 'next/link';

function highlight(text, term) {
  if (!term) return text;
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? <mark key={i}>{part}</mark> : part
  );
}

export default function ListingCard({ listing, highlight: term }) {
  const isNew = (Date.now() - new Date(listing.created_at).getTime()) < 86400000;
  return (
    <Link href={`/listings/${listing.slug}`}>
      <div className="border rounded p-4 flex gap-4 items-center hover:shadow transition mb-4">
        <span className="text-3xl">{listing.category?.icon}</span>
        <div className="flex-1">
          <div className="font-bold text-lg">{highlight(listing.title, term)}</div>
          <div className="text-sm text-gray-600">
            {listing.from_address_json?.city} → {listing.to_address_json?.city}
            {' • '}
            {listing.distance_km} km
            {' • '}
            {listing.weight_kg ? `${listing.weight_kg} kg` : null}
          </div>
          <div className="text-xs text-gray-500">
            {listing.flexible_dates
              ? 'Elastyczny termin'
              : `${listing.pickup_date_from?.slice(0, 10)} - ${listing.delivery_date_to?.slice(0, 10)}`}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isNew && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Nowe</span>}
          {listing.offers_count > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{listing.offers_count} ofert</span>
          )}
        </div>
      </div>
    </Link>
  );
}
