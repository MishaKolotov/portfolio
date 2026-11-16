import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const MOCK = pathToFileURL(path.resolve(__dirname, '../../docs/mock/index.html')).href;
const OUT = path.resolve(__dirname, '../../test-results/parity');

test('first screen parity with the mock', async ({ page, browser }, info) => {
  const vp = page.viewportSize()!;
  fs.mkdirSync(OUT, { recursive: true });
  const tag = `${info.project.name}-${vp.width}x${vp.height}`;
  await page.goto('/');
  await page.screenshot({ path: path.join(OUT, `site-${tag}.png`) });
  const siteH = await page.locator('main').evaluate((e) => e.getBoundingClientRect().height);

  const ctx = await browser.newContext({ viewport: vp });
  const mp = await ctx.newPage();
  await mp.goto(MOCK);
  await mp.screenshot({ path: path.join(OUT, `mock-${tag}.png`) });
  const mockH = await mp.locator('main').evaluate((e) => e.getBoundingClientRect().height);
  await ctx.close();

  expect(Math.abs(siteH - mockH) / mockH).toBeLessThanOrEqual(0.03);
});
