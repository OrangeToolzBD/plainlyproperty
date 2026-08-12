# Page 12 — `/blog/mortgage-broker-dubai/`

**Role:** BLOG · **Build batch:** 3 · **Research depth:** MEDIUM
**Measured demand:** 1,170 searches/month · **traffic value** AED 3,600/month

---

## 1. Head tags — exact values, do not rewrite

```html
<title>Dubai Mortgage Brokers — Fees, and When You Do Not Need One</title>
<meta name="description" content="Mortgage brokers in Dubai are paid 0.5–1% by the lender, not by you. When that is worth it, when going direct is cheaper, and what expats are quoted.">
<link rel="canonical" href="https://plainlyproperty.com/blog/mortgage-broker-dubai/">
<meta property="og:title" content="Dubai Mortgage Brokers — Fees, and When You Do Not Need One">
<meta property="og:description" content="Mortgage brokers in Dubai are paid 0.5–1% by the lender, not by you. When that is worth it, when going direct is cheaper, and what expats are quoted.">
<meta property="og:url" content="https://plainlyproperty.com/blog/mortgage-broker-dubai/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://plainlyproperty.com/og/blog/mortgage-broker-dubai/og.png">
<meta name="twitter:card" content="summary_large_image">
```

Title is 59 characters, meta is 149. Both are inside Google's display
limits. **If you change them, re-check the counts** — a truncated title loses the click, and the
click is the entire point of the wording chosen here.

These tags must be **server-rendered**. Verify with:
```bash
curl -sL https://plainlyproperty.com/blog/mortgage-broker-dubai/ | grep -i "<title>"
```
If nothing comes back, the AI search crawlers see nothing either. Fix rendering before writing copy.

---

## 2. Target keywords — measured, do not add to this list

| Keyword | Searches/mo | Click value | Monthly traffic value |
|---|---|---|---|
| `dubai mortgage broker` | 480 | AED 50.94 | AED 1,589 |
| `mortgage advisor dubai` | 480 | AED 50.94 | AED 1,589 |
| `mortgage consultant dubai` | 70 | AED 30.33 | AED 138 |
| `best mortgage broker in dubai` | 40 | AED 74.77 | AED 194 |
| `top mortgage brokers in dubai` | 30 | AED 22.40 | AED 43 |
| `mortgage broker license dubai` | 10 | AED 65.85 | AED 42 |
| `huspy mortgage broker dubai` | 10 | AED 4.00 | AED 2 |
| `list of mortgage brokers in dubai` | 10 | AED 0.00 | AED 0 |
| `lion mortgage consultants dubai` | 10 | AED 0.00 | AED 0 |
| `expert mortgage broker dubai` | 10 | AED 0.00 | AED 0 |
| `mortgage advisor dubai salary` | 10 | AED 0.00 | AED 0 |
| `senior mortgage advisor salary dubai` | 10 | AED 0.00 | AED 0 |

**Primary:** `dubai mortgage broker`

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

**Page format:** Explainer + referral.
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
