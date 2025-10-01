import React, { useEffect, useState } from 'react';

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      fetch('/api/notifications?unread=true')
        .then(res => res.json())
        .then(data => {
          setNotifications(data);
          setCount(data.length);
        });
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = async (id, link) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
    window.location.href = link;
  };

  return (
    <div className="relative">
      <span className="text-2xl cursor-pointer" onClick={() => setDropdown(d => !d)}>🔔</span>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">{count}</span>
      )}
      {dropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-2 z-50">
          {notifications.length === 0 ? (
            <div className="text-gray-500 p-2">Brak nowych powiadomień</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="p-2 border-b cursor-pointer hover:bg-gray-100" onClick={() => handleClick(n.id, n.link)}>
                <div className="font-bold">{n.title}</div>
                <div className="text-xs text-gray-500">{n.body}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
