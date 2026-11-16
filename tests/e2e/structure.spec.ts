import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MOCK = pathToFileURL(path.resolve(__dirname, '../../docs/mock/index.html')).href;
const CAL = 'https://calendar.app.google/jp7854e7MJPsHjSCA';
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

async function text(page: Page, sel: string) {
  return norm(await page.locator(sel).first().evaluate((el) => (el as HTMLElement).innerText));
}

function firstDiff(a: string, b: string) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return `at ${i}\nsite: …${a.slice(Math.max(0, i - 60), i + 80)}\nmock: …${b.slice(Math.max(0, i - 60), i + 80)}`;
}

test.describe('structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('one h1 and heading levels never skip', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page.$$eval('h1,h2,h3', (els) => els.map((e) => Number(e.tagName[1])));
    let prev = 0;
    for (const l of levels) {
      expect(l).toBeLessThanOrEqual(prev + 1);
      prev = l;
    }
  });

  test('landmarks and skip link', async ({ page }) => {
    await expect(page.locator('main#main')).toHaveCount(1);
    await expect(page.locator('nav')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('main footer')).toHaveCount(0);
    await expect(page.locator('a.skip')).toHaveAttribute('href', '#main');
  });

  test('in-page anchors resolve; no bare #', async ({ page }) => {
    const hrefs = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href') as string));
    for (const h of hrefs) {
      expect(h, 'bare #').not.toBe('#');
      expect(h, 'placeholder').not.toBe('#cv');
      expect(await page.locator(`[id="${h.slice(1)}"]`).count(), h).toBe(1);
    }
  });

  test('Book a call links', async ({ page }) => {
    const links = page.locator('a:has-text("Book a")');
    await expect(links).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const a = links.nth(i);
      await expect(a).toHaveAttribute('href', CAL);
      await expect(a).toHaveAttribute('target', '_blank');
      expect(await a.getAttribute('rel')).toContain('noopener');
    }
  });

  test('external links announce a new tab', async ({ page }) => {
    const texts = await page.$$eval('a[target=_blank]', (as) => as.map((a) => a.textContent ?? ''));
    expect(texts.length).toBeGreaterThan(10);
    for (const t of texts) expect(t).toContain('(opens in new tab)');
  });

  test('details match the mock and are closed on load', async ({ page, browser }) => {
    const mock = await browser.newPage();
    await mock.goto(MOCK);
    const n = await mock.locator('details').count();
    await mock.close();
    await expect(page.locator('details')).toHaveCount(n);
    expect(await page.$$eval('details', (d) => d.filter((x) => (x as HTMLDetailsElement).open).length)).toBe(0);
  });

  test('text parity with the mock: main, nav, footer', async ({ page, browser }) => {
    const mock = await browser.newPage({ viewport: page.viewportSize() ?? undefined });
    await mock.goto(MOCK);
    for (const sel of ['main', 'nav', 'footer']) {
      const a = await text(page, sel);
      const b = await text(mock, sel);
      expect(b.length, `${sel} mock text empty`).toBeGreaterThan(20);
      expect(a === b ? 'same' : `${sel} differs ${firstDiff(a, b)}`).toBe('same');
    }
    await mock.close();
  });

  test('full-text parity with every details opened (main)', async ({ page, browser }) => {
    const mock = await browser.newPage({ viewport: page.viewportSize() ?? undefined });
    await mock.goto(MOCK);
    const full = async (p: Page) =>
      norm(await p.locator('main').evaluate((el) => {
        el.querySelectorAll('details').forEach((d) => ((d as HTMLDetailsElement).open = true));
        return (el as HTMLElement).innerText;
      }));
    const raw = async (p: Page) =>
      (await p.locator('main').evaluate((el) => el.textContent ?? '')).replace(/\s+/g, '');
    const a = await full(page);
    const b = await full(mock);
    expect(b.length).toBeGreaterThan(5000);
    expect(a === b ? 'same' : `differs ${firstDiff(a, b)}`).toBe('same');
    // textContent with all whitespace stripped also covers visually hidden (.vh) text
    const ra = await raw(page);
    const rb = await raw(mock);
    expect(ra === rb ? 'same' : `raw differs ${firstDiff(ra, rb)}`).toBe('same');
    await mock.close();
  });

  test('/#earlier opens that details', async ({ page }) => {
    await page.goto('/#earlier');
    await expect(page.locator('details#earlier')).toHaveJSProperty('open', true);
  });
});

test('works without JavaScript', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h2')).toHaveCount(6);
  await page.locator('summary').first().click();
  await expect(page.locator('details').first()).toHaveJSProperty('open', true);
  await ctx.close();
});
