# GEO — getting cited inside AI answers

SEO gets you into the ranked list. AEO makes you the extracted answer. **GEO gets you cited inside
ChatGPT, Perplexity, Gemini and Claude answers** — and the most common failure in 2026 is a site
with good SEO and no AI visibility at all.

## The four levers, in order of measured impact

1. **Crawler eligibility.** See `02-ARCHITECTURE/robots.txt`. The AI *search* bots must be allowed.
   Blocking `OAI-SearchBot`, `Claude-SearchBot` or `PerplexityBot` removes the site from that
   engine's answers entirely. The *training* bots are a separate decision and do not affect search
   visibility — never conflate them.

2. **Fact density.** One sourced statistic every 150–200 words. Roughly **+41%** measured, and
   **~+115%** for pages starting around position 5. This is the highest-leverage editorial change
   available and it costs nothing but discipline.

3. **Entity clarity.** One canonical definition sentence, reused character-identical in the copy,
   the schema and `llms.txt`:

   > *"Plainly is an independent information resource for Dubai property owners, publishing valuation,
   > handover and short-let guidance."*

   Inconsistent descriptions across sources make models hedge or omit you.

4. **Third-party corroboration.** Models are biased toward independent coverage over your own
   pages. A mention in a Dubai property publication or an industry directory outweighs anything
   written on the site itself. This is earned, ongoing work — not a launch task.

## `llms.txt`

Published at `https://plainlyproperty.com/llms.txt` — see `02-ARCHITECTURE/llms.txt`. Engine adoption is still
limited; treat it as cheap insurance rather than a guaranteed lever, and do not let it displace
items 1–3.

## Measuring it — visibility is a distribution, not a yes/no

AI answers vary run to run. Testing published in 2026 ("Don't Measure Once") showed citation
volume varying by more than 600× between engines, and materially between runs on the same engine.

**So:** take the eight questions this site answers, run each **five times per engine**, on ChatGPT,
Perplexity, Gemini and Claude separately, and record a **citation rate** — "cited in 3 of 5 runs on
Perplexity", never "we rank in AI". Log a dated baseline before launch so there is something to
compare against.

Monthly for the citation check, quarterly for a full audit. A single bad reading is weather; a
sustained shift after an update is climate.

## GA4 — make AI referrals visible

Create a custom channel group matching referrer against:

```
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com
```

Without this, AI-referred visits land in Direct or Referral and the whole channel is invisible in
reporting.
