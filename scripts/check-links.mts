// Requests every external href from src/content.ts. Network; not part of `npm run check`.
// Run: npm run check:links. Exit 1 when a link is dead (404/410/DNS/repeated connection error).
import { register } from 'node:module';

register(
  'data:text/javascript,' +
    encodeURIComponent(`export async function resolve(s, c, next) {
      try { return await next(s, c); } catch (e) {
        if (s.startsWith('.') && !/\\.\\w+$/.test(s)) return next(s + '.ts', c);
        throw e;
      }
    }`),
);

const content = (await import('../src/content.ts')) as Record<string, unknown>;

function collect(value: unknown, out: Set<string>): void {
  if (Array.isArray(value)) return value.forEach((v) => collect(v, out));
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (k === 'href' && typeof v === 'string' && /^https?:\/\//.test(v)) out.add(v);
      else collect(v, out);
    }
  }
}

const urls = new Set<string>();
collect(content, urls);
// Top-level string exports (for example CAL_URL) are used by components directly, not under an href key.
for (const v of Object.values(content)) if (typeof v === 'string' && /^https?:\/\//.test(v)) urls.add(v);

const UA = 'Mozilla/5.0 (compatible; link-check)';
const DEAD = new Set([404, 410]);

async function attempt(url: string, method: 'HEAD' | 'GET'): Promise<number | string> {
  try {
    const res = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(15000) });
    return res.status;
  } catch (e) {
    return `error:${(e as Error & { cause?: { code?: string } }).cause?.code ?? (e as Error).name}`;
  }
}

async function check(url: string): Promise<{ url: string; result: string; verdict: 'ok' | 'blocked' | 'dead' }> {
  let r = await attempt(url, 'HEAD');
  if (typeof r !== 'number' || r >= 400) r = await attempt(url, 'GET');
  if (typeof r === 'string') {
    const again = await attempt(url, 'GET'); // a connection error counts only when it repeats
    r = again;
  }
  if (typeof r === 'string') return { url, result: r, verdict: r === 'error:TimeoutError' ? 'blocked' : 'dead' };
  if (r < 400) return { url, result: String(r), verdict: 'ok' };
  if (DEAD.has(r)) return { url, result: String(r), verdict: 'dead' };
  return { url, result: String(r), verdict: 'blocked' }; // 401/403/405/429/999 and 5xx: needs a human look, not auto-removal
}

const results = [];
for (const u of [...urls].sort()) {
  const r = await check(u);
  results.push(r);
  console.log(`${r.verdict.padEnd(7)} ${r.result.padEnd(16)} ${r.url}`);
}
const dead = results.filter((r) => r.verdict === 'dead');
const blocked = results.filter((r) => r.verdict === 'blocked');
console.log(`\n${results.length} links: ${results.length - dead.length - blocked.length} ok, ${blocked.length} blocked (needs a human look), ${dead.length} dead`);
process.exit(dead.length ? 1 : 0);
