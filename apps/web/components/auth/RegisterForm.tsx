'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Hasła nie są identyczne');
      return;
    }
    if (!terms) {
      alert('Musisz zaakceptować regulamin');
      return;
    }
    console.log('Register:', { email, password, role });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hasło
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Potwierdź hasło
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rola
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                checked={role === 'user'}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Użytkownik
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="provider"
                checked={role === 'provider'}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Przewoźnik
            </label>
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mr-2"
              required
            />
            Akceptuję regulamin
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}