import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCarImage, getDecade } from '@/lib/collection';
import { CarImage } from '@/components/car-image';
import { formatCost } from '@/lib/valuation';

export const dynamic = 'force-dynamic';
export default async function DecadePage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const decade = getDecade(year);
  if (!decade) notFound();
  return (
    <main id="main" className="detail-page wrap">
      <Link className="text-link" href="/museum">← All decades</Link>
      <span className="eyebrow">THE {decade.year}s / THE COLLECTION</span>
      <h1>{decade.title}<span className="period">.</span></h1>
      <p className="detail-intro">{decade.description}</p>
      <ul className="era-cars">{decade.cars.map((car) => (
        <li key={car.slug}>
          <Link className="car-preview" href={`/museum/${decade.year}/${car.slug}`}>
            <CarImage image={getCarImage(car)} className="car-thumbnail" showCaption={false} />
            <div className="car-listing-copy">
              <span className="eyebrow">{car.year} / {car.country}{car.default ? ' / FEATURED' : ''}</span>
              <h2>{car.name}</h2>
              <span className="car-listing-engine">{car.engine}</span>
              {car.cost && <span className="car-listing-value">Est. value today: {formatCost(car.cost)}</span>}
              <p>{car.description}</p>
            </div>
            <span className="car-listing-arrow" aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}</ul>
    </main>
  );
}
