# OIS Website — Claude Code Project Instructions

## Site
- **URL**: https://originalinsurance.net
- **Stack**: React 19 + Vite 7 SPA with Playwright prerendering, deployed on Vercel
- **Business**: Original Insurance Services — independent broker, Downey CA, est. 1999

## Dev Server
- **Always port 3002** — `cd original-insurance && npm run dev`
- Opens at http://localhost:3002
- `strictPort: true` — fails loudly if 3002 is taken, never silently picks another port

## Directory Layout
```
ois_website/           ← repo root (run git and deploy.sh from here)
  original-insurance/  ← Vite app (run npm commands from here)
    src/
    public/
    dist/              ← built output (gitignored)
    scripts/
      prerender.mjs    ← Playwright static render of all 22 routes
      seo-lint.mjs     ← runs before every deploy
      validate-schema.mjs
  scripts/
    deploy.sh          ← ALWAYS run from repo root: bash scripts/deploy.sh
    verify-live.sh
  .vercel/
    output/static/     ← prerendered HTML copied here before deploy
```

## Build & Deploy — CRITICAL
- **NEVER use `git push` to deploy** — GitHub integration sets VERCEL=1 → prerender.mjs exits early → SPA only, no static HTML
- **Correct deploy**: `bash scripts/deploy.sh` from `ois_website/` (repo root)
- Pipeline: seo-lint → npm run build (tsc + vite + playwright prerender) → schema validate → vercel build → copy prerendered HTML → vercel deploy --prebuilt --prod
- Vercel project: `ois-website` (prj_8WZgILub9h5s3DppuoPvONOSXYOP)

## SEO Rules — Non-Negotiable
1. **Never add `"trailingSlash": false` to vercel.json** — seo-lint check 5 blocks it. Trailing-slash URLs must return 200 with canonical, not redirect.
2. **Never lazy-load prerendered routes** — seo-lint check 6a blocks it. All 22 prerendered routes must be eager-imported in App.tsx.
3. **Never add trailing slash to canonical URLs** — seo-lint check 6 blocks it.
4. **LocalBusinessSchema**: allowed on homepage, city pages, and money pages only. Never on /faq, /about, /contact, /services.
5. **FAQSchema**: allowed on /faq and money pages. Never on city pages.

## Page → Route Map (all prerendered)
```
/                          → src/pages/Home.tsx
/about                     → src/pages/About.tsx
/services                  → src/pages/Services.tsx
/locations                 → src/pages/Locations.tsx
/contact                   → src/pages/Contact.tsx
/faq                       → src/pages/Faq.tsx
/auto-insurance-downey-ca  → src/pages/AutoInsuranceDowneyCA.tsx
/sr22-insurance-downey     → src/pages/SR22InsuranceDowney.tsx
/no-license-auto-insurance-downey → src/pages/NoLicenseInsuranceDowney.tsx
/commercial-auto-insurance-downey → src/pages/CommercialAutoInsuranceDowney.tsx
/insurance/downey          → src/pages/CityLanding.tsx (via :citySlug)
/insurance/norwalk         → src/pages/insurance/Norwalk.tsx
/insurance/bellflower      → src/pages/insurance/Bellflower.tsx
/insurance/lynwood         → src/pages/insurance/Lynwood.tsx
/insurance/cerritos        → src/pages/insurance/Cerritos.tsx
/insurance/lakewood        → src/pages/insurance/Lakewood.tsx
/insurance/paramount       → src/pages/insurance/Paramount.tsx
/insurance/south-gate      → src/pages/insurance/SouthGate.tsx
/insurance/whittier        → src/pages/insurance/Whittier.tsx
/insurance/pico-rivera     → src/pages/insurance/PicoRivera.tsx
/insurance/montebello      → src/pages/insurance/Montebello.tsx
/insurance/commerce        → src/pages/insurance/Commerce.tsx
```

## robots.txt
```
User-agent: *
Allow: /
Disallow: /*?q=
Sitemap: https://originalinsurance.net/sitemap.xml
```
`Disallow: /*?q=` prevents Google from crawling query-param FAQ URLs. Do not remove.

## After Any SEO Change
```bash
# From original-insurance/
node scripts/seo-lint.mjs        # must pass before deploy
npm run build                    # tsc + vite + prerender (22 pages)
node scripts/validate-schema.mjs # verify JSON-LD on built HTML

# From ois_website/ (repo root)
bash scripts/deploy.sh           # full pipeline including Vercel deploy
```

## GSC Status (as of May 20, 2026)
- Sitemap: 22 URLs, Success — keep `/sitemap.xml` (lowercase); delete `/SITEMAP.XML` if it appears
- "Page with redirect" fix deployed May 20: removed `trailingSlash:false`, trailing-slash URLs now return 200 with canonical
- Indexing requested May 20: /auto-insurance-downey-ca, /sr22-insurance-downey, /no-license-auto-insurance-downey, /commercial-auto-insurance-downey, /about
- Next queue: /faq, /contact, /services, /locations, /insurance/downey (5/day max in GSC)
