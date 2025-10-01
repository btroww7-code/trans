import React from 'react';

interface ListingMapProps {
  from: { lng: number; lat: number; formatted: string };
  to: { lng: number; lat: number; formatted: string };
}

export default function ListingMap({ from, to }: ListingMapProps) {
  if (!from || !to) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
        Mapa będzie dostępna po dodaniu lokalizacji
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-sm font-medium">Punkt początkowy:</span>
          <span className="text-sm text-gray-600">{from.formatted}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="text-sm font-medium">Punkt końcowy:</span>
          <span className="text-sm text-gray-600">{to.formatted}</span>
        </div>
      </div>
      <div className="bg-white rounded h-64 flex items-center justify-center text-gray-400">
        Mapa trasy (Mapbox będzie zintegrowany)
      </div>
    </div>
  );
}
