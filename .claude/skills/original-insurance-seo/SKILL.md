---
name: original-insurance-seo
description: SEO methodology for originalinsurance.net, a React/Vite prerendered SPA deployed on Vercel for Original Insurance Services in Downey, CA.
---

# Original Insurance SEO Skill

Use this skill for schema markup, sitemap edits, canonical tags, city landing pages, FAQ pages, Google Search Console issues, indexing problems, routing rules, or any change that affects crawling/ranking.

## Site Context

- URL: `https://originalinsurance.net`
- Stack: React 19 + Vite 7 + TypeScript + Tailwind
- App directory: `original-insurance/`
- Dev server: `http://localhost:3002`
- Deploy command: `bash scripts/deploy.sh` from repo root

## Build Model

This is a prerendered SPA. `npm run build` runs:

```bash
tsc -b
vite build
node scripts/prerender.mjs
```

The prerender script uses Playwright to visit all 22 routes and save rendered HTML under `dist/`.

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
- `robots.txt` must keep `Disallow: /*?q=`.
- Do not add global `trailingSlash: false`, global `cleanUrls: true`, a legacy Vercel `routes` block, or a catch-all rewrite from `/(.*)` to `/index.html`.

## Schema Rules

- `LocalBusinessSchema`: homepage, city pages, and money pages where explicitly mounted.
- Do not mount `LocalBusinessSchema` on `/faq`, `/about`, `/contact`, `/services`, `/privacy`, or `/accessibility`.
- Do not emit `FAQPage`, `Review`, or `AggregateRating` JSON-LD. FAQ/review content can remain visible on the page, but unsupported rich-result schema must stay out of prerendered HTML.
- Every prerendered route needs exactly one self-referencing canonical.

## Route Map

```text
/                                  src/pages/Home.tsx
/about                             src/pages/About.tsx
/services                          src/pages/Services.tsx
/locations                         src/pages/Locations.tsx
/contact                           src/pages/Contact.tsx
/faq                               src/pages/Faq.tsx
/privacy                           src/pages/Privacy.tsx
/accessibility                     src/pages/Accessibility.tsx
/auto-insurance-downey-ca          src/pages/AutoInsuranceDowneyCA.tsx
/sr22-insurance-downey             src/pages/SR22InsuranceDowney.tsx
/no-license-auto-insurance-downey  src/pages/NoLicenseInsuranceDowney.tsx
/commercial-auto-insurance-downey  src/pages/CommercialAutoInsuranceDowney.tsx
/insurance/downey                  src/pages/CityLanding.tsx
/insurance/norwalk                 src/pages/insurance/Norwalk.tsx
/insurance/bellflower              src/pages/insurance/Bellflower.tsx
/insurance/lynwood                 src/pages/insurance/Lynwood.tsx
/insurance/cerritos                src/pages/insurance/Cerritos.tsx
/insurance/lakewood                src/pages/insurance/Lakewood.tsx
/insurance/paramount               src/pages/insurance/Paramount.tsx
/insurance/south-gate              src/pages/insurance/SouthGate.tsx
/insurance/whittier                src/pages/insurance/Whittier.tsx
/insurance/pico-rivera             src/pages/insurance/PicoRivera.tsx
/insurance/montebello              src/pages/insurance/Montebello.tsx
/insurance/commerce                src/pages/insurance/Commerce.tsx
```

## Current Docs

- `docs/AI_WORKFLOW.md`
- `docs/seo/SEO_CONVENTIONS.md`
- `docs/handoffs/HANDOFF_CLAUDE_2026-05-26.md`
