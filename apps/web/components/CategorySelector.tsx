import React from 'react';

export default function CategorySelector({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map(cat => (
        <div key={cat.id} className="flex flex-col items-center p-4 border rounded">
          <span className="text-3xl">{cat.icon}</span>
          <span>{cat.name_pl}</span>
          <span className="text-xs text-gray-500">{cat._count?.listings ?? 0} aktywnych zleceń</span>
        </div>
      ))}
    </div>
  );
}
