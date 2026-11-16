import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site-url';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const url = siteUrl(process.env);
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${url}/sitemap.xml` };
}
