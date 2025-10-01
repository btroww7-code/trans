'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Resetuj hasło</h1>
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Wyślij link resetujący
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Link resetujący został wysłany na podany adres email.
            </p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Powrót do logowania
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
