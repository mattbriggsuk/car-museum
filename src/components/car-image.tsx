import type { CarImage as CarImageData } from '@/lib/catalogue';

export function CarImage({ image, className = '', showCaption = true }: { image: CarImageData; className?: string; showCaption?: boolean }) {
  return (
    <figure className={`car-image ${className}`}>
      <img src={image.src} alt={image.alt} width="900" height="600" loading="lazy" />
      {image.placeholder ? <figcaption>Illustration · photograph coming soon</figcaption> : showCaption && image.credit && (
        <figcaption title={image.credit}>
          {image.view && <span className="car-image-view">{image.view} view</span>}
          {image.credit}
          {image.note && <span className="car-image-note">{image.note}</span>}
        </figcaption>
      )}
    </figure>
  );
}
