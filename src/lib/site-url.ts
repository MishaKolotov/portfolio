/** Absolute origin of the site: explicit URL, else the Vercel production domain, else local. */
export function siteUrl(env: NodeJS.ProcessEnv): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL;
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
  let url: string;
  if (explicit) url = explicit;
  else if (vercel) url = `https://${vercel}`;
  else if (env.VERCEL_ENV === 'production') {
    throw new Error('Production build needs NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL to build absolute URLs.');
  } else url = 'http://localhost:3100';
  return url.replace(/\/$/, '');
}
