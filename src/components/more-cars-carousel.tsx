'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { CarImage as CarImageData } from '@/lib/catalogue';
import { CarImage } from './car-image';

interface RelatedCar {
  slug: string;
  name: string;
  year: number;
  country: string;
  image: CarImageData;
}

export function MoreCarsCarousel({ year, cars }: { year: number; cars: RelatedCar[] }) {
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setCanScroll({
      previous: element.scrollLeft > 1,
      next: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    });
    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  function scroll(direction: number) {
    const element = track.current;
    if (!element) return;
    const first = element.firstElementChild;
    const distance = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap) : element.clientWidth;
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  if (cars.length === 0) return null;

  return (
    <section className="more-cars" aria-labelledby={`${id}-heading`}>
      <div className="more-cars-header">
        <div>
          <span className="eyebrow">KEEP EXPLORING THE COLLECTION</span>
          <h2 id={`${id}-heading`}>More cars from the {year}s</h2>
        </div>
        <div className="carousel-controls" role="group" aria-label="Browse more cars">
          <button type="button" aria-label="Previous cars" aria-controls={`${id}-track`} disabled={!canScroll.previous} onClick={() => scroll(-1)}>←</button>
          <button type="button" aria-label="Next cars" aria-controls={`${id}-track`} disabled={!canScroll.next} onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <ul
        ref={track}
        id={`${id}-track`}
        className="more-cars-track"
        tabIndex={0}
        aria-label={`Other cars from the ${year}s; scroll horizontally to browse`}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            scroll(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {cars.map((car) => (
          <li key={car.slug}>
            <Link href={`/museum/${year}/${car.slug}`} className="more-car-card" aria-label={`View ${car.name} (${car.year})`}>
              <CarImage image={car.image} showCaption={false} />
              <div className="more-car-copy">
                <span className="eyebrow">{car.year} / {car.country}</span>
                <h3>{car.name}</h3>
                <span className="explore-label">Discover the car <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
