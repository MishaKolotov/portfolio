# portfolio

Personal site of Mikhail Kolatau. Static Next.js 16 + React 19, no UI library, one client component written in this repo (the hash-opener); the only other is the third-party Vercel Analytics component from `@vercel/analytics`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | local dev server |
| `npm run build` / `npm start` | production build / serve it |
| `npm test` | vitest, offline unit and structure tests |
| `npm run e2e` | Playwright (Chrome) against a fresh build on port 3100 |
| `npm run check` | `tsc --noEmit` + `test` + `e2e`; must be green before a release |
| `npm run build:llms` | regenerates `public/llms.txt` from `src/content.ts` (a test fails on drift) |
| `npm run build:cv` | rebuilds `public/Mikhail_Kolatau_CV.pdf` (see below) |
| `npm run render:sky` | re-renders the sky background asset |
| `npm run check:links` | requests every external link from `src/content.ts`; needs network, not part of `check` |

## Environment

- `NEXT_PUBLIC_SITE_URL`: absolute origin used for canonical, Open Graph, sitemap and JSON-LD (for example a custom domain). Falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3100`. A Vercel production build with neither variable set fails on purpose.

## CV

The PDF is not authored here: `build:cv` builds it from the CV source HTML in a separate private local repo, so it needs that checkout on the machine. The built PDF is committed.

Set these in a git-ignored `.env.local` (or the shell):

- `CV_SOURCE_DIR`: directory holding the source CV HTML. No default; the script exits with a message when it is unset or missing.
- `CHROME_PATH`: Chrome binary used to print the PDF. Defaults to the standard macOS location.

The e2e CV check extracts the PDF text with `pdftotext`, so it needs poppler on `PATH`; without it that test is skipped with a message.

## Content

All copy lives in `src/content.ts`. Page text must match `docs/mock/index.html`; change the mock and the content together. Two sentences of the page copy were corrected after a final fact-check, and the mock under `docs/mock` was updated to match.
