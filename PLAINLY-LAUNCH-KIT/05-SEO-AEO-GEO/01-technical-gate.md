# Step 0 — the gate that decides everything

**A client-only React SPA is invisible to AI answer engines.** `OAI-SearchBot`, `PerplexityBot`
and `Claude-SearchBot` largely do not execute JavaScript — they read the raw HTML response. If the
text and `<head>` tags are not in that first response, nothing else in this kit matters.

## Do this first

1. **Render server-side or statically.** These are advice pages that change rarely, so **SSG or
   prerendering is the correct choice** — Next.js static export, Astro, or a prerender step on an
   existing SPA (`vite-plugin-prerender`, `react-snap`). SSR only where genuinely dynamic.
2. **Test every route:**
   ```bash
   curl -sL https://plainlyproperty.com/property-valuation-dubai/ | grep -i "<h1"
   curl -sL https://plainlyproperty.com/property-valuation-dubai/ | grep -i "<title>"
   curl -sL https://plainlyproperty.com/property-valuation-dubai/ | grep -i "application/ld+json"
   ```
   All three must return content. If any is empty, stop and fix rendering.
3. **`<head>` per page at build time.** React 19+ renders `<title>`/`<meta>` directly in
   components. React ≤18 needs `react-helmet-async` inside `<HelmetProvider>`, with
   `Helmet.renderStatic()` on the server. Helmet in a pure SPA sets tags after JS runs — too late.
4. **Inject JSON-LD safely:**
   ```jsx
   <script type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
   ```

## Core Web Vitals — confirmed ranking signals

| Metric | Target | Lever on this site |
|---|---|---|
| LCP | < 2.5s | preload the answer block's font-size context; no hero image above B1; no webfont |
| INP | < 200ms | the valuation tool is the only JS on most pages — keep it small and lazy |
| CLS | < 0.1 | explicit `width`/`height` on every image; reserve the tool's result area |

Code-split routes, ship less JavaScript, AVIF/WebP with `loading="lazy"` below the fold.

## The rest of the baseline

- HTTPS, mobile-first, no thin or duplicated pages, no intrusive interstitial.
- One canonical per page, self-referencing.
- Never `noindex` a money page. Never apply `nosnippet` or `data-nosnippet` to answer content —
  those block AI Overviews too.
