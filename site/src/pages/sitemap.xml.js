// Generated from the same PAGES array the nav, breadcrumbs and link graph read, so the
// sitemap cannot list a URL the site does not build, or omit one it does.
//
// 02-ARCHITECTURE/sitemap.xml lists the 14 spec'd URLs. /privacy/ and /contact/ are added
// here because they are indexable pages and a sitemap should list every indexable URL.
// /thank-you/ and the 404 are excluded: both are noindex.
import { PAGES } from '../lib/pages.js';
import { SITE, absoluteUrl } from '../lib/site.js';

export function GET() {
  const urls = [...PAGES.map((p) => p.path), '/privacy/', '/contact/'];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${SITE.lastReviewed}</lastmod></url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
