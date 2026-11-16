// Writes public/llms.txt from src/content.ts. Run: npm run build:llms. The output is committed;
// tests/seo.test.ts fails when the file drifts from content.
import { register } from 'node:module';
import { writeFileSync } from 'node:fs';

// The app sources import siblings without extensions (bundler resolution); teach plain Node to find the .ts files.
register(
  'data:text/javascript,' +
    encodeURIComponent(`export async function resolve(s, c, next) {
      try { return await next(s, c); } catch (e) {
        if (s.startsWith('.') && !/\\.\\w+$/.test(s)) return next(s + '.ts', c);
        throw e;
      }
    }`),
);

const { buildLlmsTxt } = await import('../src/lib/llms.ts');
writeFileSync(new URL('../public/llms.txt', import.meta.url), buildLlmsTxt());
console.log('public/llms.txt written');
