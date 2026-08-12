# Plainly — Launch Kit

**plainlyproperty.com**

Everything needed to build and launch this site. No external context required.

**Read this file, then `08-LAUNCH/pre-launch-checklist.md`. Build in the order given there.**

---

## What this site is

A **13-page information site** for Dubai property owners, operated by an **unlicensed** publisher. Read `07-COMPLIANCE/who-is-the-advertiser.md` before anything else — it governs every page. It publishes valuation
guidance, snagging and handover information, and short-let economics. It does **not** list
properties.

That distinction is legal, not stylistic — see `07-COMPLIANCE/`. A page that lists a property with
a price requires a Trakheesi permit and carries fines from AED 50,000. This site is designed to
stay outside that category permanently.

## What it is built to do

| | |
|---|---|
| Addressable demand | **9,510 searches/month** (measured, de-duplicated) |
| Steady-state traffic | **9,510 impressions/mo · 713 clicks/mo** |
| Steady-state revenue | **AED 10,132–29,243/month** (lead fees, not commission) |
| Single revenue page | `/property-valuation-dubai/` — routed to a licensed partner for a lead fee |

**One page earns the money.** The other twelve exist to bring owners to it. Every page carries
exactly one link into the valuation page. If that link is dropped, the site is a well-ranked blog.

## Two constraints that override everything

1. **Plainly is not licensed and must never claim to be.** No BRN, no ORN, no "RERA-licensed".
   The valuation page routes to a named licensed partner whose ORN is shown attributed to them.
   See `07-COMPLIANCE/who-is-the-advertiser.md`.
2. **No Google Business Profile, no local pack.** Organic search only. No schema asserts a
   physical business location.
3. **No property listings, ever.** Advice, data and tools only.

## Build order

Do not build all thirteen pages first. A solo operator cannot build thirteen pages, run a paid
campaign and answer enquiries within fifteen minutes at the same time.

| Batch | Pages | Why |
|---|---|---|
| **1** | Page 01 only — `/property-valuation-dubai/` | The only page with a revenue path this quarter. Ship it, then advertise against it. |
| **2** | Pages 04, 05, 06 — snagging cluster | Lowest competitor barrier (79 referring domains) and the highest click prices. |
| **3** | The remaining nine | Once the real click-to-enquiry rate is known and briefs can be tuned to it. |

## Folder map

```
00-START-HERE.md            this file
keywords-master.csv         every keyword, volume, click price, page assignment
01-STRATEGY/                the plan and the evidence behind it
02-ARCHITECTURE/            sitemap, robots.txt, llms.txt, URL rules, link map
03-PAGE-SPECS/              one file per page, block by block
04-DESIGN/                  design system, page templates, components
05-SEO-AEO-GEO/             technical gate, on-page standard, schema, AI visibility, DoD
06-CONTENT-PRODUCTION/      research + writing prompts, batch runner
07-COMPLIANCE/              Trakheesi rules and prohibited claims
08-LAUNCH/                  checklist, measurement, 90-day runbook
```

## Where the numbers come from

Search volumes are advertiser data for the UAE, de-duplicated so grouped variants count once.
Competitor barriers are live referring-domain counts. Search-result composition was pulled for
Dubai and cross-checked against a second provider. Nothing here is estimated.

Evidence files are in `01-STRATEGY/evidence/` if you want to verify any figure yourself.

---

## Placeholders to substitute before build

Every one of these appears deliberately. Run a find-and-replace across the whole folder — the
**trading name must be character-identical** in copy, schema and `llms.txt`, because inconsistent
entity descriptions make AI models hedge or omit you.

| Placeholder | Occurrences | Replace with |
|---|---|---|
| `plainlyproperty.com` | 86 | the live domain, no trailing slash |
| `[NEEDS SOURCE]` | 18 | fill from client data |
| `Plainly` | 1 | exact trading name — must be character-identical everywhere |
| `[PHONE]` | 1 | the one number that is always answered |
| `[EMAIL]` | 1 | contact address |

Anything in square brackets inside the page specs and schema templates is a value to fill from real
client data. **Omit a schema property rather than invent a value for it** — a fabricated field is
worse than a missing one.
