# Per-page definition of done

Copy this into the ticket for every page. A page failing any line comes back.

## Rendering
- [ ] Body text present in raw HTML — `curl -sL <url> | grep "<h1"` returns content
- [ ] `<title>`, meta description, canonical present in raw HTML
- [ ] JSON-LD present in raw HTML
- [ ] FAQ content in the DOM regardless of accordion state

## Head
- [ ] `<title>` unique, ≤62 chars, exactly as specified in the page spec
- [ ] Meta description unique, 140–165 chars, contains a number
- [ ] One self-referencing canonical
- [ ] Open Graph + Twitter card, with a 1200×630 image
- [ ] Not `noindex`. No `nosnippet` or `data-nosnippet` on answer content

## Structure
- [ ] Exactly one `<h1>`
- [ ] H2 → H3, no skipped levels
- [ ] Most H2s phrased as real questions
- [ ] Answer block is 40–60 words and stands alone when quoted
- [ ] Prose 900–1,300 words, lines capped at 68 characters

## Substance
- [ ] 6–8 sourced figures — one per 150–200 words
- [ ] Every figure traces to the research pack
- [ ] Zero `[NEEDS SOURCE]` markers remaining (build must fail if any survive)
- [ ] Every table is a real `<table>` with a source line beneath it
- [ ] Any regulation quoted verbatim with its article number and authority
- [ ] Real FAQ, answer-first leads
- [ ] Visible last-reviewed date, and it is true

## Schema
- [ ] `Organization` + `Service` + `BreadcrumbList` present
- [ ] `FAQPage` only if a visible FAQ renders, answers verbatim
- [ ] **No `LocalBusiness`, no address, no price node without a number**
- [ ] Passes Google's Rich Results Test

## Links
- [ ] Descriptive anchors — no "click here"
- [ ] Links up to its pillar and across to a sibling
- [ ] **Exactly one** link to `/property-valuation-dubai/`, late, phrased as a question
- [ ] Not orphaned — at least one page links to it
- [ ] Outbound citations to DLD / RERA / DET / statute where facts came from

## Compliance
- [ ] No specific property named with a price, unit number or address
- [ ] No projected return, yield promise or appreciation claim
- [ ] No "cheapest", "best" or "number one"
- [ ] No licence number is claimed for Plainly; any partner ORN is attributed to the partner

## Performance
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Images AVIF/WebP with explicit width and height
- [ ] Descriptive alt text — never keyword-stuffed
- [ ] Listed in sitemap.xml
