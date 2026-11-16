import { describe, it, expect } from 'vitest';
import { hasPhoneShape } from './helpers/phone';

describe('hasPhoneShape', () => {
  it('flags phone-shaped runs', () => {
    expect(hasPhoneShape('call +00 123 456 789 now')).toBe(true);
    expect(hasPhoneShape('tel: 123-456-789')).toBe(true);
    expect(hasPhoneShape('00123456789')).toBe(true);
  });
  it('ignores years and date ranges', () => {
    expect(hasPhoneShape('Aug 2026 – Oct 2026, 2021-2026, 2015 2016 2017')).toBe(false);
  });
  it('flags tel: links', () => {
    expect(hasPhoneShape('see tel:abc')).toBe(true);
  });
});
