# Original Insurance — acquisition rebuild handoff

Completed locally October 12, 2026. **No production deployment or push.** OIS is at `original-insurance/`; Quotzal and RIA were not changed. This work integrates the existing uncommitted visual refinement rather than replacing or discarding it. The initial tracked patch, source snapshot, route crawl and 56 baseline screenshots are preserved in ignored `output/playwright/acquisition-baseline/`.

## Customer journeys and quote conversion

- Auto, home and commercial-auto pages preselect the relevant coverage. Navigation, hero, inline, final and mobile quote links share `src/intake/context.ts`.
- SR-22 and license-situation pages carry visible, removable context into the auto form. SR-22 prefill can be removed without erasing a customer-edited answer. Changing coverage remains possible.
- City links retain an allowlisted source city, explicitly a referring page rather than the customer's residence. Arbitrary query text is discarded server-side.
- Before coverage selection, progress says **Getting started**. Once the path is known it shows its actual steps; no misleading initial step count.
- Mobile selection uses compact two-column choices. Navigation preserves entered answers in memory. Existing review/edit, driver/vehicle summaries, custom questions and optional VIN lookup remain functional.
- New default configuration makes phone optional, except when call/text is the preferred contact method. Previously saved agency requirements remain intact.
- Broker emails include relevant request context and language preference. No customer-answer database was added. Email providers and broker mailboxes can retain messages; local testing intentionally captures synthetic messages.
- Existing customers have a distinct contact path for policy questions/documents/changes rather than being forced into quote intake. Changes require agency confirmation.

The persona/funnel map is in [the audit record](../rebuild/ACQUISITION_REBUILD_PROGRESS.md). Browser tests cover homepage→auto→quote, SR-22, Spanish, commercial, existing customer, office visit and city landing journeys.

## Homepage and visual system

The homepage now leads with **Insurance options. A local team.**, clear quote/phone actions, coverage discovery, genuine office evidence, carrier access, an independent-agency diagram, a short process, supplied reviews and local geography. Additional coverage and office services are discoverable through linked categories rather than another wall of equal cards.

Three complementary visual modes are authoritative: real office photography for evidence; coordinated architectural editorial illustrations for conceptual auto/home/business scenes; technical SVG line graphics for explanations, documents, processes and maps. No generated staff, customer portraits or fake office photographs were added.

Four new generated illustrations replace the inconsistent idealized scenes on the homepage and primary product pages. SR-22 and license pages use explanatory document diagrams in the hero. All city heroes use the actual Downey office, with service-area wording. Seven code-generated social sharing templates cover default, auto, home, commercial, SR-22, license and Spanish contexts.

DM Sans is now the sole loaded font family. Navy, blue, cool white and a restrained warm accent share global tokens. Small controlled corners and technical line details replace oversized serif accents, botanical decorations and unrelated paper artwork. See [asset provenance and generation notes](../rebuild/ASSET_PROVENANCE_2026-10-12.md).

Motion uses shared 160/260/650/1000ms durations, entrance/exit curves, 12px reveal distance and 1.025 image zoom. Added/coordinated moments include hero masks, coverage transitions, carrier reveals, broker connection lines, diagram assembly, map connections, process entrances, FAQ chevrons and button arrows. Reduced motion produces immediate usable states. Whole-page view transitions were removed after rapid navigation exposed aborts; static-content opacity remains readable during entrances. No animation framework, custom cursor, scroll hijacking, idle marquee or autoplay review was added.

## Coverage, carriers and local pages

- Coverage guides keep their useful server-rendered content but group secondary explanations in native accordions. Jump links open the relevant explanation. Related coverage and quote actions remain crawlable.
- Repeated large review modules were removed from coverage/city/catalog pages. Supplied reviews remain unaltered where retained.
- Mobile full-page comparison at 390px: auto **26% shorter**, home **21%**, commercial auto **24%**, SR-22 **17%**, license **10%**. Homepage is **20% longer** because it now explains carrier access and agency choice; this is a tradeoff, not a claim that every page became shorter.
- `/insurance-markets` presents all **24 user-supplied companies/markets**, grouped into auto, property and commercial. Homepage presents a curated selection; service pages show relevant categories. Availability is qualified, with no rates, acceptance guarantees or universal product claims.
- `CarrierLogo` normalizes image sizing/whitespace and labels. **Three official logo assets** are used (Chubb, Foremost, Bristol West); remaining entries are ordinary brand names pending suitable approved assets. No logos were fabricated or arbitrarily recolored. Chubb attribution is retained.
- Census-positioned service-area artwork distinguishes one Downey office from twelve served cities. Connections are orientation graphics, not driving routes. Mobile has readable scrollable map geometry and ordinary city links.
- All twelve city routes retain their distinct useful advice. Fake city imagery was removed. Downey metadata emphasizes the actual office; surrounding pages say they are served from Downey.
- Location puts address, hours, directions and calling ahead of decorative photography. About retains repository-supported history and real office imagery. No invented parking facts, branches, ratings, statistics or team members.

## Spanish, navigation and support

`/es` is a genuine Spanish assistance hub with Spanish coverage guidance, process, office information, call/text and existing-customer help. Its HTML language and schema language are Spanish, and it self-canonicalizes. The language link retains the originating service context; English-form links preserve coverage, special need and Spanish preference.

**It is not a fully translated quote workflow or a set of equivalent translated service pages.** It explicitly says the online form is English and offers Spanish human assistance. No misleading hreflang pairs were invented. Full reviewed Spanish form labels/errors/review/success and matched service translations remain future work if the business wants them.

Navigation/footer now expose insurance markets and Spanish help. The mobile action bar provides call/text/contextual quote with reserved content space; it becomes static in short landscape. FAQ search enhances existing rendered answers and has result/no-result feedback. Contact distinguishes new quotes from current-policy support. The 404 provides useful recovery links. Legal pages remain restrained. Admin remains operational: its existing question editor, draft/save/preview/share model is preserved, and the login password control now meets the tested touch-target size.

## SEO and analytics

There are **27 indexable canonical content routes**, up from 25, plus quote/admin/404. No thin carrier pages or duplicated city variants were created. Source registry, sitemap and slash redirects include the two new routes. Admin, quote and 404 are excluded from the content sitemap. Existing legacy redirects, query cleanup and gone-page handling were retained.

All 27 rendered pages were checked for exact title/description/canonical, title uniqueness, one H1, heading order, internal paths/anchors, image alt attributes and language/schema inventory. Priority auto, SR-22 and city snippets were refined. Homepage vs Downey intent is distinguished. Business identity/contact information stays consistent; InsuranceAgency identity uses the main site and actual office imagery. Unsupported FAQ/review/rating/search-action schema remains absent. Source notes and prior Search Console findings were reviewed; unknown account-side indexing URLs were not claimed as resolved.

Seven consistent social templates replace a mismatched generic sharing image. Responsive AVIF/WebP images and explicit dimensions reduce transfer/layout shift. Existing favicon/brand details remain intact.

`Analytics.astro` and `src/scripts/analytics.ts` preserve the existing GA property and Vercel integrations. Custom events distinguish quote start/coverage/step/submit, contact submission, call/text/directions, carrier category, Spanish switch and coverage views. Event parameters are restricted to allowlisted route/category/step/placement values. Form answers, names, contact details, VINs and sensitive need context are excluded. GA page URLs/referrers strip query strings; admin has no analytics. Account-side enhanced-measurement settings and live event receipt still require production account access.

## Validation

| Check | Result |
|---|---|
| ESLint; Prettier; git diff whitespace | Pass |
| Astro check + production build | Pass, 30 pages |
| Schema validation | Pass, 29 HTML pages checked |
| Site browser suite | Pass, 27 routes × 11 widths (320–2560px), zero automated axe findings; images, keyboard menus, interactions, contact success/failure, reduced motion and no-JS checks |
| Acquisition journeys | Pass, seven journey families, 10 accessibility scans, context/email checks and analytics privacy canaries |
| Extra responsive | Pass, 30 landscape/tablet/200%-equivalent-layout/150%-text checks; mobile admin login axe and studio capture |
| Rendered SEO browser audit | Pass, all 27 content pages |
| Intake server/browser/stress/usability | Pass; auth/rate/CSRF/config/email mocks, all eight types, 68 stress accessibility scans, ten drivers/vehicles, VIN failures/races, custom questions and save conflicts |
| SEO lint | Source checks pass; final pre-existing missing repo-root `.vercel/project.json` assertion fails. Do not fabricate an ID or bypass it. |

Local production Lighthouse results (performance/accessibility/best practices/SEO): homepage mobile **100/100/100/100**, LCP **1.8s**, CLS **0**, TBT **0ms**; homepage desktop **100 across all**, LCP **0.4s**; auto and Spanish mobile **100 across all**, LCP **1.5s**, CLS **0**. These are local lab results, not field Core Web Vitals or measured production INP. Production-only analytics scripts were not active on localhost. Automated accessibility checks are evidence, not a guarantee of every assistive-technology combination.

## File inventory and evidence

New principal components: `Analytics`, `BrokerConnection`, `CarrierLogo`, `CarrierMarkets`, `LineAccent`, `LineMotif`, `MobileActions`, `ServiceAreaMap`, plus the integrated pre-existing `CoverageExplorer`. New data/modules: `carriers.ts`, `service-area.ts`, `intake/context.ts`, `scripts/analytics.ts`. New pages: `es.astro`, `insurance-markets.astro`. Central styles: `tokens.css`, `acquisition.css`, integrated `refinement.css` and `intake-brand.css`.

Removed `JourneyLine.astro`; replaced `PaintedAccent.astro` with `LineAccent.astro`. Old unused artwork is not automatically deleted from the repository. Four generated raster sources, three official carrier sources and seven SVG/JPEG social pairs were added. Shared page families, layouts, server email/intake, metadata registry, sitemap and tests were updated.

New repeatable scripts: `test:acquisition`, `test:responsive`, `test:seo-browser`, `generate:social`. Existing site/schema/intake scripts gained relevant assertions. Browser suites that edit local form settings must run sequentially and never against production.

Ignored local evidence:

- `output/playwright/acquisition-baseline/`: before screenshots/source snapshot.
- `output/playwright/after-*.png`, `qa-results.json`: final full-page screenshots and route/width audit.
- `output/playwright/acquisition-comparison.html` and `.png`: before/after contact sheet.
- `output/playwright/acquisition-page-lengths.json`: mobile page-height comparison.
- `output/playwright/acquisition-journeys/`, `acquisition-final/`, `acquisition-seo-audit.json`: journey, responsive/admin and metadata evidence.
- `original-insurance/output/lighthouse/`: JSON/HTML performance reports; sibling acquisition logs record build/schema/SEO/responsive execution.

## Production boundaries and recommended next content

No deployment was performed. Restore the correct existing Vercel project link before the deployment gate; configure production intake settings store, admin secrets and verified email sender/recipient per [INTAKE_SETUP](../ops/INTAKE_SETUP.md). Real email delivery, production analytics and account-side contact routing need one synthetic verification after an authorized deployment. Tests here sent no customer email.

For later improvement, request real team portraits/group photo with permission, updated office/entrance photos, confirmation of walk-in/parking instructions, approved carrier assets, professionally reviewed Spanish service/form translations, and URL-level Search Console exports. Keep existing supplied facts until the business confirms changes. Do not invent missing information.

For RIA, follow [INTAKE_REUSE](../ops/INTAKE_REUSE.md): this remains a website-native branded intake service, independent of Quotzal, with separate per-agency identity/settings/credentials. Monthly billing is a business agreement, not implemented subscription software.
