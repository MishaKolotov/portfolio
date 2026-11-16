import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Caveat, Manrope } from 'next/font/google';
import { labels, site } from '../content';
import { personJsonLd } from '../lib/jsonld';
import { siteUrl } from '../lib/site-url';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-manrope',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: '500',
  preload: false,
  display: 'swap',
  variable: '--font-caveat',
});

const url = siteUrl(process.env);

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${caveat.variable}`}>
      <body>
        <a className="skip" href="#main">
          {labels.skip}
        </a>
        <div className="sky" aria-hidden="true"></div>
        <div className="sun" aria-hidden="true"></div>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(url)).replace(/</g, '\\u003c') }} />
        <Analytics />
      </body>
    </html>
  );
}
