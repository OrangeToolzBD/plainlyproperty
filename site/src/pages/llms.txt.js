// Generated rather than hand-maintained, so the entity description here is byte-identical
// to the one in the copy and the Organization schema.
//
// 05-SEO-AEO-GEO/04-ai-visibility-geo.md lever 3: "Inconsistent descriptions across sources
// make models hedge or omit you." A hand-copied llms.txt is exactly how that drift starts.
//
// The same file also says to treat llms.txt as cheap insurance rather than a guaranteed
// lever — engine adoption is still limited.
import { SITE, token, absoluteUrl } from '../lib/site.js';
import { PAGES, pillarOf } from '../lib/pages.js';

export function GET() {
  // Qualified by pillar, so a child page reads as "Snagging — Cost" rather than "Cost".
  // A bare crumb is ambiguous once it is out of the site's own navigation.
  const label = (p) => {
    const pillar = pillarOf(p);
    return pillar ? `${pillar.crumb} — ${p.crumb}` : p.crumb;
  };

  const important = PAGES.filter((p) => p.volume !== null && p.volume > 0)
    .sort((a, b) => b.volume - a.volume)
    .map((p) => `- ${label(p)}: ${absoluteUrl(p.path)}`)
    .join('\n');

  const body = `# ${SITE.name}
> ${SITE.definition}
> It is not a brokerage and does not advertise property.

Contact: ${token(SITE.phone, 'PHONE')} · ${token(SITE.email, 'EMAIL')}

## What this site is
Advice, data and tools for people who already own — or are about to take handover of —
property in Dubai. It does not advertise individual properties.

## Key facts
- Service: property information and guidance; referral to RERA-licensed partners
- Area served: Dubai, United Arab Emirates
- Valuation turnaround: written report within 24 hours
- Licensing: ${SITE.name} holds no RERA registration. Valuations are carried out by a named
  licensed partner whose ORN is displayed attributed to them.

## Important pages
${important}

## Common questions
- How much does snagging cost in Dubai? AED 666–999 for a typical apartment.
- What is the golden visa property threshold? A DLD-certified valuation of AED 2 million or more.
- Do I need a permit to short-let in Dubai? Yes — a holiday home permit from the Department
  of Economy and Tourism, issued per unit.
- What do holiday home operators charge? 15–25% of gross booking revenue.
- How long is the developer defect liability? One year for defects, ten years for structure.

Last reviewed: ${SITE.lastReviewed}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
