import React, { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [tab, setTab] = useState('unread');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`/api/notifications?unread=${tab === 'unread'}`)
      .then(res => res.json())
      .then(setNotifications);
  }, [tab]);

  const markAllRead = async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' });
    setTab('all');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="font-bold text-xl mb-4">Powiadomienia</h1>
      <div className="flex gap-2 mb-4">
        <button className={`px-3 py-1 rounded ${tab === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab('unread')}>Nieprzeczytane</button>
        <button className={`px-3 py-1 rounded ${tab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab('all')}>Wszystkie</button>
        <button className="ml-auto bg-green-600 text-white px-4 py-1 rounded" onClick={markAllRead}>Oznacz wszystkie jako przeczytane</button>
      </div>
      <div>
        {notifications.length === 0 ? (
          <div className="text-gray-500 p-2">Brak powiadomień</div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`p-2 border-b ${!n.read_at ? 'bg-yellow-50' : ''}`}>
              <div className="font-bold">{n.title}</div>
              <div className="text-xs text-gray-500">{n.body}</div>
              <a href={n.link} className="text-blue-600 text-xs">Przejdź</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
