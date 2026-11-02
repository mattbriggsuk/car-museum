import Link from 'next/link';
export default function NotFound() { return <main id="main" className="detail-page wrap"><span className="eyebrow">404 / OFF THE MAP</span><h1>A wrong turn.</h1><p className="detail-intro">We couldn’t find that exhibit. Head back to the collection to explore another era.</p><Link href="/museum" className="button">Back to the collection ↗</Link></main>; }
