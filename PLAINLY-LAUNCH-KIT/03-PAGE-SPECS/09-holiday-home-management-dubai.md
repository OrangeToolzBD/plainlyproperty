# Page 09 — `/holiday-home-management-dubai/`

**Role:** DOOR · **Build batch:** 2 · **Research depth:** HIGH — published fee structures + DET holiday home permit rules
**Measured demand:** 200 searches/month · **traffic value** AED 1,764/month

---

## 1. Head tags — exact values, do not rewrite

```html
<title>Holiday Home Management Dubai — What Operators Charge (15–25%)</title>
<meta name="description" content="Holiday home operators in Dubai charge 15–25% of gross booking revenue. Compare the fee models, the DET permit you need, and when short-let beats a long-term tenant.">
<link rel="canonical" href="https://plainlyproperty.com/holiday-home-management-dubai/">
<meta property="og:title" content="Holiday Home Management Dubai — What Operators Charge (15–25%)">
<meta property="og:description" content="Holiday home operators in Dubai charge 15–25% of gross booking revenue. Compare the fee models, the DET permit you need, and when short-let beats a long-term tenant.">
<meta property="og:url" content="https://plainlyproperty.com/holiday-home-management-dubai/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://plainlyproperty.com/og/holiday-home-management-dubai/og.png">
<meta name="twitter:card" content="summary_large_image">
```

Title is 62 characters, meta is 165. Both are inside Google's display
limits. **If you change them, re-check the counts** — a truncated title loses the click, and the
click is the entire point of the wording chosen here.

These tags must be **server-rendered**. Verify with:
```bash
curl -sL https://plainlyproperty.com/holiday-home-management-dubai/ | grep -i "<title>"
```
If nothing comes back, the AI search crawlers see nothing either. Fix rendering before writing copy.

---

## 2. Target keywords — measured, do not add to this list

| Keyword | Searches/mo | Click value | Monthly traffic value |
|---|---|---|---|
| `holiday home management dubai` | 110 | AED 168.05 | AED 1,201 |
| `airbnb property management dubai` | 50 | AED 64.42 | AED 209 |
| `short-term rental management dubai` | 40 | AED 136.03 | AED 353 |

**Primary:** `holiday home management dubai`

The primary keyword appears in: the title tag, the `<h1>`, and naturally inside the first 60 words.
It does **not** need to appear at any particular density anywhere else — keyword density is not a
ranking factor and repeating keywords has been shown *not* to raise AI citation rates.

---

## 3. Block structure — build in this order

| Block | What it is | Size | Instruction |
|---|---|---|---|
| **B1** | Answer block | 40-60 words | Answers the page question with the price or the deadline in it. Every competitor buries this behind a contact form; publishing it is why this page wins the click. |
| **B2** | The number table | table | Real published prices or real published rules, by segment. Sourced, dated, attributed. No gate, no email wall. |
| **B3** | What it covers / what happens | list or steps | The substance the incumbents omit. Pulled from the research pack "gaps_in_top5" field. |
| **B4** | The rule | quote block | The governing regulation quoted verbatim with its article number and authority. Never paraphrased. |
| **B5** | What people get wrong | short section | One counter-example or commonly-missed cost. This is the section that earns links. |
| **B6** | FAQ | 5-8 questions | Answer-first. Feeds FAQPage schema. |
| **B7** | Valuation cross-link | one sentence | Late in the body, phrased as the reader's own next question. One only. |

**Page format:** Fee comparison table + break-even calculator.
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
  own next question. 

---

## 8. Definition of done

Copy the checklist from `05-SEO-AEO-GEO/05-definition-of-done.md` and tick every line before this
page ships. A page that fails any line comes back.
