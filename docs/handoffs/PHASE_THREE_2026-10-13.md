# Original Insurance Services — Phase Three local implementation

Date: October 13, 2026. Scope: finish the existing local acquisition rebuild; no deployment, push, production configuration change, Quotzal change, or RIA change.

This report describes the Phase Three delta, not the entire previously uncommitted acquisition rebuild. The starting source fingerprints, source copies, Git status, and patch are preserved in `output/playwright/phase-three-baseline/` (repository root, ignored). Local app: `original-insurance/`; development URL: `http://127.0.0.1:3002`.

## Conversion and continuity

- Public referral context travels from city pages through coverage guides, services, and markets to quote entry. Only the established city and Spanish-language allowlists are propagated. No browser storage, arbitrary query forwarding, or inferred residence was added. ZIP and address remain customer answers.
- Spanish header, mobile menu, footer, and category quote links retain `lang=es`. City-origin Spanish visits retain their city referral, including the existing `from=/insurance/...` entry pattern.
- A valid enabled quote category supplied in the URL displays an explicit selected-coverage summary, Change coverage control, and Continue. Generic entry still presents all enabled categories. Choosing another category remains possible before continuing.
- Entry copy explains that a broker reviews the request and follows up; the form does not calculate an instant price. Success copy describes receipt for review rather than claiming arrival in a broker inbox. Local preview still explicitly says no agency email was sent.
- Saved agency settings remain authoritative. The existing local configuration requires phone across all eight categories. This was not reset to the source-default optional-phone behavior. Test suites temporarily exercise configuration and restore it; version/update metadata advances as part of supported saves.
- Coverage explorer and Services main-product rows have direct, product-specific quote actions alongside guides. Product heroes use meaningful Auto, Home, Commercial, SR-22, and license-help CTA labels.
- Contact’s fixed mobile action becomes Policy help and links to the message form. It hides while the contact form has focus. Quote/admin retain their dedicated layouts without the marketing action bar.

## Page and section changes

### Homepage

Preserved the established hero proposition, coordinated artwork, real storefront, exact reviews, useful coverage discovery, map, FAQ, and final CTA. Combined the independent-agency relationship diagram with the carrier module and removed the separate repeated Process section. The office section now points existing policyholders toward contact instead of repeating the establishment/history paragraph. Coverage has an immediate quote action as well as an educational path.

### Services

The main three insurance products retain coordinated artwork and gain direct quote actions. Additional insurance and office services are separate sections. Life, motorcycle, RV, boat, and other business coverage have direct native quote links; RV and boat have separate entry choices. Office services have an explicit catalog jump target and are not represented as insurance products. The warm document raster is replaced with the existing technical document motif. Removed the repeated full Process module.

### Auto, Home, Commercial, SR-22, and license guides

- Early links expose preparation, market access, and relevant special-auto paths.
- Coverage summaries remain visible; detailed chapters use native disclosure controls, with a compact topic index. All chapter content remains server rendered and available without JavaScript. Existing hash navigation opens the requested chapter.
- Auto diagram labels name liability, collision/comprehensive, and limits/deductibles. Home labels name dwelling, personal property, and personal liability. Existing qualified explanations are retained.
- The license page now has an owner/vehicle → actual driver → application/review technical composition, distinct from the SR-22 document illustration. Neither implies permission to drive or guaranteed acceptance.
- Related SR-22/license thumbnails use technical linework rather than the old warm illustration.
- Commercial market qualification remains intact: the commercial carrier group is not represented as a commercial-auto eligibility list.

### Insurance markets

Replaced equal boxed cells with a typographic carrier index using dividing rules and consistent optical sizing. Each category displays its encoded relationship count. Category descriptions remain visible. Preserved all 24 encoded carriers, qualifications, three official logo assets, text treatment for the other 21, category filters, no-JavaScript access, and relevant coverage links. The full-page section heading no longer repeats the hero’s “more options” idea.

### Spanish

Spanish navigation labels, same-page help/office anchors, Spanish skip link/utility copy, and a compact Spanish footer now connect the experience. Real office photography and existing insurance-specific technical motifs add visual support. The office image uses the shared art-reveal treatment.

The intake itself remains English, explicitly identified before entry and within the form. Spanish preference is preserved for human assistance. No partially translated field catalog, guessed custom-question translations, new translated routes, fake hreflang equivalents, or Arabic digital workflow was introduced. A complete professionally reviewed Spanish intake remains a separate substantial localization task.

### City/local

All twelve canonical city pages retain their existing useful local introduction, actual Downey storefront, office distinction, contact information, and coverage choices. Removed repeated full coverage explanation modules and the full regional map on every city page. A compact help directory links to SR-22, license questions, Spanish assistance, policy support, and the complete service-area directory. The pages remain a shared family; shortening is not a claim that every city now has unique local evidence or improved rankings.

The mobile map fits the viewport instead of requiring horizontal scrolling. Secondary map labels are suppressed at narrow widths; Downey remains labeled, positions are unchanged, and the adjacent complete city list supplies readable choices. The orientation graphic still explicitly says its connections are not driving routes.

### About, Contact, Locations, FAQ, footer

- About describes independent insurance in Downey rather than presenting an empty office as a team portrait. Removed the “Our approach” non-date from the history timeline; operating principles remain in the separate process section. No staff portraits or milestones were invented.
- Contact retains the working form and channel architecture, with better policy-help navigation and contextual mobile actions.
- Locations keeps practical address/hours/directions in the hero and removes a repeated address/directions block below it. Address copying and map remain. Existing parking/access claims are centralized in `officeVisit`, explicitly marked in source as pending business confirmation; the claims were not strengthened.
- FAQ search, native answers, and existing support information were retained. Legal pages and 404 inherit the consistent shared navigation/footer changes.
- The shared utility bar is a named navigation landmark. English footer service-area links now lead to the full directory and Downey rather than repeating twelve cities. Mobile secondary text is larger. Spanish gets its own useful compact footer.
- The resource strip no longer displays a stale global information-update date or implies an unperformed content refresh. Consumer-resource links and qualifications remain.

## Visual system, motion, assets, and engineering

DM Sans, navy/blue/white/blue-gray palette, established image families, tokens, and button geometry are retained. Email typography uses safe Arial/Helvetica fallbacks and cool OIS surfaces/borders instead of Georgia/warm editorial styling. Plain text, escaping, hidden-answer filtering, and delivery behavior are unchanged.

Motion remains finite and reduced-motion aware: hero entrances, coverage image masks/detail changes, carrier interaction changes, technical diagrams, relationship line drawing, map lines, reviews, FAQ, and button/link feedback. General content arrival is now static rather than a nearly imperceptible fade everywhere. Image masks carry more of the hierarchy. Removed obsolete neighborhood-car/palm animation rules and selectors. No animation dependency was added.

`tokens.css` now owns the intake palette and typography instead of a second legacy warm/serif root block in `intake.css`. Consolidated duplicate token roots. Extracted market and Spanish component styles into explicit ownership files. Replaced obsolete neighborhood illustration CSS in `areas.css` with the current service-area/map styles. This is controlled cleanup, not a claim that every legacy selector or override has been eliminated.

No raster assets, generated people, unofficial logos, or new photography were created. The license relationship diagram is code-native SVG; other added visuals reuse existing technical motifs and real office photography. The old warm document raster is no longer rendered in Services/related thumbnails. Historical asset files and provenance are retained rather than deleting evidence indiscriminately.

Analytics retains the event allowlist and PII boundaries. Safe placement values now distinguish explorer, markets, city, and Spanish entry in addition to header/hero/content/footer/mobile. No new event names, answer data, VINs, names, emails, phone numbers, raw queries, or sensitive need context are sent. Production GA/Vercel delivery still requires live verification.

## SEO and protected boundaries

Reviewed all 27 indexable page titles/descriptions. Existing intent-specific metadata remains appropriate and was retained. Canonicals, sitemap, redirects, `?q=` handling, 410 behavior, schema types, indexability, and language-equivalence strategy were not replaced. No FAQ/Review/AggregateRating/SearchAction schema was added.

Starting fingerprints confirm server intake validation/security, VIN module, schema IDs/configuration catalog, admin/editor logic, redirect configuration, and sitemap were unchanged by this phase. Native OIS remains independent of Quotzal. Marketing remains progressively enhanced static HTML; no React, GSAP, or new hydration runtime was added.

## Validation

Browser suites that mutate settings were run sequentially against local test-email mode only. No real contact messages or broker emails were sent.

| Check | Result |
|---|---|
| `npm run build` | PASS: Astro check, 0 errors/warnings/hints; 30 built pages |
| `npm run lint` | PASS |
| `npm run format:check` | PASS |
| `git diff --check` | PASS |
| `npm run validate:schema` | PASS: 29 pages |
| `npm run test:seo-browser` | PASS: 27 local production-build pages, exact metadata, headings, internal paths/anchors, alt attributes, language |
| `npm run seo-lint` | BLOCKED at final missing root Vercel project-link assertion; preceding content checks passed; safeguard unchanged |
| `npm run test:site` | PASS: 27 routes × 11 widths, zero automated accessibility findings; navigation, routing, reduced motion, no-JS, mocked contact success/error |
| `npm run test:responsive` | PASS: 30 landscape/tablet/zoom-equivalent/enlarged-text checks; admin login accessibility and studio capture |
| `npm run test:acquisition` | PASS: A–G journeys, service CTA context, removable prefill, Spanish assistance, captured local email, analytics safety, FAQ, map, guide; 10 axe scans |
| `npm run test:intake-server` | PASS: validation, VIN, saved-setting migration, security, email filtering/escaping/idempotent provider behavior, storage boundaries |
| `npm run test:intake` | PASS: auth, origin protection, rates, save conflicts, eight submissions, drivers/vehicles, retry, email contents, accessibility/layout |
| `npm run test:intake-stress` | PASS: eight browser flows, six custom answer types, ten drivers/vehicles, VIN failure/stale response, 68 axe scans |
| `npm run test:intake-usability` | PASS: custom editing/focus, preview, discard/conflicts, review correction, preserved answers, repeat-entry error focus |
| `npm run test:phase-three` | PASS: city → three guides → quote; Spanish header context; invalid context rejection; editable preset; 63 screenshots; 21 WCAG axe scans; eight widths; reduced motion; no page errors |
| Final targeted follow-up | PASS: five additional product quote entries, legacy Spanish `from` entry, hidden heading-break audit on all 27 content pages, 16 responsive checks, full axe scans on Services/About/Commerce/Spanish including best practices, deeper quote captures at three widths |

Two findings were corrected during QA: transient contrast during generic carrier reveal, and Spanish footer phone overflow at 320px. The broader axe scan also caught the pre-existing utility-bar landmark omission; its content is now inside a named navigation landmark. Final targeted scans passed after the last Services links, About two-column timeline, and utility-landmark refinements. The final production build and SEO/schema/lint/format checks were rerun afterward.

### Local Lighthouse 13.5.0

| Mobile page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 100 | 100 | 100 | 100 | 1.80 s | 0 | 0 ms |
| Auto | 100 | 100 | 100 | 100 | 1.58 s | 0 | 0 ms |
| Spanish | 100 | 100 | 100 | 100 | 1.58 s | 0 | 0 ms |

These are local production-build laboratory measurements, not field data or evidence of production improvement. Reports: `original-insurance/output/lighthouse/phase-three-*-mobile.json`. The final small service-link/city-copy/utility-landmark changes were separately browser-tested; no image/runtime dependency change followed these Lighthouse measurements.

Homepage assets: marketing CSS 118,722 bytes / 22,252 gzip; marketing JavaScript entry 12,143 bytes / 4,348 gzip. These are asset sizes, not an assertion about every route’s total transfer. Responsive Astro image output and the single loaded DM Sans family remain. No new library or hydration runtime was added.

### Approximate rendered heights at 390px

Heights include shared header/footer and default disclosure state. Detailed guide text is still present and grows the page when opened. Small increases in unchanged pages reflect larger footer text. Spanish is intentionally richer, not shorter.



| Route | Starting height | Final height |
|---|---:|---:|
| `/` | 9,572 | 8,742 |
| `/services` | 6,780 | 6,441 |
| `/auto-insurance-downey-ca` | 8,400 | 7,276 |
| `/home-insurance-downey-ca` | 8,329 | 7,240 |
| `/commercial-auto-insurance-downey` | 6,080 | 5,788 |
| `/sr22-insurance-downey` | 7,056 | 6,727 |
| `/no-license-auto-insurance-downey` | 7,458 | 6,286 |
| `/insurance-markets` | 4,399 | 4,472 |
| `/es` | 3,728 | 4,341 |
| `/about` | 6,293 | 6,185 |
| `/contact` | 3,138 | 3,148 |
| `/locations` | 4,955 | 4,621 |
| `/faq` | 4,088 | 4,098 |
| `/insurance/downey` | 7,058 | 4,614 |
| `/insurance/norwalk` | 7,081 | 4,637 |

Screenshots and measurements: `original-insurance/output/playwright/phase-three/`. Includes the 19 requested page/state families plus legal/404 utility views; quote deeper steps at 390/768/1440; comparison sheet `mobile-page-comparison.png`.

## Production requirements and remaining limitations

1. Restore the correct existing repository-root `.vercel/project.json` through the authorized linking process. Do not invent an identity or bypass the deployment assertion.
2. Verify the actual production Redis/settings credentials, admin password hash/session secret, and exact allowed origin.
3. Verify email sender, recipient, provider configuration, delivery events, and actual broker inbox receipt using an authorized synthetic launch test. Provider acceptance alone is not inbox proof.
4. Review native intake production settings intentionally, including the agency’s phone requirement and any custom wording/questions.
5. Verify Web3Forms routing and GA/Vercel analytics on the eventual deployed site without PII.
6. Complete professionally reviewed Spanish intake localization, including errors, consent, review/success, and a safe custom-question translation workflow, before claiming a Spanish digital quote form.
7. Obtain real team photography and business confirmation of parking/wheelchair-access claims. Do not manufacture portraits or strengthen unverified accessibility claims.
8. Obtain approved official carrier assets where useful; 21 carriers intentionally remain typographic entries.
9. Obtain live Search Console URL-level evidence before claiming indexing, ranking, canonical-resolution, or conversion improvements.
10. Real-device assistive technology review remains valuable; automated checks and desktop browser emulation are not exhaustive certification.

No production deployment or push occurred. Production remains outside the authority of this local implementation report. Any later release must use the repository’s approved deployment workflow after the blockers above are resolved and deployment is explicitly authorized.


## Exact Phase Three files changed or added

Compared against the starting SHA-256 manifest, excluding generated build/test output and local synthetic test-email/settings artifacts. Prior acquisition changes are not attributed to this phase.

- `docs/handoffs/PHASE_THREE_2026-10-13.md`
- `original-insurance/package.json`
- `original-insurance/scripts/qa-acquisition.mjs`
- `original-insurance/scripts/qa-intake-stress.mjs`
- `original-insurance/scripts/qa-intake-usability.mjs`
- `original-insurance/scripts/qa-phase-three.mjs`
- `original-insurance/src/components/AboutPage.astro`
- `original-insurance/src/components/AreaLinks.astro`
- `original-insurance/src/components/CarrierMarkets.astro`
- `original-insurance/src/components/CityPage.astro`
- `original-insurance/src/components/CoverageDiagram.astro`
- `original-insurance/src/components/CoverageExplorer.astro`
- `original-insurance/src/components/EditorialTrust.astro`
- `original-insurance/src/components/Footer.astro`
- `original-insurance/src/components/LocationsPage.astro`
- `original-insurance/src/components/MobileActions.astro`
- `original-insurance/src/components/Navigation.astro`
- `original-insurance/src/components/PageHero.astro`
- `original-insurance/src/components/ServiceAreaMap.astro`
- `original-insurance/src/components/ServicePage.astro`
- `original-insurance/src/components/ServicesPage.astro`
- `original-insurance/src/data/site.ts`
- `original-insurance/src/intake/context.ts`
- `original-insurance/src/intake/quote.ts`
- `original-insurance/src/pages/es.astro`
- `original-insurance/src/pages/index.astro`
- `original-insurance/src/pages/quote.astro`
- `original-insurance/src/scripts/analytics.ts`
- `original-insurance/src/scripts/site.ts`
- `original-insurance/src/server/email.ts`
- `original-insurance/src/styles/about.css`
- `original-insurance/src/styles/acquisition.css`
- `original-insurance/src/styles/areas.css`
- `original-insurance/src/styles/guides.css`
- `original-insurance/src/styles/index.css`
- `original-insurance/src/styles/intake-brand.css`
- `original-insurance/src/styles/intake.css`
- `original-insurance/src/styles/markets.css`
- `original-insurance/src/styles/motion.css`
- `original-insurance/src/styles/spanish.css`
- `original-insurance/src/styles/tokens.css`
