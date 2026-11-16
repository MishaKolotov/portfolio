import { test, expect } from '@playwright/test';

test('home responds and has the headline', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText("I build AI products. And I test the models behind them.");
});
