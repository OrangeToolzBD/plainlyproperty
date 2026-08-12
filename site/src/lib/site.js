// Single source of truth for every value that appears in copy, schema and llms.txt.
//
// 00-START-HERE.md: "the trading name must be character-identical in copy, schema and
// llms.txt, because inconsistent entity descriptions make AI models hedge or omit you."
// Nothing here may be re-typed at a call site. Import it.

/**
 * Values still awaiting real client data.
 *
 * A `null` renders as a visible [TOKEN] marker in staging and fails the production
 * build via scripts/gate.mjs. 07-COMPLIANCE/who-is-the-advertiser.md:17 — "A blank
 * licence field is worse than no field." So a missing PARTNER_ORN does not render an
 * empty string; it renders a marker loud enough that nobody ships past it.
 */
const PENDING = null;

export const SITE = {
  origin: 'https://plainlyproperty.com',

  // Character-identical everywhere. Changing this changes the schema and llms.txt too.
  name: 'Plainly',

  // The canonical definition sentence. 05-SEO-AEO-GEO/04-ai-visibility-geo.md lever 3:
  // reused verbatim in the copy, the Organization schema and llms.txt.
  definition:
    'Plainly is an independent information resource for Dubai property owners, ' +
    'publishing valuation, handover and short-let guidance.',

  phone: PENDING,
  email: PENDING,

  // The RERA-licensed partner who actually performs valuations. Plainly holds no licence
  // and never claims one — see 07-COMPLIANCE/who-is-the-advertiser.md.
  partner: {
    name: PENDING,
    orn: PENDING,
    registerUrl: 'https://dubailand.gov.ae/',
  },

  // Real named author on every page. YMYL content requires it
  // (05-SEO-AEO-GEO/02-onpage-standard.md).
  author: PENDING,

  // Where the valuation form POSTs. The kit specifies the form and the 15-minute callback
  // rule that depends on it, but no endpoint. Until this is set the form renders disabled
  // rather than silently dropping an enquiry — 08-LAUNCH/03-90-day-runbook.md:48 calls the
  // callback "the one thing that must not slip".
  formEndpoint: PENDING,

  // Drives the visible "Last reviewed" line and must be true. Bump it when a page is
  // genuinely re-checked, not on every deploy.
  lastReviewed: '2026-08-12',
};

/** The verbatim disclosure line from 07-COMPLIANCE/who-is-the-advertiser.md:38. */
export function disclosureLine() {
  return (
    'Plainly is an information service and is not a licensed property brokerage. ' +
    `Valuations and sales are carried out by ${token(SITE.partner.name, 'PARTNER NAME')}, ` +
    `ORN ${token(SITE.partner.orn, 'PARTNER ORN')}, registered with the Dubai Land Department.`
  );
}

/**
 * Render a pending value as a marker the build gate can find.
 * Returns the real value untouched once it is supplied.
 */
export function token(value, label) {
  return value ?? `[${label}]`;
}

export function absoluteUrl(path) {
  return SITE.origin + path;
}
