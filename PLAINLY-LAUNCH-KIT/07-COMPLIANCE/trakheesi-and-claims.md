# Compliance — read before writing a word

Two rules govern everything on this site. Both are hard stops, not preferences.

---

## 1. This site must never advertise a property

In Dubai, advertising property is a **licensed activity**. Every property advertisement requires a
**Trakheesi permit** obtained through the Dubai Land Department, and the advertisement must display
the permit number together with the broker's **BRN** and the firm's **ORN**. Fines start at
**AED 50,000** on a progressive scale, with broker-card suspension of not less than three months as
an additional sanction. The DLD publishes enforcement rounds naming offenders.

### The line

| Allowed — this site | Not allowed — needs a Trakheesi permit |
|---|---|
| "Apartments in Dubai Marina transacted between AED 1.1M and 1.9M in Q2 2026" (aggregate, sourced) | "2-bed in Marina Gate 2, AED 1.85M" |
| "Snagging costs AED 666–999 for a typical apartment" | Any unit with an asking price |
| "Service charges in JVC average AED X per sq ft" | A named building offered for sale or rent |
| A valuation tool returning an indicative range | A listing gallery, a "featured properties" block |
| "Request a written valuation of your property" | "View our listings" |

**The moment a page names a specific property with a price, a unit number or an address, it changes
legal category.** There is no grey area and no "just one listing to test it".

### Practical controls

- Add a build-time check that fails on any page containing a currency figure within 200 characters
  of a building name from a Dubai tower list.
- Plainly claims no licence number. Where a licensed partner is named, their ORN is shown attributed to them, with a line stating Plainly is an information service and not the advertiser of record.
- If the client later wants listings, they go on a **separate** property with its own permits — not
  by adding a section here.

---

## 2. Never promise a return

No projected yields. No "expect 8%". No "prices are set to rise". No guaranteed rental income.

Three reasons, any one of which is sufficient:

1. **It cannot be substantiated**, which makes it a misleading advertising claim.
2. **DLD advertising rules bite hardest** on exactly this kind of claim.
3. **It is currently wrong.** H1 2026 residential transactions fell **13.6%** year on year, and Q2
   2026 saw both prices and rents decline. Publishing an appreciation promise into a softening
   market is a client complaint waiting to happen.

### Allowed instead

- Historic, sourced, dated: *"Gross residential yields in JVC were published at 8.5–9.5% for 2025
  by [named source]."* — a fact with an owner and a date, not a forecast.
- Ranges with the mechanism explained: *"Short-let gross is higher; net depends on occupancy,
  the DET permit, tourism dirham and management fees."*

---

## 3. Prohibited phrasing — add these to a CI grep

```
guaranteed          projected return      expect \d+%        ROI of
will rise           set to increase       cheapest           best in dubai
number one          #1                    risk-free          assured returns
```

Any hit fails the build. This is cheaper than a retraction.

---

## 4. Data protection

The valuation form collects an owner's name, phone and property details **before** any engagement
exists. Handle it as client data from the moment it arrives: stated retention period, a named
controller, and no onward sharing without consent. The UAE has a federal data protection law —
have the client's counsel confirm the privacy notice before the form goes live.
