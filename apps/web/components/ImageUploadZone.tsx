import React, { useState } from 'react';

interface ImageUploadZoneProps {
  images: any[];
  setImages: (images: any[]) => void;
}

export default function ImageUploadZone({ images, setImages }: ImageUploadZoneProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 10) {
      alert('Maksymalnie 10 zdjęć');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));

    try {
      const res = await fetch('/api/uploads/listing-images', { method: 'POST', body: formData });
      const urls = await res.json();
      setImages([...images, ...urls]);
    } catch (error) {
      console.error('Upload error:', error);
    }

    setUploading(false);
  };

  return (
    <div className="border-dashed border-2 p-6 rounded mb-4">
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="text-gray-600 text-sm">
        Wybierz zdjęcia (max 10, JPG/PNG/WebP, max 5MB każde)
      </div>
      {uploading && <div className="mt-2 text-blue-600">Ładowanie...</div>}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={img.thumbnailUrl || img} alt="" className="w-full h-20 object-cover rounded" />
            <button
              className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs"
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
