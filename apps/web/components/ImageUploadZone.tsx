import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadZone({ images, setImages }) {
  const [uploading, setUploading] = useState(false);

  const onDrop = async acceptedFiles => {
    if (images.length + acceptedFiles.length > 10) return;
    setUploading(true);
    const formData = new FormData();
    acceptedFiles.forEach(f => formData.append('files', f));
    const res = await fetch('/api/uploads/listing-images', { method: 'POST', body: formData });
    const urls = await res.json();
    setImages([...images, ...urls]);
    setUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 10 - images.length,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-4 rounded mb-4 cursor-pointer">
      <input {...getInputProps()} />
      <div>Przeciągnij i upuść zdjęcia (max 10, JPG/PNG/WebP, max 5MB każde)</div>
      {uploading && <div className="mt-2">Ładowanie...</div>}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={img.thumbnailUrl} alt="" className="w-full h-20 object-cover rounded" />
            <button
              className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs"
              onClick={e => { e.stopPropagation(); setImages(images.filter((_, idx) => idx !== i)); }}
            >Usuń</button>
          </div>
        ))}
      </div>
    </div>
  );
}
