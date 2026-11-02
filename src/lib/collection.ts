// Server-side catalogue: only pass the summaries needed by interactive components.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import photoCredits from '@/data/photo-credits.json';
import era1950 from '@/data/eras/1950.json';
import era1960 from '@/data/eras/1960.json';
import era1970 from '@/data/eras/1970.json';
import era1980 from '@/data/eras/1980.json';
import era1990 from '@/data/eras/1990.json';
import era2000 from '@/data/eras/2000.json';
import era2010 from '@/data/eras/2010.json';
import era2020 from '@/data/eras/2020.json';
import { getDefaultCar, validateEra, type Car, type CarImage, type EraSummary } from './catalogue';

export const decades = [
  validateEra(era1950, 1950),
  validateEra(era1960, 1960),
  validateEra(era1970, 1970),
  validateEra(era1980, 1980),
  validateEra(era1990, 1990),
  validateEra(era2000, 2000),
  validateEra(era2010, 2010),
  validateEra(era2020, 2020),
];

export function getDecade(year: string) {
  return decades.find((decade) => String(decade.year) === year);
}

export function getCarImage(car: Car, index = 0): CarImage {
  const src = car.images[index];
  if (src && existsSync(join(process.cwd(), 'public', src))) {
    const photo = photoCredits.find((entry) => entry.path === src);
    const view = photo?.view;
    return {
      src,
      alt: `${car.name} — ${view ? `${view} view` : `photograph ${index + 1}`}`,
      placeholder: false,
      ...(photo ? { credit: `${photo.author} · ${photo.license}`, source: photo.source, licenseUrl: photo.licenseUrl } : {}),
      ...(view ? { view } : {}),
      ...(photo?.note ? { note: photo.note } : {}),
    };
  }
  return {
    src: '/images/fifties-roadster.svg',
    alt: `Illustration placeholder for ${car.name}; vehicle photograph coming soon`,
    placeholder: true,
  };
}

export function getEraSummaries(): EraSummary[] {
  return decades.map((era) => {
    const car = getDefaultCar(era);
    return {
      year: era.year,
      title: era.title,
      description: era.description,
      defaultCarName: car.name,
      image: getCarImage(car),
    };
  });
}
