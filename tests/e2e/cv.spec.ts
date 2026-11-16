import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { hasPhoneShape } from '../helpers/phone';

const CV = '/Mikhail_Kolatau_CV.pdf';

function findPdftotext(): string | null {
  for (const dir of (process.env.PATH ?? '').split(path.delimiter)) {
    const f = path.join(dir, 'pdftotext');
    if (dir && existsSync(f)) return f;
  }
  return null;
}
const PDFTOTEXT = findPdftotext();

test.describe('CV download', () => {
  test('both CV links point to the PDF', async ({ page }) => {
    await page.goto('/');
    const links = page.getByRole('link', { name: 'Download CV (PDF)' });
    await expect(links).toHaveCount(2);
    for (const a of await links.all()) await expect(a).toHaveAttribute('href', CV);
  });

  test('PDF is served and has no phone number', async ({ request }) => {
    test.skip(!PDFTOTEXT, 'pdftotext (poppler) not found on PATH; install poppler to run this check');
    const res = await request.get(CV);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
    const dir = mkdtempSync(path.join(tmpdir(), 'cv-'));
    const file = path.join(dir, 'cv.pdf');
    writeFileSync(file, await res.body());
    const text = execFileSync(PDFTOTEXT!, [file, '-'], { encoding: 'utf8' });
    expect(text).toContain('Kolatau');
    expect(hasPhoneShape(text)).toBe(false);
  });
});
