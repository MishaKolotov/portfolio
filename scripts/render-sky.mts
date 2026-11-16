// Pre-renders the sky (gradient and SVG noise clouds; the sun stays a live .sun div) from the approved mock into WebP files.
// Run: npm run render:sky. The outputs are committed; this is not part of `npm run build`.
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const root = resolve(import.meta.dirname, '..');
const mock = pathToFileURL(join(root, 'docs/mock/index.html')).href;
const QUALITY = 0.8;
const MAX_BYTES = 250 * 1024;

const targets = [
  { file: 'public/sky.webp', width: 2400, height: 1500 },
  { file: 'public/sky-mobile.webp', width: 1170, height: 2532 },
];

const browser = await chromium.launch({ channel: 'chrome' });
try {
  mkdirSync(join(root, 'public'), { recursive: true });
  for (const t of targets) {
    const page = await browser.newPage({ viewport: { width: t.width, height: t.height }, deviceScaleFactor: 1 });
    await page.goto(mock);
    await page.addStyleTag({
      content: 'body > *:not(.sky){display:none!important} html,body{background:transparent!important}',
    });
    const png = await page.screenshot({ type: 'png' });
    await page.close();

    // Playwright cannot write WebP: convert the PNG with Chrome's own canvas encoder.
    const conv = await browser.newPage();
    const b64 = await conv.evaluate(
      async ({ data, q }) => {
        const img = new Image();
        img.src = `data:image/png;base64,${data}`;
        await img.decode();
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        c.getContext('2d')!.drawImage(img, 0, 0);
        const blob: Blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/webp', q));
        const buf = new Uint8Array(await blob.arrayBuffer());
        let s = '';
        for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
        return btoa(s);
      },
      { data: png.toString('base64'), q: QUALITY },
    );
    await conv.close();
    const out = join(root, t.file);
    writeFileSync(out, Buffer.from(b64, 'base64'));
    const size = statSync(out).size;
    console.log(`${t.file} ${t.width}x${t.height} ${(size / 1024).toFixed(1)} KB`);
    if (size > MAX_BYTES) throw new Error(`${t.file} is ${size} bytes, over ${MAX_BYTES}`);
  }
} finally {
  await browser.close();
}
