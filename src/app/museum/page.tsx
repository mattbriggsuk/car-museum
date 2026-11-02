import { DecadeBrowser } from '@/components/decade-browser';
import { getEraSummaries } from '@/lib/collection';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'The collection' };
export default function MuseumPage() {
  return (
    <main id="main">
      <section className="page-heading museum-heading wrap" aria-labelledby="museum-title">
        <div>
          <span className="eyebrow">DIGITAL CAR MUSEUM / THE COLLECTION</span>
          <h1 id="museum-title">A century of<br /><em>possibility.</em></h1>
          <p>Start with a decade. Discover a car that defined it.</p>
        </div>
        <figure className="museum-road-image">
          <img src="/images/collection-road-hero.webp" alt="AI-generated scene of a red 1950s-style convertible driving along a winding road through sunlit countryside" width="1536" height="1024" fetchPriority="high" />
        </figure>
      </section>
      <DecadeBrowser decades={getEraSummaries()} />
    </main>
  );
}
