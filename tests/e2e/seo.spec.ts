import { test, expect } from '@playwright/test';

test('head: title, description, canonical, og, twitter', async ({ page }) => {
  await page.goto('/');
  expect(await page.title()).toMatch(/^Mikhail Kolatau/);
  const desc = (await page.locator('meta[name=description]').getAttribute('content'))!;
  expect(desc.length).toBeLessThanOrEqual(160);
  expect(desc).toContain('frontend');
  await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
  const canonical = (await page.locator('link[rel=canonical]').getAttribute('href'))!;
  const ogImage = (await page.locator('meta[property="og:image"]').getAttribute('content'))!;
  const ogUrl = (await page.locator('meta[property="og:url"]').getAttribute('content'))!;
  const origins = [canonical, ogImage, ogUrl].map((u) => {
    const p = new URL(u);
    expect(['http:', 'https:']).toContain(p.protocol);
    return p.origin;
  });
  expect(new Set(origins).size).toBe(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'profile');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
});

test('JSON-LD parses as ProfilePage', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const ld = JSON.parse(raw!);
  expect(ld['@type']).toBe('ProfilePage');
  expect(ld.mainEntity['@type']).toBe('Person');
});

for (const path of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/opengraph-image', '/icon.svg', '/apple-icon.png']) {
  test(`${path} returns 200`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
  });
}

test('robots allows all and lists the sitemap', async ({ request }) => {
  const t = await (await request.get('/robots.txt')).text();
  expect(t).toMatch(/Allow: \//);
  expect(t).not.toMatch(/Disallow/i);
  expect(t).toMatch(/Sitemap: https?:\/\/\S+\/sitemap\.xml/);
});

test('unknown path is 404 with a link to /', async ({ page }) => {
  const res = await page.goto('/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('a[href="/"]').first()).toBeVisible();
});
