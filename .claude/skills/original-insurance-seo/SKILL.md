---
name: original-insurance-seo
description: SEO methodology for originalinsurance.net, an Astro static website deployed on Vercel for Original Insurance Services in Downey, CA.
---

# Original Insurance SEO Skill

Use this skill for schema markup, sitemap edits, canonical tags, city landing pages, FAQ pages, Google Search Console issues, indexing problems, routing rules, or any change that affects crawling/ranking.

## Site Context

- URL: `https://originalinsurance.net`
- Stack: Astro 7.3.5 + TypeScript + native CSS
- App directory: `original-insurance/`
- Dev server: `http://localhost:3002`
- Deploy command: `bash scripts/deploy.sh` from repo root

## Build Model

This is a static Astro site. `npm run build` runs:

```bash
astro check
astro build
```

Astro emits HTML for all 25 canonical routes plus `/quote` (noindex) and `404.html`. Playwright is used for browser QA, not rendering production content. The authoritative route inventory is `src/data/pages.json`; shared metadata and JSON-LD live in `src/layouts/Base.astro`.

## Required Checks

Run from `original-insurance/`:

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
```

## Routing Rules

- Canonical URLs do not use trailing slashes.
- `vercel.json` explicitly redirects trailing-slash sitemap routes to clean canonical paths.
- `/index.html` redirects to `/`.
- `/SITEMAP.XML` redirects to `/sitemap.xml`.
- `/cdn-cgi/l/email-protection` rewrites to `/api/gone`, which returns `410`.
- `middleware.js` strips `?q=` query params with a `308` redirect.
- Homepage `WebSite` schema must not include `SearchAction`, `potentialAction`, or `{search_term_string}` query templates.
- `robots.txt` must keep `Disallow: /*?q=`.
- Do not add global `trailingSlash: false`, global `cleanUrls: true`, a legacy Vercel `routes` block, or a catch-all rewrite from `/(.*)` to `/index.html`.
- Keep automatic Vercel Git builds disabled with `ignoreCommand`. Deploy only the validated prebuilt output produced by `scripts/deploy.sh`.

## Schema Rules

- `LocalBusinessSchema`: homepage, city pages, and money pages where explicitly mounted.
- Do not mount `LocalBusinessSchema` on `/faq`, `/about`, `/contact`, `/services`, `/privacy`, or `/accessibility`.
- Do not emit `FAQPage`, `Review`, or `AggregateRating` JSON-LD. FAQ/review content can remain visible on the page, but unsupported rich-result schema must stay out of prerendered HTML.
- Every prerendered route needs exactly one self-referencing canonical.

## Route Map

All25 canonical paths are retained in `src/data/pages.json`. The homepage uses `src/pages/index.astro`; `src/pages/[...path].astro` generates the remaining24 through the corresponding page-family components. `/quote` is a noindex conversion utility; `src/pages/404.astro` supplies the real404.

- `/`
- `/services`
- `/locations`
- `/about`
- `/contact`
- `/faq`
- `/privacy`
- `/accessibility`
- `/auto-insurance-downey-ca`
- `/sr22-insurance-downey`
- `/home-insurance-downey-ca`
- `/no-license-auto-insurance-downey`
- `/commercial-auto-insurance-downey`
- `/insurance/downey`
- `/insurance/norwalk`
- `/insurance/bellflower`
- `/insurance/lynwood`
- `/insurance/cerritos`
- `/insurance/whittier`
- `/insurance/lakewood`
- `/insurance/paramount`
- `/insurance/south-gate`
- `/insurance/pico-rivera`
- `/insurance/montebello`
- `/insurance/commerce`

## Current Docs

- `docs/AI_WORKFLOW.md`
- `docs/seo/SEO_CONVENTIONS.md`
- `docs/handoffs/HANDOFF_CLAUDE_2026-05-26.md`
