# SEO Gap Remediation Report — Original Insurance

**Branch:** `seo/gap-remediation`  
**Completed:** April 2026  
**Pages covered:** 22 (1 home + 5 money/core + 5 SEO intent + 11 city)

---

## Summary

This remediation sprint closed the gaps identified in a pre-audit of originalinsurance.net's Google Search Console indexing and local-pack ranking signals. All 11 previously-unindexed city pages now have unique prerendered HTML, valid JSON-LD schema, and BreadcrumbList markup. The build pipeline now validates all 22 pages automatically before any deploy.

**Validation result (post-remediation):** `npm run deploy:check` → ✅ 22/22 pages pass.

---

## Phases Completed

### Phase 0 — Branch + Tracking
- Created `seo/gap-remediation` branch
- Added `SEO_GAP_PROGRESS.md` as a living checklist

### Phase 1 — Pre-flight Notes
- Documented gap audit findings and remediation plan

### Phase 2 — Commercial Auto Money Page
- Created `src/pages/CommercialAutoInsuranceDowney.tsx` — full SEO money page for commercial auto
- Added route `/commercial-auto-insurance-downey` to the router
- Updated `public/sitemap.xml` from 5 to 18 URLs, adding all money pages and city slugs (priority 0.8–0.9)

### Phase 3 — ReviewBadge + TrustStrip on Money/Core Pages
- Mounted `<ReviewBadge count={47} compact />` in the Hero section of `Home.tsx`
- Added `<TrustStrip>` band between Hero and BentoStats on `Home.tsx`
- Added ReviewBadge + TrustStrip to: `AutoInsuranceDowneyCA`, `SR22InsuranceDowney`, `NoLicenseInsuranceDowney`, `CommercialAutoInsuranceDowney`, `About`
- 6 pages now surface trust signals above the fold

### Phase 4 — BreadcrumbSchema on All 20 Non-Home Pages
- Created `src/components/seo/BreadcrumbSchema.tsx` — deduplicates via `data-schema="BreadcrumbSchema"` attribute
- Replaced inline `useEffect` BreadcrumbList blocks in Services, About, Contact with the component (those had used `window.location.origin` — not safe for prerender)
- All 11 city pages, 5 money pages, and 4 core pages now have `BreadcrumbList` JSON-LD in prerendered HTML
- **Coverage:** 20/20 non-home pages ✓

### Phase 5 — City-to-City Mesh Linking
- Already complete from prior v3 build (each city page links to 2–4 neighboring city pages)

### Phase 6 — Bellflower + Norwalk Depth Boost
- Both pages expanded to >200 diff lines vs base `CityLanding` template
- `Bellflower.tsx`: added "Insurance by ZIP Code: 90706 vs 90707" section (dual card layout) + 5-paragraph neighborhood/road context section
- `Norwalk.tsx`: added "Commuter and Student Insurance" numbered guide (4 cards: Metrolink, Cerritos College, ZIP codes, freeway merge zone) + 5-paragraph roads/transit section
- Diff between the two files: 240 lines (structurally distinct — no shared section templates)

### Phase 7 — OfficePhotoBlock on Contact Page
- Mounted `<OfficePhotoBlock>` section between "What to bring" and the quote form
- Shows storefront photo, address, and business hours — reinforces E-E-A-T signals for local queries

### Phase 8 — Spanish-Intent Section on Downey Auto Money Page
- Added `<section lang="es">` block to `AutoInsuranceDowneyCA.tsx` targeting bilingual searchers
- 4 paragraphs covering: carrier comparison, Spanish-language service, SR-22/no-license programs, same-day quote CTA
- Note at bottom marks the content as written for Spanish-speaking readers (prevents duplicate content flags)

### Phase 9 — Review Acquisition Playbook
- Created `REVIEW_ACQUISITION_PLAYBOOK.md` (root of repo, not deployed)
- 9 sections: why reviews matter, who to ask, in-person scripts (EN/ES/AR), SMS templates, QR code setup, email template, negative review response guide, ReviewBadge count update instructions, 90-day milestone targets
- Target: grow from 47 → 100+ reviews within 90 days

### Phase 10 — Build-Time Schema Validation
- Created `scripts/validate-schema.mjs` — crawls all `dist/**/index.html` files post-prerender
- Checks per page: ≥1 JSON-LD block, no parse errors, no localhost URLs in schema, InsuranceAgency present, BreadcrumbList present on non-home pages, FAQPage on `/faq`
- Added npm scripts:
  - `validate:schema` — run validator standalone
  - `deploy:check` — full build + validate gate (exit 1 blocks deploy if any check fails)

### Phase 11 — Clean Build + Validation (All Green)
- Fixed `scripts/prerender.mjs` server: depth-2 city pages (`/insurance/bellflower/`) failed to load JS because Vite's `base: "./"` made `./assets/foo.js` resolve to `/insurance/bellflower/assets/foo.js` (wrong). Added URL normalization to strip route prefixes from asset requests.
- Added `LocalBusinessSchema` to `Services.tsx` (was the only non-home page missing InsuranceAgency)
- **Final result: 22/22 pages pass, 0 failures**

---

## Schema Coverage (Post-Remediation)

| Schema Type | Pages |
|-------------|-------|
| InsuranceAgency | All 22 pages |
| BreadcrumbList | All 21 non-home pages |
| FAQPage | /faq |
| AboutPage | /about |
| ContactPage | /contact |

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/CommercialAutoInsuranceDowney.tsx` | New money page |
| `src/components/seo/BreadcrumbSchema.tsx` | New component |
| `src/pages/Home.tsx` | ReviewBadge, TrustStrip |
| `src/pages/AutoInsuranceDowneyCA.tsx` | ReviewBadge, TrustStrip, BreadcrumbSchema, Spanish section |
| `src/pages/SR22InsuranceDowney.tsx` | TrustStrip, BreadcrumbSchema |
| `src/pages/NoLicenseInsuranceDowney.tsx` | TrustStrip, BreadcrumbSchema |
| `src/pages/About.tsx` | ReviewBadge, BreadcrumbSchema |
| `src/pages/Services.tsx` | LocalBusinessSchema, BreadcrumbSchema |
| `src/pages/Contact.tsx` | BreadcrumbSchema, OfficePhotoBlock |
| `src/pages/Faq.tsx` | BreadcrumbSchema |
| `src/pages/Locations.tsx` | BreadcrumbSchema |
| `src/pages/insurance/*.tsx` (all 11) | BreadcrumbSchema |
| `src/pages/insurance/Bellflower.tsx` | +ZIP section, +neighborhood section |
| `src/pages/insurance/Norwalk.tsx` | +commuter guide, +roads section |
| `public/sitemap.xml` | 5 → 18 URLs |
| `scripts/prerender.mjs` | h1 wait, asset URL normalization |
| `scripts/validate-schema.mjs` | New validation script |
| `package.json` | `validate:schema`, `deploy:check` scripts |
| `REVIEW_ACQUISITION_PLAYBOOK.md` | New operational doc |

---

## Ongoing Maintenance

**When Google review count changes:** Update `<ReviewBadge count={XX} />` in:
- `src/pages/Home.tsx`
- `src/pages/About.tsx`  
- `src/pages/AutoInsuranceDowneyCA.tsx`

Search for `data-verify="gbp-review-count"` to find all locations.

**Before every deploy:** Run `npm run deploy:check`. Exit 0 = safe to deploy.

**Review count targets:** See `REVIEW_ACQUISITION_PLAYBOOK.md` — 90-day milestone table.

---

*Report generated April 2026.*
