'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/profiles/${params.id}`)
      .then(res => res.json())
      .then(setProfile)
      .catch(err => console.error('Error loading profile:', err));
  }, [params.id]);

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Ładowanie profilu...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">
          {profile.company_name || profile.email}
        </h1>
        <div className="text-gray-600">
          <p>Typ: {profile.type}</p>
          <p>Ocena: {profile.rating_avg?.toFixed(1)} / 5.0</p>
          <p>Liczba ocen: {profile.rating_count}</p>
        </div>
      </div>
    </div>
  );
}