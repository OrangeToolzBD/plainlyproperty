# Page templates — block by block

Three templates cover all thirteen pages. Build the components once.

---

## Template A — TILL (the valuation page)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER    logo · nav (4 items max) · phone number visible  │  server-rendered
├─────────────────────────────────────────────────────────────┤
│  H1                                                          │
│  B1  ANSWER BLOCK — 40–60 words, 19px, no image above it    │  ← AI quotes this
├─────────────────────────────────────────────────────────────┤
│  B2  THE TOOL                                                │
│      ┌───────────┬───────────┬───────────┐                  │
│      │ community │   type    │   size    │  → [ Get range ] │
│      └───────────┴───────────┴───────────┘                  │
│      Result appears INLINE. No email wall before the number. │
├─────────────────────────────────────────────────────────────┤
│  B3  WHAT THE REPORT CONTAINS — 6-item list, 2 columns      │
├─────────────────────────────────────────────────────────────┤
│  B4  HOW VALUATION IS PRODUCED — real <table>, 3 methods    │  ← AI reproduces this
├─────────────────────────────────────────────────────────────┤
│  B5  PARTNER CARD — licensed partner + THEIR ORN           │  attributed, not claimed
├─────────────────────────────────────────────────────────────┤
│  B6  FAQ — <details>/<summary>, all OPEN by default          │  ← FAQPage schema
├─────────────────────────────────────────────────────────────┤
│  B7  REQUEST FORM — 4 fields, phone required                 │
├─────────────────────────────────────────────────────────────┤
│  FOOTER   licence line · links · last-reviewed date          │
└─────────────────────────────────────────────────────────────┘
```

**FAQ accordions must render open, or their content must be in the DOM regardless of state.**
An accordion that injects content on click hides it from crawlers that do not run JavaScript.

---

## Template B — DOOR (snagging, holiday-home, handover)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│  H1                                                          │
│  B1  ANSWER BLOCK — with the price or deadline in it         │
├─────────────────────────────────────────────────────────────┤
│  B2  THE NUMBER TABLE — real <table>, sourced + dated        │  ← the reason to rank
│      | Item | Figure | Source | Checked |                    │
├─────────────────────────────────────────────────────────────┤
│  B3  WHAT IT COVERS — list or numbered steps                 │
├─────────────────────────────────────────────────────────────┤
│  B4  THE RULE — <blockquote>, verbatim + article number      │
├─────────────────────────────────────────────────────────────┤
│  B5  WHAT PEOPLE GET WRONG — short, one counter-example      │  ← earns links
├─────────────────────────────────────────────────────────────┤
│  B6  FAQ                                                     │
├─────────────────────────────────────────────────────────────┤
│  B7  one sentence → /property-valuation-dubai/               │  ← the only CTA
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Template C — SUPPORT / BLOG

Same as Template B minus B5, with B2 as a comparison table rather than a price table.

---

## Components to build once

| Component | Notes |
|---|---|
| `AnswerBlock` | 19px, max 60 words, no image sibling above it |
| `DataTable` | real `<table>`, striped, horizontally scrollable in its own container |
| `SourceLine` | 13.5px muted — "Source: [authority], checked [date]" under every table |
| `RuleQuote` | `<blockquote>` + citation line |
| `PartnerCard` | the licensed partner's name and ORN, attributed to them, plus a line stating Plainly is not a brokerage |
| `FaqList` | `<details open>` — content in DOM regardless of state |
| `ValuationCrossLink` | one sentence, inline, never a banner |
| `NeedsSource` | renders `[NEEDS SOURCE]` visibly in staging, blocks build in production |

That last one matters: **a `[NEEDS SOURCE]` marker must fail the production build**, not silently
ship. It is the mechanism that stops an unsourced figure reaching a live page.
