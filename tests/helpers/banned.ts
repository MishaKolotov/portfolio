import { createHash } from 'node:crypto';

// SHA-256 of lower-cased forbidden terms (single words and 2-3 word phrases). Only hashes live in the repo.
export const BANNED_HASHES: ReadonlySet<string> = new Set([
  '0b79cf2de0ee6b8ee227d9ebfe69b91aa92b1d2509641c4b743518447dbc4c68',
  '44f3c8ab3bb645ae5c9471328dd7e1bacbd33dcca2e5865249dd005267ec4047',
  '99497c84358f2273772f341abe1afbd7005a475ebed857a9aecc02b7353263d8',
  '10182ab855ff772753c05b2fea333666b5f312835d32936b6b03e08ef2cbd6d3',
  '2c224b9eec51ac6ad8279deb6046de78de690f5ac209555961081fe9387ec590',
  'ba94f3933307554e5edb84cc6ed8cfc3eaa444ca747039904460dc7fc51cc56b',
  'b52115ea553c55b7f70ceb81a97870163e02cb159d7d4717abb82d4e606e2465',
  '67fcb8e061b93fac31f1bb8ed23c06b04d64ed7aed81439a938b67bc5a6735df',
  '3b458896e52405d1dee4189fe872bec590ad7665a7f3613e5b4f6e38a7c2ced9',
]);

export const hashTerm = (t: string): string => createHash('sha256').update(t.toLowerCase()).digest('hex');

/** Lower-cased words plus all 2- and 3-word n-grams, joined by one space. */
export function tokenGrams(text: string): string[] {
  const w = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const out: string[] = [...w];
  for (let n = 2; n <= 3; n++) for (let i = 0; i + n <= w.length; i++) out.push(w.slice(i, i + n).join(' '));
  return out;
}

export function findBanned(text: string, hashes: ReadonlySet<string> = BANNED_HASHES): boolean {
  return tokenGrams(text).some((g) => hashes.has(hashTerm(g)));
}
