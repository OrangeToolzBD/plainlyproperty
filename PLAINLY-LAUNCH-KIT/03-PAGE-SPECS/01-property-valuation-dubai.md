# Page 01 — `/property-valuation-dubai/`

**Role:** TILL · **Build batch:** 1 · **Research depth:** HIGH — needs live DLD transaction comparables per community
**Measured demand:** 750 searches/month · **traffic value** AED 2,063/month

---

## 1. Head tags — exact values, do not rewrite

```html
<title>Dubai Property Valuation — Free Written Report in 24 Hours</title>
<meta name="description" content="Get a written valuation of your Dubai property in 24 hours, based on Land Department transaction data for your building. Prepared with a RERA-licensed partner.">
<link rel="canonical" href="https://plainlyproperty.com/property-valuation-dubai/">
<meta property="og:title" content="Dubai Property Valuation — Free Written Report in 24 Hours">
<meta property="og:description" content="Get a written valuation of your Dubai property in 24 hours, based on Land Department transaction data for your building. Prepared with a RERA-licensed partner.">
<meta property="og:url" content="https://plainlyproperty.com/property-valuation-dubai/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://plainlyproperty.com/og/property-valuation-dubai/og.png">
<meta name="twitter:card" content="summary_large_image">
```

Title is 58 characters, meta is 146. Both are inside Google's display
limits. **If you change them, re-check the counts** — a truncated title loses the click, and the
click is the entire point of the wording chosen here.

These tags must be **server-rendered**. Verify with:
```bash
curl -sL https://plainlyproperty.com/property-valuation-dubai/ | grep -i "<title>"
```
If nothing comes back, the AI search crawlers see nothing either. Fix rendering before writing copy.

---

## 2. Target keywords — measured, do not add to this list

| Keyword | Searches/mo | Click value | Monthly traffic value |
|---|---|---|---|
| `dubai property valuation` | 480 | AED 46.35 | AED 1,446 |
| `property valuation companies dubai` | 110 | AED 33.64 | AED 240 |
| `property valuation company in dubai` | 110 | AED 33.64 | AED 240 |
| `online property valuation dubai` | 10 | AED 189.17 | AED 122 |
| `dubai land department property valuation` | 10 | AED 21.26 | AED 13 |
| `property valuation firm in dubai` | 10 | AED 0.00 | AED 0 |
| `property valuation services dubai` | 10 | AED 0.00 | AED 0 |
| `list of property valuation companies in dubai` | 10 | AED 0.00 | AED 0 |

**Primary:** `dubai property valuation`

The primary keyword appears in: the title tag, the `<h1>`, and naturally inside the first 60 words.
It does **not** need to appear at any particular density anywhere else — keyword density is not a
ranking factor and repeating keywords has been shown *not* to raise AI citation rates.

---

## 3. Block structure — build in this order

| Block | What it is | Size | Instruction |
|---|---|---|---|
| **B1** | Answer block | 40-60 words | Answers the exact page question with a number in it. No hero image above it, no slogan, no "welcome". This is the passage AI Overviews quote and the first thing a human reads. |
| **B2** | The tool | interactive | Three fields maximum: community, property type, size. Returns an indicative range instantly, then offers the written report. Never asks for a phone number before showing a number - that is the whole reason people leave these pages. |
| **B3** | What the report contains | list, 6 items | Concrete deliverables. "Comparable transactions from the last 6 months in your building" beats "expert analysis". |
| **B4** | How the valuation is produced | table, 3 methods | Comparable sales / income / DLD-certified. Cost, turnaround and when each applies. Comparison tables get reproduced near-verbatim inside AI answers - this is the highest-value block on the page after B1. |
| **B5** | Partner disclosure | inline card | Names the RERA-licensed partner who performs the valuation, with THEIR ORN and register link, clearly attributed to them. Plainly is identified as an information service, not the broker. |
| **B6** | FAQ | 5-8 questions | Each phrased exactly as people ask it. Answer-first lead sentence, then detail. This block feeds the FAQPage schema verbatim. |
| **B7** | Request the report | form | Name, phone, community, property type. Four fields. Every extra field costs conversions. |

**Page format:** Tool + form. Instant range on submit, written report by email within 24h.
**Prose budget:** 900–1,300 words. Tables and code blocks do not count toward it.

---

## 4. Heading rules

- Exactly **one** `<h1>`, matching the title's intent (not necessarily its exact words).
- `<h2>` → `<h3>`, never skipped for styling reasons.
- `<h2>` phrase every H2 as a question a person would say aloud
- `<h2>` mine them from the research pack "gaps_in_top5" field
- `<h2>` never stack keywords into a heading

---

## 5. Fact density — the single strongest AI-visibility lever

**One concrete, sourced statistic every 150–200 words.** Peer-reviewed testing (KDD-2024) found
this to be the highest-impact change for getting cited inside AI answers — roughly +41% visibility,
with low-ranked pages gaining most (~+115% from around position 5). A brand-new site is exactly
the case that gains most.

At 900–1,300 words this page needs **6–8 sourced figures minimum**. Every one comes from the
research pack. If the pack says NOT FOUND, the page writes `[NEEDS SOURCE]` inline — it does not
estimate.

---

## 6. Schema — paste, then fill from real data only

See `05-SEO-AEO-GEO/03-schema-templates.md` for the full graph. This page needs:

- `Organization` (site-wide, referenced by `@id`)
- `Service` (serviceType matching this page's subject)
- `BreadcrumbList`
- `FAQPage` — **only if** block B6 actually renders on the page, with answer text **copied verbatim** from the visible body

**Never `LocalBusiness`.** This site asserts no premises and runs no map listing. `LocalBusiness`
on a page like this claims a physical location that does not exist as described.

---

## 7. Internal links

- Up to the cluster pillar, with descriptive anchor text.
- Across to at least one sibling page.
- **Exactly one** link to `/property-valuation-dubai/`, late in the body, phrased as the reader's
  own next question. This page IS the destination — it links out, not in.

---

## 8. Definition of done

Copy the checklist from `05-SEO-AEO-GEO/05-definition-of-done.md` and tick every line before this
page ships. A page that fails any line comes back.
