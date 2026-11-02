'use client';

import { useEffect, useId, useRef } from 'react';
import type { CarImage } from '@/lib/catalogue';

export function ImageZoomDialog({ image, onClose }: { image: CarImage | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!image || !element) return;

    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [image]);

  return (
    <dialog
      ref={dialog}
      className="image-zoom-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}
    >
      {image && (
        <>
          <div className="image-zoom-header">
            <h2 id={titleId}>{image.alt}</h2>
            <button type="button" className="image-zoom-close" aria-label="Close image viewer" onClick={() => dialog.current?.close()} autoFocus>×</button>
          </div>
          <figure className="image-zoom-figure">
            <div className="image-zoom-media"><img src={image.src} alt={image.alt} /></div>
            <figcaption className="image-zoom-credits">
              {image.credit && <p>{image.credit}</p>}
              {image.note && <p>{image.note}</p>}
              <div className="image-zoom-links">
                {image.source && <a href={image.source} target="_blank" rel="noreferrer">Original photograph ↗</a>}
                {image.licenseUrl && <a href={image.licenseUrl} target="_blank" rel="noreferrer">Licence details ↗</a>}
              </div>
            </figcaption>
          </figure>
        </>
      )}
    </dialog>
  );
}
