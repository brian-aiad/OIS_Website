# SEO Conventions

This file locks in canonical, routing, schema, sitemap, and deployment rules for `originalinsurance.net`.

## Canonical URLs

- Content pages use no trailing slash: `/about`, `/faq`, `/insurance/cerritos`.
- Root is `/`.
- `original-insurance/vercel.json` explicitly redirects trailing-slash sitemap routes to clean canonical paths.
- Do not add global `trailingSlash: false`, global `cleanUrls: true`, a legacy `routes` block, or a catch-all rewrite from `/(.*)` to `/index.html`.

## InsuranceAgency Schema

`InsuranceAgency` uses the canonical ID `https://originalinsurance.net/#agency`.

| Page category | InsuranceAgency | url field |
|---|---:|---|
| Homepage `/` | yes | `https://originalinsurance.net/` |
| City pages `/insurance/*` | yes | city canonical URL |
| Money pages | yes, where mounted | homepage URL unless code intentionally passes a city URL |
| `/faq` | no | n/a |
| `/about` | no | n/a |
| `/contact` | no | n/a |
| `/services` | no | n/a |
| `/privacy` | no | n/a |
| `/accessibility` | no | n/a |

Do not mount `LocalBusinessSchema` on `/faq`, `/about`, `/contact`, or `/services`.

## Unsupported Rich Result Schema

Do not emit `FAQPage`, `Review`, or `AggregateRating` JSON-LD. Google deprecated FAQ rich results and Search Console flags the previous FAQ/review snippet schema as invalid for this site. Keep the visible FAQ content, testimonial content, and review badges, but leave them out of JSON-LD.

The homepage emits a plain `WebSite` identity entity for the Google site name. Do not add `SearchAction`, `potentialAction`, or `{search_term_string}` query templates; the site has no public search feature and those templates previously created junk `?q=` URLs in Search Console.

## Sitemap

`original-insurance/public/sitemap.xml` is authoritative. It must contain canonical URLs only: no query params and no trailing slashes.

The 12 city slugs must stay aligned across sitemap, homepage service areas, and footer links:

```text
downey, norwalk, bellflower, lynwood, cerritos, whittier,
lakewood, paramount, south-gate, pico-rivera, montebello, commerce
```

## Query URLs

- `original-insurance/middleware.js` strips `?q=` with a `308` redirect.
- `original-insurance/public/robots.txt` must keep `Disallow: /*?q=`.
- Do not add Vercel redirects that preserve `?q=` on the same destination path; that caused a production redirect loop previously.
- Do not add a global `/(.*)` rewrite to `/index.html`; prerendered routes need to serve their own route HTML, and unknown URLs need real 404 responses instead of soft 404s.

## Internal Links

All server-rendered anchor URLs must use clean canonical paths without trailing slashes. `npm run seo-lint` checks this.

## Search Intent Ownership

Keep the three Downey entry points distinct so they answer different searches instead of competing with one another:

| Canonical page | Primary intent |
|---|---|
| `/` | Independent insurance broker in Downey; all major coverage lines |
| `/insurance/downey` | Local Downey service-area overview and office relationship |
| `/auto-insurance-downey-ca` | Auto coverage types, California limits, rating factors, and quotes |

City pages should contain useful local service information and disclose that the physical office is in Downey. Do not turn them into near-duplicate doorway pages, stuff exact-match phrases, or add unsupported local statistics, savings, prices, filing times, or superlatives.

## Insurance Information Trust

- Substantive insurance pages include a website update date, primary California consumer resources, and a policy-terms disclaimer through `EditorialTrust`. Do not claim that newly rewritten copy has been reviewed by the business until that review occurs.
- Prefer California Department of Insurance, California DMV, and other first-party regulatory sources for legal or coverage guidance.
- Qualify prices, discounts, eligibility, policy availability, and processing times because they vary by carrier and applicant.
- Do not publish generic monthly price ranges, guaranteed filing/binding times, neighborhood crime or collision assumptions, ZIP-level savings claims, or claims about how a specific local road changes a premium without a current primary source and applicable methodology.
- Insurance eligibility does not establish legal permission to drive. Foreign-license, ITIN, non-driving-owner, and excluded-driver situations must be described as carrier-specific and must defer licensing questions to the California DMV.
- Do not publish a license number, accreditation, membership, award, or carrier relationship unless it has been verified from a current primary source or supplied by the business owner.
- California minimum auto liability limits are 30/60/15 for policies issued or renewed on or after January 1, 2025. Date the fact where context benefits readers.

## Deployment

Deploy manually from repo root:

```bash
bash scripts/deploy.sh
```

The deploy script runs SEO lint, Astro build, schema validation, Vercel build, copies prerendered HTML into `.vercel/output/static/`, deploys prebuilt output, then runs live verification.

Automatic Vercel Git builds are intentionally canceled by `ignoreCommand`. Production must receive the prebuilt output from `scripts/deploy.sh`; this keeps route overrides, middleware, API handling, and the validated static output in the established deployment path.

The Vercel project is `ois-website`. Keep `.vercel/project.json`.

## Commands

Run from `original-insurance/`:

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npm run deploy:check
```

Run from repo root:

```bash
bash scripts/deploy.sh
bash scripts/deploy.sh --dry-run
bash scripts/verify-live.sh
```

## Astro conversion route

`/quote` embeds the existing Quotzal integration. It is intentionally `noindex, follow`, excluded from the 25-URL sitemap, and has no InsuranceAgency or breadcrumb JSON-LD. The five coverage guides additionally emit Service schema for their visible offerings.
