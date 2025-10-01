import dynamic from 'next/dynamic';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false, loading: () => <div>Ładowanie czatu...</div> });

export default ChatWindow;
