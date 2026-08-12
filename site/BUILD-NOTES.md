# Build notes

The site built from `PLAINLY-LAUNCH-KIT/`. This file records what was implemented, where
the build deviates from the kit and why, and what is still outstanding.

Read `../PLAINLY-LAUNCH-KIT/00-START-HERE.md` first. This file assumes it.

## Running it

```bash
npm install
npm run dev            # http://localhost:4321
npm run build:staging  # builds with [NEEDS SOURCE] markers rendered visibly
npm run build          # builds, then blocks on any gate failure
npm run gate           # re-run the gate against the last build
```

`npm run build` will currently fail. That is the intended behaviour — see **Outstanding**.

## What is here

| | |
|---|---|
| Framework | Astro 5, `output: 'static'`, `trailingSlash: 'always'` |
| JavaScript shipped | none, on every page except the valuation tool |
| Routes | 14 spec'd + privacy, contact, thank-you, 404 |
| Build gate | `scripts/gate.mjs`, 24 checks against the built HTML |

Astro was chosen against `05-SEO-AEO-GEO/01-technical-gate.md`, which rules out a
client-only SPA: the AI search crawlers read the raw HTML response. Every route was
verified to carry `<h1>`, `<title>`, canonical and JSON-LD in that response.

### The link graph is generated, not typed

`src/lib/pages.js` holds all 14 routes. Header nav, footer, breadcrumbs, sibling links,
`sitemap.xml`, `llms.txt` and the gate all read from it. A page cannot be in the sitemap
and not built, or built and orphaned.

### The entity description is generated too

`SITE.definition` in `src/lib/site.js` is emitted into the visible copy, the `Organization`
schema and `llms.txt` from one constant, because
`05-SEO-AEO-GEO/04-ai-visibility-geo.md` lever 3 requires it character-identical and
hand-copying is how that drifts.

## The build gate

`scripts/gate.mjs` implements the checks the kit specifies in prose across five files and
never implements. It runs against `dist/`, so it sees what a crawler sees.

Blocks the production build on: unresolved `[NEEDS SOURCE]` markers · unresolved
`[PHONE]`/`[EMAIL]`/`[PARTNER NAME]`/`[PARTNER ORN]` · any phrase from the prohibited list ·
a currency figure within 200 characters of a named Dubai tower · `<title>` over 62 chars ·
meta description outside 140–165 · duplicate title or meta · missing or non-self-referencing
canonical · missing `og:image` or `twitter:card` · `nosnippet` · more or fewer than one
`<h1>` · a skipped heading level · answer block outside 40–60 words · the wrong number of
body links to `/property-valuation-dubai/` · `LocalBusiness`, `RealEstateAgent`, `address`,
`aggregateRating`, or a price node without a number in the JSON-LD · a `FAQPage` answer that
is not in the visible body verbatim · a `Service` description that is not the visible answer
block · a table without a source line · the checklist page rendering fewer points than its
title claims · a sitemap entry that was not built.

It caught two real defects in my own copy on first run: the word "cheapest" on the mortgage
page, and "Guaranteed rent" as a fee-model label on the holiday-home page. Both were
rewritten rather than exempted.

## Deviations from the kit, and why

**1. The homepage was authored, not specified.** `sitemap.xml` carries 14 URLs;
`03-PAGE-SPECS` covers 13. The homepage had no title, meta, answer block or block order.
Written to the same standard as the spec'd pages: title 44 chars, meta 149, answer block 50
words.

**2. Four pages were added that the kit assumes but never specs.** `/thank-you/` (already
disallowed in the kit's own `robots.txt`), `/privacy/` (required by
`07-COMPLIANCE/trakheesi-and-claims.md:73` before the form collects anything), `/contact/`
(the kit's `llms.txt` publishes a contact line and the header carries a phone number), and a
404. `/privacy/` and `/contact/` are in the sitemap; `/thank-you/` and 404 are `noindex`.

**3. The checklist is not gated behind an email.** `03-PAGE-SPECS/06` calls that page "the
email capture", but block B2 of the same spec says "No gate, no email wall", and
`04-DESIGN` forbids hiding the substance. The full 180-point checklist is on the page. A PDF
is listed as an outstanding asset, not as the only way to get the content.

**4. Meta descriptions without a number are advisory, not blocking.**
`05-SEO-AEO-GEO/05-definition-of-done.md` requires a number in every meta description. Four
of the descriptions supplied in `03-PAGE-SPECS` as "exact values, do not rewrite" contain
none: `/handover-dubai/`, `/snagging-dubai/checklist/`,
`/snagging-dubai/developer-defect-liability/`, `/property-valuation-dubai/how-it-works/` and
`/holiday-home-management-dubai/permit/`. The per-page instruction is the more specific one,
so the exact values were kept and the gate reports the conflict instead of blocking on it.

**5. `/property-valuation-dubai/how-it-works/` does not contain its primary keyword in the
title.** The spec names `property valuation calculator dubai` as primary and separately
requires the primary in the title tag — but the title it supplies as an exact value does not
contain it. The exact title was kept.

**6. The blog pages link up to the homepage.** `02-ARCHITECTURE/internal-linking-map.md`
requires every page to link "up to its pillar", but the sitemap tree gives the two blog pages
no pillar and specs no `/blog/` index. They link across to each other and up to home, and
carry their one valuation cross-link as specified.

**7. The empty `identifier` array was dropped from the Organization schema.** The kit's
template leaves `"identifier": []` where BRN/ORN used to be.
`07-COMPLIANCE/who-is-the-advertiser.md:17` says those were "deleted, not emptied", so the
property is omitted. `telephone` and `sameAs` are omitted on the same reasoning while they
are pending.

## Contradictions found in the kit

These are in the kit, not in the build. They need a decision.

**1. `06-CONTENT-PRODUCTION/prompt_write.txt:1` describes the site as "owned by a licensed
RERA broker".** This is the prompt that generates every page's copy. Running it as written
produces copy claiming credentials `07-COMPLIANCE/who-is-the-advertiser.md:3` says do not
exist. Same text is mirrored in `01-STRATEGY/02-content-production-plan.html:129`. **Fix
this before running the pipeline.**

**2. `08-LAUNCH/01-pre-launch-checklist.md:10` says "Confirm the broker's BRN and the firm's
ORN".** Leftover from the licensed version. Should read: confirm the *partner's* ORN against
the DLD register.

**3. The revenue figures disagree.** `00-START-HERE.md` states AED 10,132–29,243/month.
`01-STRATEGY/evidence/forecast.json` carries `rev_lo: 28607, rev_hi: 78722`.
`07-COMPLIANCE/who-is-the-advertiser.md:58` cites AED 31,788–87,548 as the licensed-model
figure. The third number is not derivable from the evidence file.

## Outstanding

### Blocking the production build

**48 unresolved placeholders.** Set them in `src/lib/site.js`:

| Field | What it is |
|---|---|
| `phone` | the one number that is always answered |
| `email` | contact address |
| `partner.name` | the contracted RERA-licensed partner brokerage |
| `partner.orn` | their ORN, verified against the DLD register |
| `author` | real named author — YMYL content requires one |
| `formEndpoint` | where the valuation form POSTs |

Also `SITE.origin` and `SITE.name` if the domain or trading name differ from
`plainlyproperty.com` / `Plainly`.

**50 `[NEEDS SOURCE]` markers.** Every figure the kit does not itself source. Run
`npm run gate` for the full list with page and description. The largest clusters:

- Snagging rate cards by unit size, and the re-inspection fee (`/snagging-dubai/cost/`)
- DET holiday home permit fees, validity and renewal cycle (`/holiday-home-management-dubai/permit/`)
- Short-let occupancy, tourism dirham, cleaning charges (`/short-let-vs-long-let/`)
- DEWA, Ejari and DLD fees and processing times (`/handover-dubai/`)
- Current LTV caps and lending banks (`/blog/non-resident-mortgage-dubai/`)
- UAE Civil Code articles on defect and decennial liability, verbatim
- GDRFA/ICP text for the property investor route, verbatim
- DLD valuation certificate fee and turnaround

Copy already written from figures the kit does source: snagging AED 666–999, management
15–25% of gross, the AED 2 million golden visa threshold, one-year/ten-year defect
liability, mortgage brokers at 0.5–1%, and the H1 2026 −13.6% transaction decline.

**Fact density falls short of the standard on most pages.**
`05-SEO-AEO-GEO/02-onpage-standard.md` calls for one sourced statistic every 150–200 words,
6–8 per page — and identifies it as the single strongest AI-visibility lever, worth roughly
+41%. The kit supplies about six sourced figures in total across thirteen pages. Resolving
the markers above is what closes that gap; it is research work, not writing work.

### Not blocking, but needed before launch

- **The valuation tool has no dataset.** `src/data/valuation-ranges.json` is empty and the
  tool renders a stated gap instead of a number. It needs DLD price-per-sq-ft bands by
  community and property type. Aggregate figures only —
  `07-COMPLIANCE/trakheesi-and-claims.md` allows "apartments in Dubai Marina transacted
  between AED 1.1M and 1.9M" and forbids anything naming a unit.
- **14 OG images**, 1200×630, at `/og/<path>/og.png`. The gate warns per page.
- **A printable checklist PDF** for `/snagging-dubai/checklist/`.
- **The privacy notice is a scaffold**, not legal copy. `07-COMPLIANCE` requires the
  client's counsel to confirm it against UAE federal data protection law before the form
  goes live.
- **Analytics.** GA4 with the AI-referral channel group from
  `05-SEO-AEO-GEO/04-ai-visibility-geo.md`, Search Console, and conversion tracking on the
  form rather than the page view.
- **A pre-launch AI-citation baseline**: 8 questions × 5 runs × 4 engines, logged and dated,
  before organic traction. There is nothing to compare against later if this is skipped.
