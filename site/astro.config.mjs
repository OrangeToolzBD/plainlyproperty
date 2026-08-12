import { defineConfig } from 'astro/config';
import { SITE } from './src/lib/site.js';

// Static output. The technical gate (05-SEO-AEO-GEO/01-technical-gate.md) requires the
// body text, <head> tags and JSON-LD to be present in the raw HTML response, because
// OAI-SearchBot, PerplexityBot and Claude-SearchBot largely do not execute JavaScript.
export default defineConfig({
  site: SITE.origin,
  output: 'static',
  trailingSlash: 'always',
  build: {
    // /snagging-dubai/ -> /snagging-dubai/index.html, so the trailing-slash URLs in
    // sitemap.xml and every internal link resolve without a redirect.
    format: 'directory',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
