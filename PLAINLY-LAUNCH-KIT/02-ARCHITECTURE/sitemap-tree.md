# URL tree

Thirteen pages. Flat and shallow by design — every page is two clicks from the homepage, which is
what a small site should do. Do not add depth to look bigger.

```
/                                          homepage
/blog/mortgage-broker-dubai/                          1,170/mo
/blog/non-resident-mortgage-dubai/                    220/mo
/handover-dubai/                                      support page
/holiday-home-management-dubai/                       200/mo
/holiday-home-management-dubai/permit/                10/mo
/holiday-home-management-dubai/short-let-vs-long-let/  3,950/mo
/property-valuation-dubai/                            750/mo
/property-valuation-dubai/golden-visa/                660/mo
/property-valuation-dubai/how-it-works/               110/mo
/snagging-dubai/                                      1,920/mo
/snagging-dubai/checklist/                            220/mo
/snagging-dubai/cost/                                 50/mo
/snagging-dubai/developer-defect-liability/           support page
```

## The cluster model

Three topic clusters, each with a pillar page linking down to its children, children linking back
up, and siblings linking across. This is what builds topical authority — it is free and entirely
under your control.

```
PILLAR  /property-valuation-dubai/          <- the till. Everything links here.
        |-- /property-valuation-dubai/golden-visa/
        |-- /property-valuation-dubai/how-it-works/

PILLAR  /snagging-dubai/                    <- the door. Cheapest traffic on the board.
        |-- /snagging-dubai/cost/
        |-- /snagging-dubai/checklist/
        |-- /snagging-dubai/developer-defect-liability/
        |-- /handover-dubai/                (sibling, same intent)

PILLAR  /holiday-home-management-dubai/     <- the second door.
        |-- /holiday-home-management-dubai/short-let-vs-long-let/
        |-- /holiday-home-management-dubai/permit/

BLOG    /blog/mortgage-broker-dubai/
        /blog/non-resident-mortgage-dubai/
```

## URL rules

- Lowercase, hyphenated, no dates, no IDs, no trailing index files.
- Trailing slash on every URL. Redirect the non-slash version 301.
- Never change a URL after launch. If you must, 301 the old one and keep it forever.
- No parameters on indexable pages. Filters and sorts get `noindex` or are blocked in robots.txt.
