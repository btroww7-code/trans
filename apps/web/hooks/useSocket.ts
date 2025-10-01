import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(token: string) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('/chat', { auth: { token } });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [token]);

  return socketRef.current;
}
