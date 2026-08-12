// JSON-LD builders — 05-SEO-AEO-GEO/03-schema-templates.md.
//
// Two hard rules from that file:
//   1. Schema must match the visible text exactly. Nothing is marked up that is not
//      rendered on the page.
//   2. Every value comes from real data. Omit a property rather than invent one.
//
// Never LocalBusiness or RealEstateAgent: this site asserts no premises and runs no map
// listing, so Organization + Service is the honest pair. Service carries no `address`.

import { SITE, absoluteUrl } from './site.js';

const ORG_ID = `${SITE.origin}/#org`;
const SITE_ID = `${SITE.origin}/#site`;

/** Drop keys whose value is null, undefined or an empty array. */
function compact(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  );
}

/**
 * The site-wide graph, emitted once per page and referenced by @id from the
 * per-page nodes.
 *
 * `identifier` is deliberately absent. The kit template carries an empty array where
 * BRN/ORN used to sit; 07-COMPLIANCE/who-is-the-advertiser.md:17 says those were
 * "deleted, not emptied", and an empty identifier node asserts nothing while looking
 * like it should. Same reasoning for telephone and sameAs while they are pending.
 */
export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      compact({
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE.name,
        description: SITE.definition,
        url: `${SITE.origin}/`,
        logo: absoluteUrl('/logo.svg'),
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: { '@type': 'City', name: 'Dubai' },
      }),
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: `${SITE.origin}/`,
        name: SITE.name,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

/**
 * @param {string} serviceType  matches this page's subject
 * @param {string} description  the page's answer-block text, verbatim
 */
export function serviceSchema(serviceType, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Dubai' },
    description,
  };
}

/**
 * @param {{name: string, path?: string}[]} trail  Home is prepended automatically.
 *   The final crumb carries no `item`, per the template.
 */
export function breadcrumbSchema(trail) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) =>
      compact({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: i === items.length - 1 ? null : absoluteUrl(crumb.path),
      }),
    ),
  };
}

/**
 * Only call this where a real, visible FAQ renders. Answer text must be the visible
 * answer verbatim — if the copy is edited, this is edited in the same commit.
 *
 * @param {{q: string, a: string}[]} faqs
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
