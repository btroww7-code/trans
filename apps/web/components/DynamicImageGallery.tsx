import dynamic from 'next/dynamic';

const ImageGallery = dynamic(() => import('./ImageGallery'), { ssr: false, loading: () => <div>Ładowanie galerii...</div> });

export default ImageGallery;
