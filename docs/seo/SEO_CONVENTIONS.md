# SEO Conventions

This file locks in canonical, routing, schema, sitemap, and deployment rules for `originalinsurance.net`.

## Canonical URLs

- Content pages use no trailing slash: `/about`, `/faq`, `/insurance/cerritos`.
- Root is `/`.
- `original-insurance/vercel.json` explicitly redirects trailing-slash sitemap routes to clean canonical paths.
- Do not add global `trailingSlash: false`, global `cleanUrls: true`, or a legacy `routes` block.

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

Do not mount `LocalBusinessSchema` on `/faq`, `/about`, `/contact`, or `/services`.

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

## Internal Links

All React `<Link>` and `<NavLink>` values must use clean canonical paths without trailing slashes. `npm run seo-lint` checks this.

## Deployment

Deploy manually from repo root:

```bash
bash scripts/deploy.sh
```

The deploy script runs SEO lint, build/prerender, schema validation, Vercel build, copies prerendered HTML into `.vercel/output/static/`, deploys prebuilt output, then runs live verification.

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
