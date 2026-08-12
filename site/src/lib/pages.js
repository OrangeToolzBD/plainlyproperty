// The link graph, in one place — 02-ARCHITECTURE/sitemap-tree.md and
// 02-ARCHITECTURE/internal-linking-map.md.
//
// Header nav, footer, breadcrumbs, sibling links, the sitemap and the build gate all
// read from here, so the graph cannot drift out of step with itself.
//
// Titles and meta descriptions are copied character-for-character from 03-PAGE-SPECS.
// Those files say "exact values, do not rewrite" — the em dashes and en dashes are
// part of the value.

export const VALUATION = '/property-valuation-dubai/';

/** @type {Record<string, {label: string, pillar: string}>} */
export const CLUSTERS = {
  valuation: { label: 'Valuation', pillar: VALUATION },
  snagging: { label: 'Snagging', pillar: '/snagging-dubai/' },
  holiday: { label: 'Holiday homes', pillar: '/holiday-home-management-dubai/' },
  blog: { label: 'Guides', pillar: '/' },
};

export const PAGES = [
  {
    no: 0,
    path: '/',
    role: 'HOME',
    cluster: null,
    nav: null,
    crumb: 'Home',
    title: 'Plainly — Property Guidance for Dubai Owners',
    meta:
      'Independent guidance for Dubai property owners: what snagging costs, how a ' +
      'valuation is produced, and the 15–25% holiday home operators charge.',
    serviceType: 'Property information and guidance',
    volume: null,
  },
  {
    no: 1,
    path: VALUATION,
    role: 'TILL',
    cluster: 'valuation',
    nav: 'Valuation',
    crumb: 'Property valuation',
    title: 'Dubai Property Valuation — Free Written Report in 24 Hours',
    meta:
      'Get a written valuation of your Dubai property in 24 hours, based on Land ' +
      'Department transaction data for your building. Prepared with a RERA-licensed partner.',
    serviceType: 'Property valuation',
    volume: 750,
  },
  {
    no: 2,
    path: '/property-valuation-dubai/golden-visa/',
    role: 'TILL',
    cluster: 'valuation',
    nav: null,
    crumb: 'Golden visa',
    title: 'Golden Visa Property Valuation Dubai — AED 2M Threshold',
    meta:
      'The golden visa route needs a DLD-certified valuation at AED 2 million or more. ' +
      'What counts, what does not, and how the certificate is issued.',
    serviceType: 'Golden visa property valuation',
    volume: 660,
  },
  {
    no: 3,
    path: '/property-valuation-dubai/how-it-works/',
    role: 'SUPPORT',
    cluster: 'valuation',
    nav: null,
    crumb: 'How it works',
    title: 'How Dubai Property Valuation Works — Methods, Cost and Timing',
    meta:
      'Comparable sales, income method and DLD-certified valuation compared side by side, ' +
      'with what each one costs, how long it takes, and when you actually need which.',
    serviceType: 'Property valuation methods',
    volume: 110,
  },
  {
    no: 4,
    path: '/snagging-dubai/',
    role: 'DOOR',
    cluster: 'snagging',
    nav: 'Snagging',
    crumb: 'Snagging',
    title: 'Snagging Company Dubai — Real Costs and Full Checklist',
    meta:
      'Snagging in Dubai costs AED 666–999 for a typical apartment. The full defect ' +
      'checklist, the developer liability window, and what to do with the report you get.',
    serviceType: 'Property snagging information',
    volume: 1920,
  },
  {
    no: 5,
    path: '/snagging-dubai/cost/',
    role: 'DOOR',
    cluster: 'snagging',
    nav: null,
    crumb: 'Cost',
    title: 'Snagging Cost Dubai — Real Prices by Unit Size (2026)',
    meta:
      'What snagging actually costs in Dubai, by unit size, from published rates. Studio ' +
      'to 5-bed villa, plus re-inspection fees most firms do not advertise.',
    serviceType: 'Property snagging costs',
    volume: 50,
  },
  {
    no: 6,
    path: '/snagging-dubai/checklist/',
    role: 'DOOR',
    cluster: 'snagging',
    nav: null,
    crumb: 'Checklist',
    title: 'Dubai Snagging Checklist — 180 Points Checked at Handover',
    meta:
      'The full room-by-room snagging checklist used at Dubai handovers, free to download. ' +
      'Covers MEP, joinery, waterproofing and the defects developers dispute most.',
    serviceType: 'Property snagging checklist',
    volume: 220,
  },
  {
    no: 7,
    path: '/snagging-dubai/developer-defect-liability/',
    role: 'DOOR',
    cluster: 'snagging',
    nav: null,
    crumb: 'Defect liability',
    title: 'Dubai Defect Liability — You Have 12 Months to Claim',
    meta:
      'Developers carry a one-year defect liability and ten years on structure. What is ' +
      'covered, how to claim before it expires, and what happens if you miss it.',
    serviceType: 'Developer defect liability information',
    volume: 0,
  },
  {
    no: 8,
    path: '/handover-dubai/',
    role: 'DOOR',
    cluster: 'snagging',
    nav: 'Handover',
    crumb: 'Handover',
    title: 'Dubai Handover Checklist — Every Step From NOC to Keys',
    meta:
      'The full handover sequence for a Dubai property: developer NOC, snagging, DEWA ' +
      'activation, Ejari, title deed. What to do in which order, and where people get stuck.',
    serviceType: 'Property handover information',
    volume: 0,
  },
  {
    no: 9,
    path: '/holiday-home-management-dubai/',
    role: 'DOOR',
    cluster: 'holiday',
    nav: 'Holiday homes',
    crumb: 'Holiday home management',
    title: 'Holiday Home Management Dubai — What Operators Charge (15–25%)',
    meta:
      'Holiday home operators in Dubai charge 15–25% of gross booking revenue. Compare the ' +
      'fee models, the DET permit you need, and when short-let beats a long-term tenant.',
    serviceType: 'Holiday home management information',
    volume: 200,
  },
  {
    no: 10,
    path: '/holiday-home-management-dubai/short-let-vs-long-let/',
    role: 'DOOR',
    cluster: 'holiday',
    nav: null,
    crumb: 'Short-let vs long-let',
    title: 'Short-Let vs Long-Term Rental Dubai — Real Net Numbers',
    meta:
      'Short-let grosses more and nets less. Occupancy, DET permit, tourism dirham, ' +
      'cleaning and management fees modelled side by side against a standard Ejari tenancy.',
    serviceType: 'Short-let and long-let comparison',
    volume: 3950,
  },
  {
    no: 11,
    path: '/holiday-home-management-dubai/permit/',
    role: 'SUPPORT',
    cluster: 'holiday',
    nav: null,
    crumb: 'DET permit',
    title: 'Dubai Holiday Home Permit — DET Registration Step by Step',
    meta:
      'You cannot legally short-let in Dubai without a DET holiday home permit. The ' +
      'documents, the fees, the renewal cycle and the penalties for operating without one.',
    serviceType: 'Holiday home permit information',
    volume: 10,
  },
  {
    no: 12,
    path: '/blog/mortgage-broker-dubai/',
    role: 'BLOG',
    cluster: 'blog',
    nav: null,
    crumb: 'Dubai mortgage brokers',
    title: 'Dubai Mortgage Brokers — Fees, and When You Do Not Need One',
    meta:
      'Mortgage brokers in Dubai are paid 0.5–1% by the lender, not by you. When that is ' +
      'worth it, when going direct is cheaper, and what expats are quoted.',
    serviceType: 'Mortgage broker information',
    volume: 1170,
  },
  {
    no: 13,
    path: '/blog/non-resident-mortgage-dubai/',
    role: 'BLOG',
    cluster: 'blog',
    nav: null,
    crumb: 'Non-resident mortgages',
    title: 'Non-Resident Mortgage Dubai — LTV Limits and Which Banks Lend',
    meta:
      'Non-residents can borrow in Dubai at lower loan-to-value than residents. The current ' +
      'LTV caps, the banks that lend, and the documents required from overseas.',
    serviceType: 'Non-resident mortgage information',
    volume: 220,
  },
];

/**
 * Pages excluded from sitemap.xml and from the topical link graph. They exist because a
 * working site needs them, not because the kit specced them — see the build notes.
 * /thank-you/ is disallowed in robots.txt.
 */
export const UTILITY_PAGES = ['/privacy/', '/contact/', '/thank-you/'];

export function byPath(path) {
  return PAGES.find((p) => p.path === path);
}

/**
 * Pillar page of a page's cluster, or null for the homepage and for pillars themselves.
 *
 * The blog cluster's pillar is '/' because 02-ARCHITECTURE/sitemap-tree.md gives the two
 * blog pages no pillar of their own and the kit specs no /blog/ index. Home is already the
 * first breadcrumb, so it is not returned again here.
 */
export function pillarOf(page) {
  if (!page.cluster) return null;
  const pillar = CLUSTERS[page.cluster].pillar;
  if (pillar === page.path || pillar === '/') return null;
  return byPath(pillar) ?? null;
}

/** Same cluster, not this page, not the pillar. */
export function siblingsOf(page) {
  if (!page.cluster) return [];
  const pillar = CLUSTERS[page.cluster].pillar;
  return PAGES.filter(
    (p) => p.cluster === page.cluster && p.path !== page.path && p.path !== pillar,
  );
}

/** Direct children of a pillar page. */
export function childrenOf(page) {
  if (!page.cluster || CLUSTERS[page.cluster].pillar !== page.path) return [];
  return PAGES.filter((p) => p.cluster === page.cluster && p.path !== page.path);
}

/** Breadcrumb trail below Home. The last crumb is the page itself. */
export function trailOf(page) {
  if (page.path === '/') return [];
  const pillar = pillarOf(page);
  const trail = pillar ? [{ name: pillar.crumb, path: pillar.path }] : [];
  trail.push({ name: page.crumb, path: page.path });
  return trail;
}

/** Header nav — 04-DESIGN/02-page-templates.md caps it at four items. */
export const NAV = PAGES.filter((p) => p.nav);
