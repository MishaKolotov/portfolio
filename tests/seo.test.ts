import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { siteUrl } from '../src/lib/site-url';
import { personJsonLd } from '../src/lib/jsonld';
import { buildLlmsTxt } from '../src/lib/llms';
import { site, EMAIL } from '../src/content';
import { findBanned } from './helpers/banned';

const env = (o: Record<string, string>) => o as unknown as NodeJS.ProcessEnv;

describe('siteUrl', () => {
  it('prefers NEXT_PUBLIC_SITE_URL and strips one trailing slash', () => {
    expect(siteUrl(env({ NEXT_PUBLIC_SITE_URL: 'https://x.dev/' }))).toBe('https://x.dev');
  });
  it('falls back to VERCEL_PROJECT_PRODUCTION_URL with https', () => {
    expect(siteUrl(env({ VERCEL_PROJECT_PRODUCTION_URL: 'p.vercel.app' }))).toBe('https://p.vercel.app');
  });
  it('NEXT_PUBLIC_SITE_URL wins over the Vercel variable', () => {
    expect(
      siteUrl(env({ NEXT_PUBLIC_SITE_URL: 'https://a.dev', VERCEL_PROJECT_PRODUCTION_URL: 'p.vercel.app' })),
    ).toBe('https://a.dev');
  });
  it('uses localhost only outside production', () => {
    expect(siteUrl(env({}))).toBe('http://localhost:3100');
    expect(siteUrl(env({ VERCEL_ENV: 'preview' }))).toBe('http://localhost:3100');
  });
  it('throws in production with no URL, naming both variables', () => {
    expect(() => siteUrl(env({ VERCEL_ENV: 'production' }))).toThrow(
      /NEXT_PUBLIC_SITE_URL.*VERCEL_PROJECT_PRODUCTION_URL|VERCEL_PROJECT_PRODUCTION_URL.*NEXT_PUBLIC_SITE_URL/,
    );
  });
});

describe('personJsonLd', () => {
  const ld = personJsonLd('https://x.dev') as any;
  it('is a ProfilePage with a Person', () => {
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('ProfilePage');
    expect(ld.mainEntity['@type']).toBe('Person');
    expect(ld.mainEntity.name).toBe(site.name);
    expect(ld.mainEntity.email).toBe(EMAIL);
    expect(ld.mainEntity.url).toBe('https://x.dev');
    expect(ld.mainEntity.image).toBe('https://x.dev/photo.webp');
    expect(ld.mainEntity.alternateName).toEqual(['Misha Kolotov', 'Mikhail Kolotov']);
    expect(ld.mainEntity.address).toMatchObject({ addressLocality: 'Warsaw', addressCountry: 'PL' });
    expect(ld.mainEntity.alumniOf).toMatchObject({ '@type': 'EducationalOrganization', name: 'BSUIR' });
  });
  it('sameAs has three https URLs', () => {
    const s = ld.mainEntity.sameAs as string[];
    expect(s).toHaveLength(3);
    for (const u of s) expect(u).toMatch(/^https:\/\//);
    expect(s.join(' ')).toMatch(/linkedin\.com.*github\.com.*t\.me/);
  });
  it('has no forbidden words', () => {
    expect(findBanned(JSON.stringify(ld))).toBe(false);
  });
});

describe('llms.txt', () => {
  it('matches the committed public/llms.txt', () => {
    expect(readFileSync('public/llms.txt', 'utf8')).toBe(buildLlmsTxt());
  });
  it('has no forbidden words and carries "More" text', () => {
    const t = buildLlmsTxt();
    expect(findBanned(t)).toBe(false);
    expect(t).toContain('five Claude Code skills');
    expect(t).toContain(site.headline[0]);
  });
});
