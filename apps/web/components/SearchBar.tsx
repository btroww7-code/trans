import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const handleSearch = e => {
    e.preventDefault();
    router.push(`/listings?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Szukaj zleceń..."
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        🔍
      </button>
    </form>
  );
}
