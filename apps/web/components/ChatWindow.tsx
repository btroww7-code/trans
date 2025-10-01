import React, { useState } from 'react';

interface ChatWindowProps {
  conversationId: any;
  token: any;
}

export default function ChatWindow({ conversationId, token }: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender_id: 'me', body: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-2 p-4">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center">Brak wiadomości</div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`mb-2 ${m.sender_id === 'me' ? 'text-right' : 'text-left'}`}>
              <span className="inline-block px-3 py-2 rounded bg-gray-100">{m.body}</span>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2 p-4 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Napisz wiadomość..."
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
