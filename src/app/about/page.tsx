import Link from 'next/link';
export const metadata = { title: 'About' };
export default function AboutPage() {
  return <main id="main" className="detail-page wrap"><span className="eyebrow">ABOUT THE MUSEUM</span><h1>For the love<br />of <em>the automobile.</em></h1><p className="detail-intro">Digital Car Museum is a digital celebration of automotive design, from the sculpted shapes of the 1950s to the electric ambitions of today.</p><p className="about-body">This demo collection brings together eight decades of motoring. Choose an era, meet a defining car, and discover how each generation imagined the road ahead.</p><Link className="button" href="/home#decades">Explore the decades <span aria-hidden="true">↗</span></Link></main>;
}
