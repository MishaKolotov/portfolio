import { EMAIL, contacts, site } from '../content';

const profileUrl = (label: string): string => {
  const link = contacts.find((c) => c.label === label);
  if (!link) throw new Error(`content.ts has no contact "${label}"`);
  return link.href;
};

export function personJsonLd(url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: site.name,
      alternateName: ['Misha Kolotov', 'Mikhail Kolotov'],
      jobTitle: 'Senior Full-Stack AI Engineer',
      url,
      image: `${url}/photo.webp`,
      email: EMAIL,
      address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
      knowsLanguage: ['en', 'ru', 'pl'],
      alumniOf: { '@type': 'EducationalOrganization', name: 'BSUIR' },
      knowsAbout: ['TypeScript', 'React', 'Angular', 'Node.js', 'Next.js', 'LLM evaluation'],
      sameAs: [profileUrl('LinkedIn'), profileUrl('GitHub'), profileUrl('Telegram')],
    },
  };
}
