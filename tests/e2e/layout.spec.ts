import { test, expect } from '@playwright/test';

test.describe('layout', () => {
  for (const w of [320, 390, 800, 1000, 1440]) {
    test(`no horizontal overflow at ${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto('/');
      const [sw, cw] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(sw).toBeLessThanOrEqual(cw);
    });
  }

  test('at 800 no .fact .v is narrower than 200px', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto('/');
    const widths = await page.$$eval('.fact .v', (els) => els.map((e) => e.getBoundingClientRect().width));
    expect(widths.length).toBeGreaterThan(0);
    for (const x of widths) expect(x).toBeGreaterThanOrEqual(200);
  });

  test('nav does not overflow at 200% zoom on 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.evaluate(() => {
      (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom = '2';
    });
    const r = await page.evaluate(() => {
      const nav = document.querySelector('nav') as HTMLElement;
      const z = 2;
      const box = nav.getBoundingClientRect();
      const kids = [...nav.querySelectorAll('*')].map((e) => e.getBoundingClientRect());
      return {
        navRight: box.right,
        navScrollOver: nav.scrollWidth - nav.clientWidth,
        viewport: document.documentElement.clientWidth,
        maxChildRight: Math.max(...kids.map((k) => k.right)),
        docOver: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        z,
      };
    });
    expect(r.docOver).toBeLessThanOrEqual(0);
    expect(r.navScrollOver).toBeLessThanOrEqual(0);
    expect(r.navRight).toBeLessThanOrEqual(r.viewport + 1);
    expect(r.maxChildRight).toBeLessThanOrEqual(r.viewport + 1);
  });

  test('targets are at least 24x24 or spaced by 24px (WCAG 2.5.8, inline exception)', async ({ page }) => {
    await page.goto('/');
    const bad = await page.evaluate(() => {
      const els = [...document.querySelectorAll<HTMLElement>('a, button, summary')].filter((e) => {
        const r = e.getBoundingClientRect();
        const s = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden';
      });
      // Inline exception: a link inside a sentence of running text.
      const isInline = (e: HTMLElement) => {
        if (e.tagName !== 'A') return false;
        if (getComputedStyle(e).display !== 'inline') return false;
        const p = e.parentElement;
        if (!p) return false;
        let own = '';
        p.childNodes.forEach((n) => {
          if (n !== e && n.nodeType === 3) own += n.textContent;
        });
        return own.replace(/\s+/g, ' ').trim().length >= 10;
      };
      const rects = els.map((e) => e.getBoundingClientRect());
      const out: string[] = [];
      els.forEach((e, i) => {
        const r = rects[i];
        if (r.width >= 24 && r.height >= 24) return;
        if (isInline(e)) return;
        // 24px circle centred on the target must not intersect another target's box.
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const clash = els.some((o, j) => {
          if (j === i || o.contains(e) || e.contains(o)) return false;
          const q = rects[j];
          const dx = Math.max(q.left - cx, 0, cx - q.right);
          const dy = Math.max(q.top - cy, 0, cy - q.bottom);
          if (Math.hypot(dx, dy) < 12) return true;
          // Two undersized targets: their 24px circles must not overlap (centre to centre >= 24).
          if (q.width < 24 || q.height < 24) {
            const ox = q.left + q.width / 2;
            const oy = q.top + q.height / 2;
            if (Math.hypot(ox - cx, oy - cy) < 24 && !isInline(o)) return true;
          }
          return false;
        });
        if (clash) out.push(`${e.tagName}.${e.className} "${(e.textContent || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      return out;
    });
    expect(bad).toEqual([]);
  });
});
