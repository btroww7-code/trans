import React, { useState } from 'react';

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState({
    offers: true,
    status: true,
    messages: true,
    newsletter: false,
  });

  const handleSave = async () => {
    await fetch('/api/user/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences_json: prefs }),
    });
    // toast success (sonner)
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="font-bold text-xl mb-4">Powiadomienia email</h1>
      <label><input type="checkbox" checked={prefs.offers} onChange={e => setPrefs(p => ({ ...p, offers: e.target.checked }))} /> Nowe oferty</label>
      <br />
      <label><input type="checkbox" checked={prefs.status} onChange={e => setPrefs(p => ({ ...p, status: e.target.checked }))} /> Zmiana statusu</label>
      <br />
      <label><input type="checkbox" checked={prefs.messages} onChange={e => setPrefs(p => ({ ...p, messages: e.target.checked }))} /> Nowe wiadomości</label>
      <br />
      <label><input type="checkbox" checked={prefs.newsletter} onChange={e => setPrefs(p => ({ ...p, newsletter: e.target.checked }))} /> Newsletter</label>
      <br />
      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>Zapisz</button>
    </div>
  );
}
