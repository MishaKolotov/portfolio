import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Structure test (honest scope): checks the layout source wires the third-party component,
// and that package.json pins it exactly. Runtime behaviour of the analytics script is not tested here.
const layout = readFileSync(new URL('../src/app/layout.tsx', import.meta.url), 'utf8');
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

describe('analytics', () => {
  it('layout renders <Analytics /> from @vercel/analytics/next as the last child of body', () => {
    expect(layout).toContain("from '@vercel/analytics/next'");
    expect(layout).toMatch(/<Analytics \/>\s*<\/body>/);
  });
  it('@vercel/analytics is pinned exactly', () => {
    expect(pkg.dependencies['@vercel/analytics']).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
