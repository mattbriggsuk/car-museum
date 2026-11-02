'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EraSummary } from '@/lib/catalogue';
import { CarImage } from './car-image';

const filters = ['All decades', '20th century', '21st century'] as const;

export function DecadeBrowser({ decades }: { decades: EraSummary[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All decades');
  const visible = decades.filter(({ year }) => filter === 'All decades' || (filter === '20th century' ? year < 2000 : year >= 2000));

  return (
    <section id="decades" className="decades-section wrap" aria-labelledby="decades-title">
      <div className="section-top"><div><span className="eyebrow">THE COLLECTION</span><h2 id="decades-title">Every decade has a story.</h2></div><p>Follow the evolution of the automobile,<br className="desktop-break" /> one extraordinary era at a time.</p></div>
      <div className="collection-toolbar"><div className="filters" role="group" aria-label="Filter decades">{filters.map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="result-count" aria-live="polite">{String(visible.length).padStart(2, '0')} DECADES TO EXPLORE</span></div>
      <div className="decade-grid">{visible.map((decade) => <Link key={decade.year} href={`/museum/${decade.year}`} className="decade-card"><div className="decade-card-top"><span>{decade.year}—{decade.year + 9}</span><span className="card-arrow" aria-hidden="true">↗</span></div><CarImage image={decade.image} className="decade-image" showCaption={false} /><span className="featured-car-name">{decade.defaultCarName}</span><div className="decade-year">{decade.year}<span>s</span></div><h3>{decade.title}</h3><p>{decade.description}</p><span className="explore-label">Explore the decade <span aria-hidden="true">→</span></span></Link>)}</div>
    </section>
  );
}
