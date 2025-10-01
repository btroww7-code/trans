import React, { useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const userId = 'me'; // pobierz z auth context

  useEffect(() => {
    fetch('/api/conversations')
      .then(res => res.json())
      .then(setConversations);
  }, []);

  return (
    <div className="flex h-full">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold mb-4">Wiadomości</h2>
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`p-2 rounded cursor-pointer ${selected?.id === conv.id ? 'bg-blue-100' : ''}`}
            onClick={() => setSelected(conv)}
          >
            {/* avatar, name, unread badge */}
            <span>{conv.participant_1_id === userId ? conv.participant_2?.profile?.company_name : conv.participant_1?.profile?.company_name}</span>
            {conv.unread_count > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">{conv.unread_count}</span>
            )}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-4">
        {selected ? (
          <ChatWindow
            conversation={selected}
            userId={userId}
            isCarrier={selected.participant_2_id === userId}
            isClient={selected.participant_1_id === userId}
          />
        ) : (
          <div className="text-gray-500">Wybierz konwersację z listy</div>
        )}
      </main>
    </div>
  );
}
