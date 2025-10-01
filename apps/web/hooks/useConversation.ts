import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

export function useConversation(conversationId, token) {
  const socket = useSocket(token);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join_conversation', { conversation_id: conversationId });

    socket.on('new_message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('typing', () => setTyping(true));

    return () => {
      socket.emit('leave_conversation', { conversation_id: conversationId });
      socket.off('new_message');
      socket.off('typing');
    };
  }, [socket, conversationId]);

  const sendMessage = body => {
    socket.emit('send_message', { conversation_id: conversationId, body });
    // Optimistic UI
    setMessages(prev => [...prev, { body, sender_id: 'me', created_at: new Date() }]);
  };

  const sendTyping = () => {
    socket.emit('typing', { conversation_id: conversationId });
  };

  return { messages, sendMessage, typing, sendTyping };
}
