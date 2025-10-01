import Image, { ImageProps } from 'next/image';
import React from 'react';

type OptimizedImageProps = Omit<ImageProps, 'quality' | 'loading' | 'sizes'>;

export default function OptimizedImage(props: OptimizedImageProps) {
  return (
    <Image
      {...props}
      loading="lazy"
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
}
