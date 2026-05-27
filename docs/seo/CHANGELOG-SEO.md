# SEO Changelog — originalinsurance.net

All SEO-relevant changes, ordered newest-first. Format:
`YYYY-MM-DD | commit | what changed | why | GSC issue it addresses`

---

## 2026-05-07

### Shared broker hero and quote-widget refinement
**Commit:** `b83c20a6`

**What changed:**
- Added `BrokerHeroPanel`, a reusable insurance-specific hero panel focused on broker review, documents, carrier fit, SR-22/no-license needs, and same-day proof when binding is available.
- Updated `PageHero` so Services, Contact, FAQ, money pages, and city pages share the same professional broker panel by default.
- Replaced the old custom Services hero with shared `PageHero` so Services now matches the rest of the priority pages.
- Improved `QuoteWidget` with quote-type tabs for Auto, SR-22, Home, and Business. The checklist now changes based on the selected quote type, including mobile where the previous modal mostly exposed only the iframe.
- Removed unsupported marketing numbers from Services copy and stats, including average savings, starting monthly prices, large coverage amounts, and business-count claims that should not appear without Brian's source data.

**Why:** Brian wanted the site to look less generic and more like a real insurance brokerage. This pass removes filler-style claims, makes the hero experience consistent across page families, and gives the quote modal more useful insurance context before the embedded form.

**Validation:** `npm run lint`, `npm run seo-lint`, `npm run build`, and `npm run validate:schema` passed. Playwright browser smoke passed on 10 routes across desktop and mobile: one H1 per page, no horizontal overflow, expected broker hero panel on desktop PageHero routes, and quote modal iframe plus SR-22 checklist switching on mobile.

---

## 2026-05-06

### Insurance-specific UX revamp, quote widget upgrade, lint cleanup
**Commit:** pending

**What changed:**
- Added `InsuranceWorkflow` shared component with a broker-specific quote process, checklist, carrier-fit language, and quote/call actions.
- Added the workflow to Home, About, Services, Contact, the reusable city landing template, and all four money pages.
- Rebuilt `QuoteWidget` into a professional quote modal shell: broker context panel, quote checklist, phone fallback, external-form fallback, iframe loading state, and improved desktop layout.
- Standardized `CTASection` with insurance trust markers and removed decorative glow elements.
- Cleaned footer trust badges to use professional text markers instead of emoji-style badges.
- Fixed lint issues while touching the UX layer: Lenis context moved to `lib/lenisContext.ts`, typed icons/buttons/animation helpers, stable city-page hooks, schema cleanup, and typed location hours.

**Why:** The site had good SEO mechanics but still felt like a collection of generic marketing blocks. This pass makes the visitor flow feel more like an insurance brokerage: understand the risk, compare carrier appetite, prepare documents, bind coverage, and keep service available after purchase.

**Validation:** `npm run lint`, `npm run seo-lint`, `npm run build`, and `npm run validate:schema` passed. Browser smoke tests passed on 11 routes across desktop/mobile with one H1, no horizontal overflow, no non-Vercel 404s, and verified quote modal iframe/scroll-lock/phone fallback. Local Lighthouse desktop: Home 95/96/96/100 with CLS 0, Services 93/95/96/100 with CLS 0, SR-22 91/96/96/100 with CLS 0. Local Lighthouse mobile: Home perf 69, Services perf 71, both CLS 0.

### Priority page design-system adoption + money-page CLS fix
**Commit:** pending

**What changed:**
- `App.tsx`: eagerly imports the four prerendered money pages (`/auto-insurance-downey-ca`, `/sr22-insurance-downey`, `/no-license-auto-insurance-downey`, `/commercial-auto-insurance-downey`) so hydration does not show the Suspense fallback on those entry points.
- `Home.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`, `CityLanding.tsx`: began applying shared design-system primitives (`Section`, `SectionHeader`, `CTASection`) to the 5 priority page surfaces and the reusable city-page template.
- Replaced bespoke bottom CTA implementations on About, Services, Contact, and city landing pages with the shared `CTASection` closer.

**Why:** Live Lighthouse still showed CLS `0.295` on the two special landing pages because they remained lazy-loaded. The design-system components existed but were not visible on priority pages yet.

**Validation:** `npm run seo-lint`, `npm run build`, and `npm run validate:schema` passed. Local Lighthouse desktop after the eager-import fix: `/sr22-insurance-downey` CLS `0`, `/no-license-auto-insurance-downey` CLS `0`, `/insurance/downey` CLS `0`.

### GBP integration: text number, identity badges, product showcase, footer rebuild, schema
**Commit:** `83e78b04`

**What changed:**
- `site.ts`: added text number (310) 429-6777, `sms:+13104296777` href, reviews object (4.9/92), identity flags
- `Navbar.tsx`: Call + Text + Quote in desktop CTA; 3-button grid in mobile sheet
- `Contact.tsx`: added "Text Us" as 4th contact card with `sms:` link
- `Footer.tsx`: major rebuild — 4 distinct columns (contact, distinct service links, company, service areas), identity badges row (Black-owned/Latino-owned/LGBTQ+/Wheelchair/BBB/CDI), languages row, bottom bar with CA DOI note
- `About.tsx`: identity paragraph in Our Story — "Black- and Latino-owned brokerage, wheelchair accessible, LGBTQ+ friendly, transgender safespace"
- `Home.tsx`: replaced 5-card `PopularNeedsHub` with 10-product GBP catalog showcase — SR-22, Auto, No-License, Commercial, Homeowners, Condo, Motorcycle, Life, Low Down Payment, Final Expense
- `LocalBusinessSchema.tsx`: contactPoint (voice + text with languages), amenityFeature (wheelchair), areaServed expanded to all 20 GBP cities, sameAs Google Business Profile, serviceType expanded to 10 products
- `src/data/hours.ts`: new hours data module with `getOfficeStatus()` and `SPECIAL_HOURS` array — pre-loaded Memorial Day + 2026 federal holidays; Footer now uses this instead of hardcoded logic
- Review count updated 47→92 (actual GBP count) in all ReviewBadge mounts
- `PHOTOGRAPHY_NEEDS.md`: shot list with placement, priority, and current→replacement map

**Why:** GBP lists attributes, services, and contact info that were absent from the site. Texting channel is a major UX win for the bilingual/younger audience. Identity attributes are real differentiators that were invisible. Footer was functionally broken (6 identical /services links in Coverage column).

**Open questions for Brian (see summary report):** 8 new city pages, carrier logo list, holiday hours confirmation, `aggregateRating`, `paymentAccepted`, `priceRange`.

---

### On-page optimization: titles, meta descriptions, FAQPage schemas, internal links, image fixes
**Commit:** `bb11d555`

**What changed:**
- All 22 page titles shortened from 65–93 chars to 49–60 chars. Pattern: Primary Keyword + Benefit Modifier + Brand. City pages differentiated by local angle (605 corridor, bundling, walk-in, ITIN). CityLanding.tsx template updated.
- All 22 meta descriptions rewritten to 150–165 chars. Pattern: Hook + Promise + Proof + CTA. Removed generic "Independent insurance broker serving X" boilerplate. Added specific proof points (30+ carriers, same-day, $15 SR-22 fee, 4.9★, bilingual).
- FAQPage schema added to 4 money pages: SR-22 (5 Q&As), no-license (5 Q&As), auto insurance (5 Q&As), commercial auto (4 Q&As). Each set unique to the page's service.
- /about inbound links increased from 1 to ~14: all 11 city pages, FAQ, and SR-22 page now link contextually to /about.
- Image fixes: Locations.tsx storefront missing loading="lazy" + dimensions; Services.tsx service image missing dimensions. Both corrected.

**Why:** GSC shows 0.74% CTR with 676 impressions. "Insurance in downey ca" = 34 impressions, 0 clicks. Generic, truncated titles and boilerplate descriptions are the primary cause. FAQPage schema creates rich result eligibility for SR-22 and no-license pages.

**GSC KPIs targeted:** CTR lift (titles/meta), FAQPage rich results (FAQ schema), /about indexing signal (internal links).

**Lighthouse:** PageSpeed API rate-limited during audit. Bundle sizes: main JS 78KB gzipped, animations (Framer Motion) 150KB uncompressed, CSS 10KB gzipped. All public images in WebP. Hero LCP image preloaded with fetchPriority="high".

---

### Schema audit: fix InsuranceAgency URL on money pages; fix validate-schema rules
**Commit:** `eb3fa017`

**What changed:**
- `AutoInsuranceDowneyCA.tsx`, `SR22InsuranceDowney.tsx`, `NoLicenseInsuranceDowney.tsx`,
  `CommercialAutoInsuranceDowney.tsx`: removed non-homepage URL from `LocalBusinessSchema`
  (was `url="/auto-insurance-downey-ca"` etc. → now defaults to homepage URL `https://originalinsurance.net/`)
- `scripts/validate-schema.mjs`: replaced "all pages need InsuranceAgency" rule with
  per-page rules matching SKILL.md schema table

**Why:** Money pages had InsuranceAgency entities pointing to their own URL, creating
multiple competing business entity URLs. Schema validator was also wrongly flagging
correctly-cleaned pages (/about, /services) as failures.

**GSC issue:** Preventive — avoids confusing Google with multiple InsuranceAgency URLs.

---

### Hardening: deploy script, SEO lint, verify-live, SEO_CONVENTIONS
**Commit:** `b3a19e8f`, `21768f8b`

**What changed:**
- `scripts/deploy.sh`: full deploy pipeline with dry-run mode
- `scripts/verify-live.sh`: 30+ curl-based live checks
- `original-insurance/scripts/seo-lint.mjs`: static source analysis
- `SEO_CONVENTIONS.md`: canonical decisions documented
- `SKILL.md`: deployment instructions corrected

**Why:** Previous session had a broken `vercel deploy --prebuilt` workflow that deployed
to the wrong Vercel project (`original-insurance` instead of `ois-website`), and the
root `index.html` wasn't being copied after prerender broke the hard link.

---

## 2026-05-05

### GSC indexing remediation
**Commit:** `13c4357e`

**What changed:**
- `About.tsx`: removed wrong `LocalBusinessSchema` (url="/about"); fixed `mainEntity @id`
- `Locations.tsx`: fixed InsuranceAgency url from `/locations` to homepage
- `Home.tsx`: added ServiceAreas section with 12 city page links
- `Navbar.tsx`: added FAQ to navigation
- `sitemap.xml`: updated lastmod to 2026-05-05
- `vercel.json`: added (then removed) `/faq?q=*` redirect (CAUSED LOOP — see below)

**Why:** GSC showed 15 indexed / 19 not indexed. Schema entities with wrong URLs were
creating multiple InsuranceAgency entities. City pages had no homepage link.

**GSC issues addressed:** Issue 3 (about not indexed), Issue 5 (10 city pages discovered
not indexed), Issue 6 (preventive schema cleanup).

---

### INTRODUCED: faq?q= redirect loop (live 22:33 → 22:39 UTC, ~6 min)
**Commit:** `13c4357e` (added), `2bd04ef2` (removed)

**What happened:** Added Vercel redirect `{source: "/faq", has: [{type:"query",key:"q"}], destination: "/faq"}`.
Vercel preserves query strings in destinations → `/faq?q=test → 308 → /faq?q=test` (infinite loop).

**Fix:** Removed the redirect. Added `robots.txt Disallow: /*?q=` to block crawlers from
query-param URL variants at the robots level.

**GSC impact:** Any Googlebot hit during the 6-minute window will appear as a "Redirect error"
in GSC over the next 1–14 days. Click "Validate Fix" on the Redirect error entry.

---

### About page content expansion + Services schema fix
**Commit:** `72f79887`

**What changed:**
- `About.tsx`: added 2 story paragraphs (~200 words, community/SE LA context) and new
  "What to Expect" 4-step section (~200 words). Total: ~950 substantive words.
- `Services.tsx`: removed LocalBusinessSchema (url="/services") — forbidden per skill rules

**Why:** GSC "Crawled — not indexed" for /about indicated thin content or schema confusion.
Previous word count ~500 (borderline). Services had same InsuranceAgency entity pollution.

**GSC issue:** Issue 3 (about not indexed), Issue 6 (preventive).

---

## 2026-04-27 (pre-session 1)

### INTRODUCED: faq?q= redirect loop (live Apr 27 → May 5 = 8 days)
**Commit:** `07e2ab2e`

**What happened:** Same redirect loop bug as above — added `has: [{type:"query",key:"q"}]`
redirect for `/faq` pointing to itself. Was intended to strip `{search_term_string}` from
SearchAction schema crawls. Vercel loop behavior was not understood at the time.

**This is the source of the pre-existing GSC "Redirect error" from 4/30/26.**

Fixed in commit `2bd04ef2` (May 5, 2026). Brian: go to GSC → Pages → "Redirect error" →
click "Validate Fix" — the error URL is almost certainly `/faq?q={search_term_string}`.

---

### Firebase → Vercel migration
**Commits:** `35d0edc6`, `cca5c6c4`, `89b03f7e`, `f177946`, `79d4967e`, `f4076f3d`, `07e2ab2e`

**What changed:** Site moved from Firebase Hosting to Vercel. GitHub integration set up
but does NOT trigger prerender (VERCEL=1 env var). Manual deploy workflow required.
SPA routing fixed (removed `cleanUrls: true`, `framework: "vite"` that caused 404s).
`/index.html → /` redirect added to fix GSC discovering `/index.html` as a page.

**Why:** Firebase was the old host. Vercel provides better CI/CDN integration.

---

## 2026-04-21 (pre-migration GSC baseline)

| Metric | Value |
|--------|-------|
| Indexed pages | 3 (/, /insurance/downey, /faq) |
| Discovered not indexed | 14 pages |
| Page with redirect | 1 (/index.html → /) |
| Impressions | "insurance in downey ca" 17, "original insurance services" 62 |
| Clicks | 2 |
