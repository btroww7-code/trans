import React, { useState } from 'react';
import { useConversation } from '../hooks/useConversation';

export default function ChatWindow({ conversationId, token }) {
  const { messages, sendMessage, typing, sendTyping } = useConversation(conversationId, token);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender_id === 'me' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-2 rounded bg-gray-100">{m.body}</span>
          </div>
        ))}
        {typing && <div className="text-xs text-gray-400">Ktoś pisze...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            sendTyping();
          }}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Napisz wiadomość..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            sendMessage(input);
            setInput('');
          }}
          disabled={!input}
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
    if (isCarrier) {
      inputDisabled = true;
      infoBanner = (
        <div className="bg-yellow-100 text-yellow-800 p-2 mb-2 rounded text-sm">
          ⚠️ Kontakt będzie dostępny po zaakceptowaniu oferty. Obecnie możesz tylko odpowiadać na pytania klienta.
        </div>
      );
    }
    if (isClient) {
      inputDisabled = questionCount >= 3;
      infoBanner = (
        <div className="bg-blue-100 text-blue-800 p-2 mb-2 rounded text-sm">
          Możesz wysłać jeszcze {3 - questionCount} pytania przed akceptacją oferty.
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map(m => (
          <div key={m.id} className={`mb-2 ${m.sender_id === userId ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-2 rounded bg-gray-100">{m.body}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {infoBanner}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={inputDisabled || sending}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Napisz wiadomość..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
          disabled={inputDisabled || sending || !input}
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
