# SEO Conventions — originalinsurance.net

This file locks in all canonical decisions for the site. Future Claude sessions and future Brian should read this before making any change that touches URLs, schema, sitemaps, or links. These rules were derived from GSC errors and Vercel behavior observations; violating them has caused real indexing failures.

---

## 1. Canonical URL form

**Rule: No trailing slash on any content page. Trailing slash only on `/`.**

| Correct | Wrong |
|---------|-------|
| `/about` | `/about/` |
| `/insurance/cerritos` | `/insurance/cerritos/` |
| `/faq` | `/faq/` |
| `/` | (no alternative) |

Vercel's `trailingSlash: false` in `vercel.json` enforces 308 redirects for trailing-slash variants. Do NOT add trailing slashes anywhere — every redirect is a wasted crawl unit.

---

## 2. InsuranceAgency schema — single entity, correct pages only

**The `InsuranceAgency` entity has one canonical ID: `https://originalinsurance.net/#agency`**

| Page category | InsuranceAgency? | url field |
|---|---|---|
| Homepage (`/`) | ✅ required | `https://originalinsurance.net/` |
| City pages (`/insurance/*`) | ✅ required | city page canonical URL |
| Money pages (`/auto-insurance-*`, `/sr22-*`, etc.) | ✅ required | `https://originalinsurance.net/` (homepage) |
| `/faq` | ❌ forbidden | — |
| `/about` | ❌ forbidden | — |
| `/contact` | ❌ forbidden | — |
| `/services` | ❌ forbidden | — |

The `url` field on the `InsuranceAgency` schema entity should be the homepage for any page that is NOT a city page. City pages use their own canonical URL because they represent the agency's service at a specific location.

Do NOT pass the current page's URL as `url` on money pages or info pages — this creates multiple competing InsuranceAgency entities with different canonical URLs.

---

## 3. Sitemap is authoritative

Every URL in `public/sitemap.xml` is the canonical URL. No trailing slashes, no query parameters, no variants.

All three lists must match at all times:
1. `public/sitemap.xml` — the 12 city slugs
2. Homepage `ServiceAreas` component — the 12 city slugs
3. `Footer.tsx` "Service Areas" section — the 12 city slugs

Running `npm run seo-lint` checks list 1 vs list 2 automatically.

Current 12 city slugs: `downey`, `norwalk`, `bellflower`, `lynwood`, `cerritos`, `whittier`, `lakewood`, `paramount`, `south-gate`, `pico-rivera`, `montebello`, `commerce`

---

## 4. Query-param URLs

`robots.txt` has `Disallow: /*?q=` which blocks all query-param URL variants from being crawled. Do NOT remove this line. If you add a real search feature that generates query-param URLs that need to be indexed, update robots.txt deliberately and document why.

Do NOT add redirect rules in `vercel.json` that target a query-param source URL with the same path as destination — Vercel preserves query strings on redirected destinations, which creates an infinite loop. Example of the bug that caused a 30-min redirect loop in production:

```json
// WRONG — this loops: /faq?q=test → 308 → /faq?q=test → 308 → ...
{
  "source": "/faq",
  "has": [{ "type": "query", "key": "q" }],
  "destination": "/faq",   // Vercel appends ?q=test here → loop
  "permanent": true
}
```

---

## 5. Internal links

All React `<Link to=...>` and `<NavLink to=...>` must use the canonical no-trailing-slash form. No exceptions. The SEO lint script (`npm run seo-lint`) checks this.

---

## 6. Deployment process

**Always deploy manually from the repo root.** The GitHub integration does NOT auto-deploy because `VERCEL=1` causes prerender to skip. Use `bash scripts/deploy.sh`.

The deploy script does the following (in order):
1. Confirms working tree is clean
2. Runs `npm run seo-lint` — fails fast if SEO bugs exist
3. Runs `npm run build` in `original-insurance/` (TypeScript + Vite + Playwright prerender)
4. Runs `node scripts/validate-schema.mjs` to verify prerendered HTML schemas
5. Runs `vercel build --target production --yes` from repo root (creates routing structure)
6. Copies all prerendered pages from `original-insurance/dist/` into `.vercel/output/static/`
7. Runs `vercel deploy --prebuilt --prod` from repo root
8. Waits for CDN and runs `bash scripts/verify-live.sh`

The correct Vercel project is `ois-website` (prj_8WZgILub9h5s3DppuoPvONOSXYOP). The `.vercel/project.json` at the repo root points to this project. Never deploy from inside `original-insurance/` — the rootDirectory setting causes path resolution failures.

---

## 7. Schema on content/info pages

Each page category has its own page-specific schema:
- `/about` → `AboutPage` (with `mainEntity: { "@id": "https://originalinsurance.net/#agency" }`)
- `/faq` → `FAQPage`
- `/locations` → raw `InsuranceAgency` with `url: homepage` and `openingHoursSpecification`
- `/contact` → `BreadcrumbList` only
- `/services` → `BreadcrumbList` only

These pages must NOT have `LocalBusinessSchema` component mounted. The `validate:schema` script enforces this.

---

## 8. Scripts reference

| Command | What it does |
|---------|-------------|
| `npm run seo-lint` | Check source for SEO bugs (no build required) |
| `npm run build` | TypeScript + Vite + Playwright prerender (22 pages) |
| `npm run validate:schema` | Check schemas in prerendered dist/ HTML |
| `npm run deploy:check` | seo-lint + build + validate (pre-deploy sanity check) |
| `bash ../scripts/deploy.sh` | Full deploy pipeline (run from `original-insurance/`) |
| `bash ../scripts/deploy.sh --dry-run` | Print what would happen, touch nothing |
| `bash ../scripts/verify-live.sh` | Verify live site after deploy |
