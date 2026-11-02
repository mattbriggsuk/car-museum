import type { Metadata } from 'next';
import Link from 'next/link';
import { MuseumMark } from '@/components/museum-mark';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Digital Car Museum — A journey through automotive history', template: '%s | Digital Car Museum' },
  description: 'Explore eight decades of automotive design, engineering, and the cars that defined their time.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header wrap">
          <Link href="/home" className="brand"><MuseumMark /><span>Digital Car Museum</span></Link>
          <nav aria-label="Main navigation">
            <Link href="/home">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9" /></svg>
              Home
            </Link>
            <Link href="/museum">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 13 2-7h14l2 7v6h-3v-3H6v3H3zM3 12h18M7 6l1-3h8l1 3M6 13v.01M18 13v.01" /></svg>
              The collection
            </Link>
            <Link href="/about">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v.01" /></svg>
              About
            </Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer wrap"><Link href="/home" className="footer-brand">Digital Car Museum</Link><p>Celebrating the art of the automobile. <Link href="/credits" className="photo-credits-link">Photo credits</Link></p><span>An independent demo project · 2026</span></footer>
      </body>
    </html>
  );
}
