---
name: original-insurance-seo
description: SEO methodology for originalinsurance.net — a React/Vite SPA deployed on Vercel for an independent insurance broker in Downey, CA. Use this skill whenever working on ANY SEO task for this site including schema markup, sitemap updates, meta tags, city landing pages, FAQ pages, canonical tags, structured data, Google Search Console issues, indexing problems, rich results, or any change that affects how Google crawls or ranks the site.
---

# Original Insurance SEO Skill

## Site Context
- **URL**: https://originalinsurance.net
- **Stack**: React 19 + Vite 7 SPA, deployed on Vercel
- **Business**: Independent insurance broker, Downey CA, est. 1999
- **Languages**: English, Spanish, Arabic
- **Build cmd**: `npm run build` (tsc → vite build → node scripts/prerender.mjs)
- **Deploy cmd**: `git push origin HEAD:main` — Vercel GitHub integration deploys automatically
- **Git branch**: seo/gap-remediation
- **IMPORTANT**: The GitHub integration sets VERCEL=1, which causes prerender.mjs to skip.
  Production serves the JS SPA (Google can render it). Prerendering is for local inspection only.
  `vercel deploy --prebuilt` does NOT work cleanly — use git push instead.

## Architecture — How SEO Works in This SPA

This is a **prerendered SPA**. Every route is rendered to static HTML by Playwright after build:

```
npm run build
  └── tsc -b
  └── vite build          → dist/assets/
  └── node scripts/prerender.mjs
        → Playwright visits each route in headless Chrome
        → Waits for React to fully mount (h1 visible + 800ms)
        → Saves fully-rendered HTML to dist/<route>/index.html
        → Replaces localhost origin with https://originalinsurance.net
```

**What this means**: In production, Google gets the JS-rendered SPA (not prerendered HTML).
Google's crawler does execute JavaScript. Schema tags, canonical, and meta tags from React
components DO get indexed, but the prerendered HTML files in dist/ are NOT what Vercel serves.
Changes to React components take effect after `git push origin HEAD:main`.

---

## Page → Component Map

```
/                   → src/pages/Home.tsx
/services           → src/pages/Services.tsx
/about              → src/pages/About.tsx
/locations          → src/pages/Locations.tsx
/contact            → src/pages/Contact.tsx
/faq                → src/pages/Faq.tsx
/insurance/downey        → src/pages/CityLanding.tsx (generic fallback)
/insurance/norwalk       → src/pages/insurance/Norwalk.tsx (dedicated)
/insurance/bellflower    → src/pages/insurance/Bellflower.tsx (dedicated)
/insurance/lynwood       → src/pages/insurance/Lynwood.tsx (dedicated)
/insurance/cerritos      → src/pages/insurance/Cerritos.tsx (dedicated)
/insurance/lakewood      → src/pages/insurance/Lakewood.tsx (dedicated)
/insurance/paramount     → src/pages/insurance/Paramount.tsx (dedicated)
/insurance/south-gate    → src/pages/insurance/SouthGate.tsx (dedicated)
/insurance/whittier      → src/pages/insurance/Whittier.tsx (dedicated)
/insurance/pico-rivera   → src/pages/insurance/PicoRivera.tsx (dedicated)
/insurance/montebello    → src/pages/insurance/Montebello.tsx (dedicated)
/insurance/commerce      → src/pages/insurance/Commerce.tsx (dedicated)
```

---

## Schema Components

### `LocalBusinessSchema.tsx` — InsuranceAgency entity
- Mounted on: Homepage, all city pages
- **NOT mounted on**: /faq, /services, /about, /contact (those are not the business entity page)
- Cleanup: removes any existing InsuranceAgency JSON-LD before injecting
- `url` prop defaults to homepage; city pages pass their own canonical URL
- `areaServed` prop defaults to 7 cities; city pages override with city-specific list
- Does NOT include `aggregateRating` — Google's own docs say this is for review aggregator sites, not business own websites

### `FAQSchema.tsx` — FAQPage entity
- Mounted on: `/faq` page ONLY (Faq.tsx)
- Cleanup: removes `script[data-schema="FAQSchema"]` before re-injecting
- Uses `schemaA` field from each FAQ item (short, factual, no CTAs/phones/links)
- Note: Google restricts FAQ rich results to "well-known, authoritative government/health sites" — FAQ schema is still correct markup, but rich results may not show until domain authority grows

### `BreadcrumbSchema.tsx` — BreadcrumbList entity
- Mounted on: all inner pages (/faq, all city pages, /about, /contact, etc.)
- Cleanup: removes `script[data-schema="BreadcrumbSchema"]` before re-injecting
- City pages in Faq.tsx/About.tsx/Contact.tsx use this component
- CityLanding.tsx uses its own raw useEffect (no data-schema attribute — different cleanup path)

---

## Canonical Tag Rules

Managed by `src/lib/seo.ts` → `usePageMeta()` hook.

- Updates existing `<link rel="canonical">` in DOM if one exists (prerendered pages always have one)
- Creates new one if none exists
- The prerendered HTML for every page has a self-referencing canonical baked in
- Each dedicated page file (Lynwood.tsx etc.) has hardcoded `const canonical = "https://originalinsurance.net/insurance/[city]"`
- CityLanding.tsx builds canonical dynamically from `city.slug`

**Rule**: Every page must have exactly ONE canonical pointing to its own URL. Never point to homepage or another page.

---

## Schema Rules — What Goes Where

| Page | LocalBusiness | FAQPage | BreadcrumbList |
|------|--------------|---------|----------------|
| / (Homepage) | ✅ (root URL) | ❌ | ❌ |
| /faq | ❌ | ✅ | ✅ |
| /insurance/* | ✅ (city URL) | ❌ | ✅ |
| /services, /about, /contact, /locations | ❌ | ❌ | ❌ (those pages have page-specific schemas) |

**Critical**: Do NOT put LocalBusinessSchema on /faq — it creates an InsuranceAgency entity with url="/faq" which conflicts with the FAQPage schema and causes Google parsing errors.

---

## GSC Status (as of Apr 21, 2026)

| Metric | Value |
|--------|-------|
| Indexed pages | 3 (/, /insurance/downey, /faq) |
| Discovered not indexed | 14 pages |
| Page with redirect | 1 (/index.html → /) |
| Alternate canonical | 1 (/insurance/lynwood — stale crawl, code is correct) |
| Sitemap | 22 URLs discovered, Success |
| Impressions | Growing — "insurance in downey ca" 17 impressions, "original insurance services" 62 |
| Click-through | 2 clicks from "original insurance services" |

### Active errors (as of Apr 21, 2026 — fixed in deploy 7455216f)
- ~~Duplicate FAQPage schema (5 items)~~ — FIXED: removed LocalBusinessSchema from /faq
- ~~Review snippets invalid (10 items)~~ — RESOLVING: no review schema in current code, stale crawl cache

---

## Sitemap Rules

File: `original-insurance/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- NO image tags — they caused errors previously -->
  <!-- NO xmlns:image namespace -->
```

Priority values:
- Homepage: 1.0
- /services, /locations: 0.9
- /about, /contact, /faq: 0.8
- City pages (/insurance/*): 0.7

---

## Internal Linking — City Pages

All 12 city pages are linked from `src/components/Footer.tsx` → "Service Areas" section.
This ensures Googlebot can discover city pages from any indexed page that renders the footer.

Cities: downey, norwalk, bellflower, lynwood, cerritos, whittier,
lakewood, paramount, south-gate, pico-rivera, montebello, commerce

---

## robots.txt (never modify)
```
User-agent: *
Allow: /
Sitemap: https://originalinsurance.net/sitemap.xml
```

---

## Firebase SPA Rewrite (never remove)
```json
{ "hosting": { "rewrites": [{"source": "/**", "destination": "/index.html"}] } }
```

---

## After Every SEO Change — Required Steps

```bash
# 1. Build locally (TypeScript + Vite + Playwright prerender — all in one command)
npm run build

# 2. Validate schema blocks on built HTML
grep -o 'data-schema="[^"]*"' dist/index.html
grep -o 'data-schema="[^"]*"' dist/faq/index.html
grep -o 'data-schema="[^"]*"' dist/insurance/lynwood/index.html

# 3. Deploy to Vercel using prebuilt dist (NEVER firebase deploy)
vercel deploy --prebuilt

# 4. Commit and push
git add -p && git commit -m "..." && git push origin HEAD:main

# 5. Request indexing in GSC for changed pages (max 5/day)
# URL Inspection → paste URL → Request Indexing
```

---

## High-Value Local Keywords

```
Primary:   insurance broker Downey CA
Secondary: auto insurance Downey, home insurance Downey
SR-22:     SR-22 insurance Downey, SR-22 filing California
No-license: no license auto insurance California
Multilingual: Spanish insurance broker Downey, Arabic insurance Downey
City:      insurance [city] CA (for each of the 12 cities)
Long-tail: independent insurance agent Downey CA
           car insurance without driver license California
           commercial insurance Downey small business
```

---

## Research Note (Apr 2026)

Before implementing any schema changes, verify against current Google docs:
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://schema.org/InsuranceAgency

Google updates requirements frequently. What was valid in 2024 may be flagged in 2026.
