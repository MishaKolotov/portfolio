// Builds public/Mikhail_Kolatau_CV.pdf from the CV source HTML in a private local repo (read only):
// removes the phone number element and its separator, then prints via headless Chrome.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envFile = path.join(root, '.env.local');
if (existsSync(envFile)) process.loadEnvFile(envFile);

const srcDirEnv = process.env.CV_SOURCE_DIR;
if (!srcDirEnv || !existsSync(srcDirEnv)) {
  console.error('CV_SOURCE_DIR must point to the directory holding the source CV HTML (set it in .env.local). Not set or missing.');
  process.exit(1);
}
const srcDir = srcDirEnv.endsWith('/') ? srcDirEnv : `${srcDirEnv}/`;
const srcHtml = path.join(srcDir, 'Mikhail_Kolatau_CV_AI_Engineer.html');
const out = path.join(root, 'public', 'Mikhail_Kolatau_CV.pdf');
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let html = readFileSync(srcHtml, 'utf8');

// Phone-shaped text: optional +, then 9+ digits with spaces, dots, dashes or parentheses between them.
const PHONE = String.raw`\+?\d(?:[\s().-]?\d){8,}`;
// The phone element (span or tel: link) plus the separator that follows it, located by shape, not by value.
const phoneEl = new RegExp(`<(span|a)\\b[^>]*>\\s*${PHONE}\\s*</\\1>\\s*(?:·|&middot;|&#183;)\\s*`, 'i');
if (!phoneEl.test(html)) throw new Error('phone element not found in source CV');
html = html.replace(phoneEl, '');

// Fail loudly if anything phone-shaped is left in the contact block (from the first mailto: to the next line break).
const at = html.indexOf('mailto:');
const block = html.slice(at, html.indexOf('<br', at)).replace(/<[^>]*>/g, ' ');
if (new RegExp(PHONE).test(block) || /tel:/i.test(html)) throw new Error('phone-shaped text still present in contact block after strip');

// Resolve relative assets (fonts/) against the source directory.
html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${pathToFileURL(srcDir).href}">`);

const dir = mkdtempSync(path.join(tmpdir(), 'cv-build-'));
const tmp = path.join(dir, 'cv.html');
writeFileSync(tmp, html);
try {
  execFileSync(
    chrome,
    ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, pathToFileURL(tmp).href],
    { stdio: 'inherit' },
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log('wrote', out);
