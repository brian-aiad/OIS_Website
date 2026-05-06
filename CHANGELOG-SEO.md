# SEO Changelog — originalinsurance.net

All SEO-relevant changes, ordered newest-first. Format:
`YYYY-MM-DD | commit | what changed | why | GSC issue it addresses`

---

## 2026-05-06

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
