import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCarImage, getDecade } from '@/lib/collection';
import { CarGallery } from '@/components/car-gallery';
import { MoreCarsCarousel } from '@/components/more-cars-carousel';
import { CarValuation } from '@/components/car-valuation';

export const dynamic = 'force-dynamic';
export default async function CarPage({ params }: { params: Promise<{ year: string; car: string }> }) {
  const { year, car: slug } = await params;
  const decade = getDecade(year);
  const car = decade?.cars.find((entry) => entry.slug === slug);
  if (!decade || !car) notFound();
  return (
    <main id="main" className="detail-page wrap">
      <Link className="text-link" href={`/museum/${year}`}>← Back to the {year}s</Link>
      <span className="eyebrow">THE COLLECTION / {car.year}</span>
      <h1>{car.name}<span className="period">.</span></h1>
      <p className="detail-intro">{car.description}</p>
      <dl className="car-facts">
        <div><dt>Year</dt><dd>{car.year}</dd></div>
        <div><dt>Engine</dt><dd>{car.engine}</dd></div>
        <div><dt>Country</dt><dd>{car.country}</dd></div>
        <div><dt>Collection</dt><dd>{year}s</dd></div>
      </dl>
      <CarGallery key={`gallery-${car.slug}`} name={car.name} images={car.images.map((_, index) => getCarImage(car, index))} />
      <CarValuation cost={car.cost} />
      <MoreCarsCarousel
        key={car.slug}
        year={decade.year}
        cars={decade.cars.filter((entry) => entry.slug !== car.slug).map((entry) => ({
          slug: entry.slug,
          name: entry.name,
          year: entry.year,
          country: entry.country,
          image: getCarImage(entry),
        }))}
      />
    </main>
  );
}
