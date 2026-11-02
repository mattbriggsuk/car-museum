import Link from 'next/link';
import { DecadeBrowser } from './decade-browser';
import { getEraSummaries } from '@/lib/collection';

export function HomePage() {
  return (
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><span className="eyebrow"><span className="small-rule" /> A FINE COLLECTION. A GRAND DAY OUT.</span><h1 id="hero-title">Some things<br />never go<br /><em>out of style.</em></h1><p>A journey through the cars that moved us.<br />Explore the icons, the innovators, and the stories<br className="desktop-break" /> that shaped eight decades of motoring.</p><Link href="#decades" className="button">Explore the collection <span aria-hidden="true">↗</span></Link><div className="hero-footnote"><span>1950 — 2029</span><span>Eight decades. Endless inspiration.</span></div></div>
        <div className="hero-visual"><img src="/images/museum-cafe-hero.webp" alt="AI-generated scene of a 1950s-style car museum and driving café, with cream and turquoise architecture and classic cars parked outside" width="1122" height="1402" fetchPriority="high" /><div className="image-shade" /><div className="image-caption"><span>THE GOLDEN AGE OF<br /><strong>a good drive.</strong></span></div></div>
      </section>
      <div className="intro-strip wrap"><span>BUILT TO MOVE YOU.</span><p>More than machines. <span>Milestones in design, culture, and imagination.</span></p><span aria-hidden="true">↓</span></div>
      <DecadeBrowser decades={getEraSummaries()} />
      <section className="about-strip wrap"><span className="eyebrow">A PASSION, PRESERVED.</span><h2>Great cars deserve<br />to have their stories told.</h2><div><p>This is a place for the details that make us look twice. The lines, the ideas, and the people behind the machines.</p><Link className="text-link" href="/about">About the museum <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
