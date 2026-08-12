# JSON-LD templates

**Two hard rules.** Schema must match the visible text exactly — no marking up content that is not
on the page. And every bracketed value comes from real data; omit a property rather than invent it.
Validate every page in Google's Rich Results Test before it ships.

## Why never `LocalBusiness`

`LocalBusiness` asserts premises at a location, with hours and a service radius. This site runs no
map listing, and the pages are advisory rather than premises-based. Using it here would assert a
storefront that does not exist as described. Use **`Organization` + `Service`** instead.

## The site-wide graph — one block, referenced by `@id`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://plainlyproperty.com/#org",
      "name": "Plainly",
      "url": "https://plainlyproperty.com/",
      "logo": "https://plainlyproperty.com/logo.png",
      "telephone": "[+971-X-XXX-XXXX]",
      "areaServed": { "@type": "City", "name": "Dubai" },
      "identifier": [
      ],
      "sameAs": ["[LinkedIn]", "[Instagram]"]
    },
    {
      "@type": "WebSite",
      "@id": "https://plainlyproperty.com/#site",
      "url": "https://plainlyproperty.com/",
      "publisher": { "@id": "https://plainlyproperty.com/#org" }
    }
  ]
}
```

## Per page — Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Property valuation]",
  "provider": { "@id": "https://plainlyproperty.com/#org" },
  "areaServed": { "@type": "City", "name": "Dubai" },
  "description": "[The page's answer-block text, verbatim]"
}
```

`Service` carries **no** `address` property. Do not add one.

## Per page — BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plainlyproperty.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Pillar]", "item": "https://plainlyproperty.com/[pillar]/" },
    { "@type": "ListItem", "position": 3, "name": "[This page]" }
  ]
}
```

## Per page — FAQPage

Only where a real, visible FAQ renders. Answer text copied **verbatim** from the page body — if the
copy is edited, the schema is edited in the same commit.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question exactly as it appears on the page]",
      "acceptedAnswer": { "@type": "Answer", "text": "[The visible answer, verbatim]" }
    }
  ]
}
```

## Never ship

- `LocalBusiness` / `RealEstateAgent` with an address — see above.
- `aggregateRating` without real, displayed reviews.
- `Offer` with `"price": "Contact us"` — a price node with no number is worse than no price node.
- `Product` schema on a property. That is a listing, and a listing needs a Trakheesi permit.
