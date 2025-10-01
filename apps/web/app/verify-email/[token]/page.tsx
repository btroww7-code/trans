'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    fetch(`/api/auth/verify-email?token=${params.token}`)
      .then(res => {
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [params.token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Weryfikacja email</h1>

        {status === 'verifying' && (
          <p className="text-gray-600">Weryfikowanie adresu email...</p>
        )}

        {status === 'success' && (
          <div>
            <p className="text-green-600 mb-4">Email został zweryfikowany pomyślnie!</p>
            <Link href="/login" className="btn btn-primary">
              Przejdź do logowania
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <p className="text-red-600 mb-4">Nie udało się zweryfikować adresu email.</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Powrót do strony głównej
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
