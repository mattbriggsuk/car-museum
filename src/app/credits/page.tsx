import Link from 'next/link';
import photos from '@/data/photo-credits.json';
import { decades } from '@/lib/collection';

export const metadata = { title: 'Photo credits' };

export default function PhotoCreditsPage() {
  return (
    <main id="main" className="detail-page wrap">
      <span className="eyebrow">WITH THANKS TO THE PHOTOGRAPHERS</span>
      <h1>Photo credits<span className="period">.</span></h1>
      <p className="detail-intro">Real cars, generously shared. Each photograph retains its original licence; source pages contain the full rights information.</p>
      <section className="photo-credit-era" aria-label="Home page artwork">
        <h2>Home page artwork</h2>
        <p>The museum and driving café scene is AI-generated artwork of a fictional 1950s venue, created for Digital Car Museum. It is not a photograph of a real museum or an exhibit.</p>
      </section>
      <section className="photo-credit-era" aria-label="Collection page artwork">
        <h2>Collection page artwork</h2>
        <p>The 1950s-style convertible on a winding country road is AI-generated artwork created for Digital Car Museum. It depicts a fictional car rather than a particular museum exhibit.</p>
      </section>
      {decades.filter((era) => photos.some((photo) => photo.path.startsWith(`/images/cars/${era.year}/`))).map((era) => (
        <section key={era.year} className="photo-credit-era" aria-label={`${era.year}s photograph credits`}>
          <h2>{era.year}s collection</h2>
          {era.cars.map((car) => (
            <section key={car.slug} className="photo-credit-car">
              <h3><Link href={`/museum/${era.year}/${car.slug}`}>{car.name}</Link></h3>
              <ul>{photos.filter((photo) => photo.car === car.slug && car.images.includes(photo.path)).map((photo) => (
                <li key={photo.path}>
                  <a href={photo.source}>{photo.title}</a>
                  <p>{photo.author} · {photo.licenseUrl ? <a href={photo.licenseUrl}>{photo.license}</a> : photo.license}</p>
                  <p>{photo.changes}</p>
                  {photo.view && <p>View: {photo.view}{photo.note ? ` · ${photo.note}` : ''}</p>}
                  <code>{photo.path.split('/').at(-1)}</code>
                </li>
              ))}</ul>
            </section>
          ))}
        </section>
      ))}
    </main>
  );
}
