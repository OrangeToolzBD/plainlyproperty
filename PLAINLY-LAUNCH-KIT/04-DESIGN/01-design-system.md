# Design system

The design job here is **credibility, not decoration**. The reader is an owner deciding whether to
trust a broker with an asset worth AED 1.3–3.5 million, and the source research found distrust of
agents to be the dominant emotional register in this market. Every design decision below serves
legibility and trust over visual ambition.

## Tokens

```css
:root{
  /* ink */
  --ink:      #0d1b2a;   /* body text */
  --ink-2:    #33475b;   /* secondary text */
  --muted:    #61748c;   /* captions, meta */

  /* surface */
  --bg:       #ffffff;
  --bg-2:     #f5f8fc;   /* table stripes, cards */
  --bg-3:     #eaf1fa;   /* hover, code */
  --line:     #dfe6ef;

  /* brand — replace the blue with the client's, keep the contrast ratios */
  --brand:    #0b5fd0;
  --brand-2:  #e7f0fd;

  /* semantic */
  --ok:       #0f7a55;   --ok-bg:   #e3f6ee;
  --warn:     #a8620a;   --warn-bg: #fdf1de;
  --bad:      #b8202e;   --bad-bg:  #fdeaec;

  --radius:   14px;
  --maxw:     1100px;
  --prose:    68ch;      /* hard cap on line length */
}
```

## Type scale

| Element | Size / line-height | Weight |
|---|---|---|
| Body | 17px / 1.72 | 400 |
| H1 | 44px / 1.10, -0.028em | 800 |
| H2 | 30px / 1.20 | 750 |
| H3 | 20px / 1.35 | 700 |
| Answer block | 19px / 1.65 | 400 |
| Table | 15px / 1.5 | 400 |
| Caption / source | 13.5px | 400, `--muted` |

System font stack. No webfont — a webfont costs LCP and buys nothing here.

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

## Non-negotiables

1. **Prose never exceeds 68 characters per line.** Wider is measurably harder to read and this
   site's entire proposition is that it is easier to understand than the alternatives.
2. **No carousel, no hero slider, no video background, no parallax, no scroll-jacking.** Each costs
   LCP or CLS, and Core Web Vitals are a confirmed ranking signal.
3. **No modal on entry.** Intrusive interstitials are an explicit Google demotion.
4. **Tables are real `<table>` elements.** They get reproduced near-verbatim inside AI answers —
   a table built from divs is invisible to that.
5. **Every image has explicit `width` and `height`** to prevent layout shift, is AVIF or WebP, and
   carries descriptive `alt` text. Never `alt="dubai property valuation cheap"` — alt text is an
   accessibility obligation before it is anything else, and keyword-stuffed alt was the
   worst-performing tactic measured in the KDD-2024 study.
6. **Contrast ratio 4.5:1 minimum** on body text.

## What the page must NOT look like

The incumbents in this market all look the same: stock photo of the Burj, gold accents, a slogan,
and pricing hidden behind "Contact Us". Matching that look forfeits the only advantage this site
has. **Publish the numbers, in a plain table, above the fold.**
