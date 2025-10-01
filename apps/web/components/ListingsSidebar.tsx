import React from 'react';

export default function ListingsSidebar({ filters, setFilters }) {
  // ...fetch categories for checkboxes...
  // ...inputs for from_city, to_city, date range, weight slider, sort dropdown...
  return (
    <aside className="w-72 p-4 border rounded bg-white">
      {/* Kategoria */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Kategoria</div>
        {/* ...checkboxes... */}
      </div>
      {/* Lokalizacja */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Miasto początkowe</div>
        <input
          type="text"
          value={filters.from_city || ''}
          onChange={e => setFilters(f => ({ ...f, from_city: e.target.value }))}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Miasto docelowe</div>
        <input
          type="text"
          value={filters.to_city || ''}
          onChange={e => setFilters(f => ({ ...f, to_city: e.target.value }))}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      {/* Zakres dat pickup */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Data odbioru</div>
        {/* ...date range picker... */}
      </div>
      {/* Waga */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Waga (kg)</div>
        {/* ...dual range slider... */}
      </div>
      {/* Sortowanie */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Sortowanie</div>
        <select
          value={filters.sort || 'created_at'}
          onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="created_at">Najnowsze</option>
          <option value="pickup_date_from">Data odbioru</option>
          <option value="offers_count">Liczba ofert</option>
        </select>
      </div>
    </aside>
  );
}
