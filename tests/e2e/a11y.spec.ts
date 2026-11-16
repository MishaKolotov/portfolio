import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test('axe: no wcag2a, wcag2aa, wcag22aa violations', async ({ page }) => {
    await page.goto('/');
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    expect(res.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
  });

  test('reduced transparency makes every .card opaque', async ({ page }) => {
    await page.goto('/');
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }],
    });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-transparency: reduce)').matches)).toBe(true);
    const cards = await page.$$eval('.card', (els) =>
      els.map((e) => {
        const s = getComputedStyle(e);
        return { bg: s.backgroundColor, bf: s.backdropFilter };
      }),
    );
    expect(cards.length).toBeGreaterThan(0);
    for (const c of cards) {
      const m = c.bg.match(/rgba?\(([^)]+)\)/)!;
      const parts = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      const alpha = parts.length > 3 ? parts[3] : 1;
      expect(alpha).toBe(1);
      expect(c.bf === 'none' || c.bf === '').toBe(true);
    }
  });

  test('keyboard: skip link first, Book a call within 8 stops', async ({ page }) => {
    await page.goto('/');
    const stops: string[] = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      stops.push(
        await page.evaluate(() => {
          const a = document.activeElement as HTMLElement;
          return `${a.className}|${(a.textContent || '').trim()}`;
        }),
      );
    }
    expect(stops[0]).toContain('skip');
    expect(stops.slice(0, 8).some((s) => /book a call/i.test(s))).toBe(true);
  });
});
