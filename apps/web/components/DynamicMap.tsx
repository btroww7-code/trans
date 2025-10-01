import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./ListingMap'), { ssr: false, loading: () => <div>Ładowanie mapy...</div> });

export default Map;
