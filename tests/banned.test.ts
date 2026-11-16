import { describe, it, expect } from 'vitest';
import { findBanned, hashTerm, tokenGrams } from './helpers/banned';

// Test-only dummy term: its hash is passed in as a separate list, so the helper's machinery is proven live.
const DUMMY = ['zzdummyterm'];
const dummyHashes = new Set(DUMMY.map(hashTerm));

describe('banned helper', () => {
  it('flags a dummy term from a separate hash list', () => {
    expect(findBanned('some text with ZzDummyTerm inside', dummyHashes)).toBe(true);
  });
  it('does not flag clean text', () => {
    expect(findBanned('nothing to see here, just words', dummyHashes)).toBe(false);
  });
  it('matches two and three word phrases', () => {
    expect(findBanned('a dummy phrase here', new Set([hashTerm('dummy phrase')]))).toBe(true);
    expect(findBanned('a b c d', new Set([hashTerm('b c d')]))).toBe(true);
  });
  it('tokenises on punctuation and lower-cases', () => {
    expect(tokenGrams('Foo-Bar, baz!')).toContain('foo bar');
  });
});
