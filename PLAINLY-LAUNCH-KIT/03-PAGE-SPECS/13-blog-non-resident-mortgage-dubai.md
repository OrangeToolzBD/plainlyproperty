# Page 13 — `/blog/non-resident-mortgage-dubai/`

**Role:** BLOG · **Build batch:** 3 · **Research depth:** HIGH — current LTV caps and lender list change often
**Measured demand:** 220 searches/month · **traffic value** AED 265/month

---

## 1. Head tags — exact values, do not rewrite

```html
<title>Non-Resident Mortgage Dubai — LTV Limits and Which Banks Lend</title>
<meta name="description" content="Non-residents can borrow in Dubai at lower loan-to-value than residents. The current LTV caps, the banks that lend, and the documents required from overseas.">
<link rel="canonical" href="https://plainlyproperty.com/blog/non-resident-mortgage-dubai/">
<meta property="og:title" content="Non-Resident Mortgage Dubai — LTV Limits and Which Banks Lend">
<meta property="og:description" content="Non-residents can borrow in Dubai at lower loan-to-value than residents. The current LTV caps, the banks that lend, and the documents required from overseas.">
<meta property="og:url" content="https://plainlyproperty.com/blog/non-resident-mortgage-dubai/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://plainlyproperty.com/og/blog/non-resident-mortgage-dubai/og.png">
<meta name="twitter:card" content="summary_large_image">
```

Title is 61 characters, meta is 157. Both are inside Google's display
limits. **If you change them, re-check the counts** — a truncated title loses the click, and the
click is the entire point of the wording chosen here.

These tags must be **server-rendered**. Verify with:
```bash
curl -sL https://plainlyproperty.com/blog/non-resident-mortgage-dubai/ | grep -i "<title>"
```
If nothing comes back, the AI search crawlers see nothing either. Fix rendering before writing copy.

---

## 2. Target keywords — measured, do not add to this list

| Keyword | Searches/mo | Click value | Monthly traffic value |
|---|---|---|---|
| `non-resident mortgage dubai` | 140 | AED 19.98 | AED 181 |
| `equity release mortgage dubai` | 30 | AED 43.15 | AED 84 |
| `hsbc dubai non resident mortgage` | 10 | AED 0.00 | AED 0 |
| `dubai islamic bank non resident mortgage` | 10 | AED 0.00 | AED 0 |
| `refinance mortgage dubai` | 10 | AED 0.00 | AED 0 |
| `non resident mortgage dubai requirements` | 10 | AED 0.00 | AED 0 |
| `uk mortgage for expats in dubai` | 10 | AED 0.00 | AED 0 |

**Primary:** `non-resident mortgage dubai`

The primary keyword appears in: the title tag, the `<h1>`, and naturally inside the first 60 words.
It does **not** need to appear at any particular density anywhere else — keyword density is not a
ranking factor and repeating keywords has been shown *not* to raise AI citation rates.

---

## 3. Block structure — build in this order

| Block | What it is | Size | Instruction |
|---|---|---|---|
| **B1** | Answer block | 40-60 words | Direct answer with a number. |
| **B2** | The comparison | table | Options side by side with real figures. |
| **B3** | Detail | prose + subheads | Question-phrased H2s. |
| **B4** | Who this suits / does not | two short lists | Honest disqualification builds trust and converts better. |
| **B5** | FAQ | 4-6 questions | Answer-first. |
| **B6** | Valuation cross-link | one sentence | One only. |

**Page format:** Explainer + bank comparison.
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
- `FAQPage` — **only if** block B5 actually renders on the page, with answer text **copied verbatim** from the visible body

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
