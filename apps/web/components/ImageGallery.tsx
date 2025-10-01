import React, { useState } from 'react';
// import Lightbox from 'react-image-lightbox'; // npm install react-image-lightbox

export default function ImageGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.thumbnailUrl}
            alt=""
            className="w-20 h-20 object-cover rounded cursor-pointer"
            onClick={() => { setIndex(i); setOpen(true); }}
          />
        ))}
      </div>
      {/* {open && (
        <Lightbox
          mainSrc={images[index].previewUrl}
          nextSrc={images[(index + 1) % images.length].previewUrl}
          prevSrc={images[(index + images.length - 1) % images.length].previewUrl}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )} */}
    </div>
  );
}
