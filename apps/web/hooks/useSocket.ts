import { useEffect, useRef } from 'react';

export function useSocket(token: string) {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    console.log('Socket connection would be established with token:', token);
    return () => {
      console.log('Socket would be disconnected');
    };
  }, [token]);

  return socketRef.current;
}
