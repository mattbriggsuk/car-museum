'use client';

import { useState } from 'react';
import type { CarImage } from '@/lib/catalogue';
import { ImageZoomDialog } from './image-zoom-dialog';

export function CarGallery({ name, images }: { name: string; images: CarImage[] }) {
  const [selectedImage, setSelectedImage] = useState<CarImage | null>(null);

  return (
    <>
      <section className="car-gallery" aria-label={`${name} images`}>
        {images.map((image) => (
          <figure key={image.src} className="car-image gallery-image">
            <button
              type="button"
              className="gallery-image-trigger"
              aria-label={`Enlarge ${image.alt}`}
              aria-haspopup="dialog"
              disabled={image.placeholder}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} width="900" height="600" loading="lazy" />
              {!image.placeholder && <span className="gallery-zoom-hint" aria-hidden="true">＋ Zoom</span>}
            </button>
            {image.placeholder && <figcaption>Illustration · photograph coming soon</figcaption>}
          </figure>
        ))}
      </section>
      <ImageZoomDialog image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}
