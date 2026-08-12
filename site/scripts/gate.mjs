#!/usr/bin/env node
/**
 * The build gate.
 *
 * 04-DESIGN/02-page-templates.md:88 — "a [NEEDS SOURCE] marker must fail the production
 * build, not silently ship. It is the mechanism that stops an unsourced figure reaching a
 * live page." 07-COMPLIANCE/trakheesi-and-claims.md:67 — "Any hit fails the build. This is
 * cheaper than a retraction."
 *
 * The kit specifies these checks in prose across five files and implements none of them.
 * This is that implementation. It runs against the BUILT HTML rather than the source, so
 * it sees what a crawler sees.
 *
 *   node scripts/gate.mjs          fail on any error
 *   STAGING=1 node scripts/gate.mjs   report everything, exit 0
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const STAGING = process.env.STAGING === '1';
const VALUATION = '/property-valuation-dubai/';

const errors = [];
const warnings = [];
const fail = (page, rule, detail) => errors.push({ page, rule, detail });
const warn = (page, rule, detail) => warnings.push({ page, rule, detail });

// ---------------------------------------------------------------------------
// Rules drawn from the kit
// ---------------------------------------------------------------------------

/** 07-COMPLIANCE/trakheesi-and-claims.md:61 — copied verbatim, then made matchable. */
const BANNED = [
  /\bguaranteed\b/i,
  /\bprojected return\b/i,
  /\bexpect \d+%/i,
  /\bROI of\b/i,
  /\bwill rise\b/i,
  /\bset to increase\b/i,
  /\bcheapest\b/i,
  /\bbest in dubai\b/i,
  /\bnumber one\b/i,
  /#1(?![0-9])/,
  /\brisk-free\b/i,
  /\bassured returns\b/i,
];

/**
 * Named Dubai towers. A currency figure within 200 characters of one of these is the
 * shape of a property advertisement, which needs a Trakheesi permit and carries fines
 * from AED 50,000. Extend this list as the client's own copy grows.
 */
const TOWERS = [
  'Burj Khalifa', 'Marina Gate', 'Princess Tower', 'Cayan Tower', 'Ocean Heights',
  'Torch Tower', 'Elite Residence', 'Damac Heights', 'Sulafa Tower', 'Marina Pinnacle',
  'Index Tower', 'Almas Tower', 'JW Marriott Marquis', 'Emirates Crown', 'Sky Gardens',
  'Boulevard Point', 'Act One Act Two', 'Opera Grand', 'Address Residences',
  'Vida Residence', 'Burj Vista', 'Forte Tower', 'Il Primo', 'Grande Signature',
  'Bay Central', 'Silverene', 'Botanica Tower', 'Trident Grand', 'Al Bateen Residence',
];

/** 05-SEO-AEO-GEO/03-schema-templates.md — "Never ship". */
const BANNED_SCHEMA_TYPES = ['LocalBusiness', 'RealEstateAgent'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function htmlFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Built path -> the URL it serves. dist/snagging-dubai/index.html -> /snagging-dubai/ */
function urlOf(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === '404.html') return '/404';
  return '/' + rel.replace(/index\.html$/, '');
}

const stripTags = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ');

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

const text = (html) => decode(stripTags(html)).replace(/\s+/g, ' ').trim();

const attr = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return { __parseError: true };
      }
    });

// ---------------------------------------------------------------------------
// Per-page checks
// ---------------------------------------------------------------------------

const seenTitles = new Map();
const seenMetas = new Map();

function checkPage(file) {
  const html = readFileSync(file, 'utf8');
  const url = urlOf(file);
  const body = text(html);

  // ---- Rendering. 05-SEO-AEO-GEO/01-technical-gate.md ---------------------
  // If these are not in the raw HTML, the AI search crawlers see nothing.
  const title = attr(html, /<title>([\s\S]*?)<\/title>/);
  if (!title) fail(url, 'render', 'no <title> in the raw HTML');

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) fail(url, 'structure', `${h1s.length} <h1> elements, expected exactly 1`);

  const graphs = jsonLd(html);
  if (graphs.length === 0) fail(url, 'render', 'no JSON-LD in the raw HTML');
  if (graphs.some((g) => g.__parseError)) fail(url, 'schema', 'a JSON-LD block does not parse');

  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

  // The thirteen spec'd pages plus the homepage. Privacy, contact, thank-you and 404 are
  // not in 03-PAGE-SPECS and are not held to the on-page standard written for those pages.
  const isContentPage = /<article class="prose" data-content-page>/.test(html);

  // ---- Head. 05-SEO-AEO-GEO/05-definition-of-done.md ---------------------
  if (title && title.length > 62) {
    fail(url, 'head', `<title> is ${title.length} chars, limit is 62 — "${title}"`);
  }
  if (title) {
    if (seenTitles.has(title)) fail(url, 'head', `<title> duplicates ${seenTitles.get(title)}`);
    else seenTitles.set(title, url);
  }

  const meta = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!meta) {
    fail(url, 'head', 'no meta description');
  } else {
    if (meta.length < 140 || meta.length > 165) {
      fail(url, 'head', `meta description is ${meta.length} chars, spec is 140–165`);
    }
    // Advisory, not blocking. 05-SEO-AEO-GEO/05-definition-of-done.md requires a number in
    // every meta description, but four of the descriptions supplied as "exact values, do
    // not rewrite" in 03-PAGE-SPECS contain none. The specs win over the checklist, so this
    // reports the conflict rather than blocking on it — see BUILD-NOTES.md.
    if (!/\d/.test(meta)) warn(url, 'head', 'meta description contains no number');
    if (seenMetas.has(meta)) fail(url, 'head', `meta description duplicates ${seenMetas.get(meta)}`);
    else seenMetas.set(meta, url);
  }

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (!canonical && !noindex) fail(url, 'head', 'no canonical');
  if (canonical && !canonical.endsWith(url)) {
    fail(url, 'head', `canonical ${canonical} does not self-reference`);
  }

  if (isContentPage && !noindex) {
    if (!/property="og:image"/.test(html)) fail(url, 'head', 'no og:image');
    if (!/name="twitter:card"/.test(html)) fail(url, 'head', 'no twitter:card');
  }

  // nosnippet blocks AI Overviews too — 01-technical-gate.md:43
  if (/nosnippet/.test(html)) fail(url, 'head', 'nosnippet present; it blocks AI Overviews too');

  // ---- Unresolved markers ------------------------------------------------
  for (const m of body.matchAll(/\[NEEDS SOURCE[^\]]*\]/g)) {
    fail(url, 'needs-source', m[0]);
  }
  for (const m of body.matchAll(/\[(PHONE|EMAIL|PARTNER NAME|PARTNER ORN)\]/g)) {
    fail(url, 'placeholder', `${m[0]} still unresolved`);
  }

  // ---- Compliance. 07-COMPLIANCE ----------------------------------------
  for (const re of BANNED) {
    const m = body.match(re);
    if (m) fail(url, 'compliance', `prohibited phrasing: "${m[0]}"`);
  }

  for (const tower of TOWERS) {
    let at = body.indexOf(tower);
    while (at !== -1) {
      const near = body.slice(Math.max(0, at - 200), at + tower.length + 200);
      const money = near.match(/AED\s?[\d,.]+|[\d,.]+\s?AED/);
      if (money) {
        fail(
          url,
          'trakheesi',
          `"${tower}" within 200 chars of "${money[0]}" — that is the shape of a property advertisement`,
        );
        break;
      }
      at = body.indexOf(tower, at + 1);
    }
  }

  // ---- Structure ---------------------------------------------------------
  const levels = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail(url, 'structure', `heading level jumps h${levels[i - 1]} -> h${levels[i]}`);
    }
  }

  // ---- Answer block. 40–60 words, stands alone when quoted ---------------
  const answer = html.match(/<div class="answer" data-answer-words="(\d+)"/);
  if (answer) {
    const words = Number(answer[1]);
    if (words < 40 || words > 60) {
      fail(url, 'answer-block', `${words} words, spec is 40–60`);
    }
  }

  // ---- The one link that pays for the site -------------------------------
  // 02-ARCHITECTURE/internal-linking-map.md: exactly once, in the body. Header, footer and
  // breadcrumbs are site-wide navigation and are not what that rule is about, so the count
  // is scoped to the article.
  const article = html.match(/<article class="prose"[^>]*>([\s\S]*?)<\/article>/);
  // The homepage is not in the per-page table in 02-ARCHITECTURE/internal-linking-map.md —
  // it lists every cluster, so its link to the valuation pillar is navigation.
  if (article && isContentPage && url !== '/') {
    const links = [...article[1].matchAll(new RegExp(`href="${VALUATION}"`, 'g'))].length;
    // The valuation page IS the destination and links out, not in.
    const expected = url === VALUATION ? 0 : 1;
    if (links !== expected) {
      fail(
        url,
        'cross-link',
        `${links} body links to ${VALUATION}, expected exactly ${expected}`,
      );
    }
  }

  // ---- Schema ------------------------------------------------------------
  const flat = JSON.stringify(graphs);
  for (const banned of BANNED_SCHEMA_TYPES) {
    if (flat.includes(`"${banned}"`)) {
      fail(url, 'schema', `${banned} asserts premises this site does not have`);
    }
  }
  if (/"address"/.test(flat)) fail(url, 'schema', 'address present; this site asserts no premises');
  if (/"price"\s*:\s*"[^0-9"]/.test(flat)) {
    fail(url, 'schema', 'price node without a number');
  }
  if (/"aggregateRating"/.test(flat)) {
    fail(url, 'schema', 'aggregateRating without real displayed reviews');
  }
  if (/\[(NEEDS SOURCE|PHONE|EMAIL|PARTNER)/.test(flat)) {
    fail(url, 'schema', 'an unresolved placeholder reached the JSON-LD');
  }

  // FAQPage answers must appear verbatim in the visible body.
  const faq = graphs.find((g) => g['@type'] === 'FAQPage');
  if (faq) {
    for (const entry of faq.mainEntity ?? []) {
      const a = entry.acceptedAnswer?.text?.replace(/\s+/g, ' ').trim();
      if (a && !body.includes(a)) {
        fail(url, 'schema', `FAQ answer not found verbatim in the body: "${a.slice(0, 60)}…"`);
      }
    }
  }

  // Service description must be the visible answer block.
  const service = graphs.find((g) => g['@type'] === 'Service');
  if (service?.description && !body.includes(service.description.replace(/\s+/g, ' ').trim())) {
    fail(url, 'schema', 'Service description is not the visible answer-block text');
  }

  // ---- Substance ---------------------------------------------------------
  if (article && isContentPage && url !== '/') {
    const words = text(article[1]).split(/\s+/).length;
    if (words < 700 || words > 4000) {
      warn(url, 'length', `${words} words in the article (spec targets 900–1,300 of prose)`);
    }
  }

  // Every table needs a source line beneath it.
  const tables = (html.match(/<table>/g) ?? []).length;
  const sources = (html.match(/class="source-line"/g) ?? []).length;
  if (tables > 0 && sources < tables) {
    fail(url, 'substance', `${tables} tables but only ${sources} source lines`);
  }

  // ---- Assets ------------------------------------------------------------
  const og = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (og) {
    const local = join(DIST, og.replace(/^https?:\/\/[^/]+/, ''));
    if (!existsSync(local)) warn(url, 'assets', `og:image missing: ${og}`);
  }
}

// ---------------------------------------------------------------------------
// Site-wide checks
// ---------------------------------------------------------------------------

function checkSite(files) {
  const built = new Set(files.map(urlOf));

  const sitemapFile = join(DIST, 'sitemap.xml');
  if (!existsSync(sitemapFile)) {
    fail('/sitemap.xml', 'site', 'sitemap.xml was not generated');
  } else {
    const listed = [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].replace(/^https?:\/\/[^/]+/, ''),
    );
    for (const url of listed) {
      if (!built.has(url)) fail('/sitemap.xml', 'site', `lists ${url}, which was not built`);
    }
    // A noindex page must never be advertised in the sitemap.
    if (listed.includes('/thank-you/')) {
      fail('/sitemap.xml', 'site', '/thank-you/ is noindex and disallowed; remove it');
    }
  }

  for (const required of ['robots.txt', 'llms.txt', 'logo.svg', 'favicon.svg']) {
    if (!existsSync(join(DIST, required))) fail('/', 'site', `${required} was not deployed`);
  }

  // The checklist page's title asserts a point count. Check the page renders that many.
  const checklist = files.find((f) => urlOf(f) === '/snagging-dubai/checklist/');
  if (checklist) {
    const html = readFileSync(checklist, 'utf8');
    const claimed = attr(html, /<title>[^<]*?(\d{2,4}) Points/i);
    const article = html.match(/<article class="prose"[^>]*>([\s\S]*?)<\/article>/);
    const rendered = article ? (article[1].match(/<li>/g) ?? []).length : 0;
    if (claimed && rendered < Number(claimed)) {
      fail(
        '/snagging-dubai/checklist/',
        'substance',
        `title claims ${claimed} points, page renders ${rendered} list items`,
      );
    }
  }
}

// ---------------------------------------------------------------------------

if (!existsSync(DIST)) {
  console.error('gate: no dist/ — run `astro build` first');
  process.exit(1);
}

const files = htmlFiles(DIST);
files.forEach(checkPage);
checkSite(files);

const byPage = new Map();
for (const e of [...errors.map((e) => ({ ...e, level: 'FAIL' })), ...warnings.map((w) => ({ ...w, level: 'warn' }))]) {
  if (!byPage.has(e.page)) byPage.set(e.page, []);
  byPage.get(e.page).push(e);
}

console.log(`\ngate: checked ${files.length} pages\n`);
for (const [page, items] of [...byPage.entries()].sort()) {
  console.log(`  ${page}`);
  for (const i of items) console.log(`    ${i.level}  [${i.rule}] ${i.detail}`);
  console.log('');
}

const counts = errors.reduce((acc, e) => ({ ...acc, [e.rule]: (acc[e.rule] ?? 0) + 1 }), {});
console.log('  summary:', Object.entries(counts).map(([k, v]) => `${k}=${v}`).join('  ') || 'clean');
console.log(`  ${errors.length} blocking, ${warnings.length} advisory\n`);

if (errors.length && !STAGING) {
  console.error('gate: production build blocked. Run with STAGING=1 to build anyway.\n');
  process.exit(1);
}
if (STAGING && errors.length) {
  console.log('gate: STAGING=1 — building despite the failures above.\n');
}
