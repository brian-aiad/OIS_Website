# Original Insurance — post Phase Three refinement

October 13, 2026. Local implementation only. No commit, push, deployment, production settings change, Quotzal change, or RIA change in this refinement pass.

## Baseline and scope

Phase Three (`740d1bd`) is the foundation. Read `PHASE_THREE_2026-10-13.md` for the existing architecture and protected behaviors. The working tree already contained the silver-crossover asset, its shared `site.ts` import/alt text, and its provenance entry. Those changes are preserved and are not attributed to this refinement. The starting patch is in repository-root `output/playwright/refinement-baseline/starting.patch`.

The work concentrates on the shared market/broker section, footer, quote/admin presentation, and specific cross-page defects. It does not replace the design, intake, route system, or content strategy. DM Sans, the existing palette, real office photography, conceptual coverage illustrations, and technical SVG language remain.

## Markets and carrier presentation

- Replaced the airy outlined OI box and disconnected diagram with a compact navy sequence: customer needs → independent agency → available markets. Its finite connector drawing uses the existing cinematic token. Mobile recomposes it into readable stacked steps and a compact category row.
- Carrier groups now pair a short explanatory/action column with a white logo directory. Official artwork retains its own colors and proportions. Optical sizing distinguishes wide wordmarks from compact marks. Property uses three desktop columns to accommodate nine entries without a mostly empty final row.
- Homepage now includes the complete 8/9/7 lists instead of showing four entries beneath counts of eight, nine, and seven. Category filtering still defaults to Auto there; all groups and links remain server rendered and visible without JavaScript. This adds useful mobile content rather than hiding names to hit a height target.
- Category counts accompany desktop filters. Keyboard-operated pressed states remain. A short mask/position transition applies to the changing directory as a unit; removed per-logo stagger rules. Enlarged-text filter overflow found during QA was fixed with wrapping.
- Auto and Property offer specific quote links in addition to guides. Commercial offers business help through `type=other`, preserving the distinction between broad business markets and commercial auto. City/Spanish referral context travels through these links via the existing allowlisted system.
- Preserved all relationship names, qualifications, trademark notice, and availability language. No new eligibility, acceptance, pricing, or endorsement claim.

### Actual carrier logos requested during the pass

18 authentic logo assets were added, bringing visual artwork to **21 of 24** entries. No logo was generated, traced, reconstructed, or taken from a third-party logo library.

- Auto: added Kemper, National General, MAPFRE, Hagerty, Aspire, Bridger; retained Bristol West.
- Property: added Aegis, American Modern, Pacific Specialty, Cabrillo Coastal, Arrowhead, Bamboo, Delos, Lightspeed; retained Foremost.
- Commercial: added NEXT Insurance, Hiscox, THREE, Blitz; retained Chubb.
- NEXT uses its current official ERGO | NEXT lockup. The existing relationship name remains NEXT Insurance.
- Progressive, CNA, and Attune remain intentionally typographic. Their official guidance raises specific agency-use approval requirements; Progressive also distinguishes California agency-auto branding, and CNA asset retrieval was blocked. No agency approval evidence or alternative authorized artwork was supplied. Do not replace these with invented or unofficial logos.

Exact official pages, artwork URLs/selectors, processing, and exception evidence:

- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_AUTO.md`
- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_PROPERTY.md`
- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_COMMERCIAL.md`

Source verification is not a claim that carriers endorsed the site or granted a new license. Actual SVGs were rasterized using existing Sharp; PNGs are processed into responsive WebP by Astro. No dependency was added. Three auto SVG originals are retained in `docs/brand-assets/carriers/`; other raw research artifacts remain in ignored output.

## Footer

All useful destinations remain. Contact, coverage, and company/help have tighter grouping, readable normal-case headings, and a compact lower utility row. Social links move out of the long desktop company column; mobile retains them in its native disclosure. A Text action replaces the duplicated phone entry. Spanish keeps translated navigation and the explicit English-form notice.

Measured footer heights, before → after:

| Width | Height |
|---|---|
| 390 | 544 → 500px |
| 768 | 711 → 587px |
| 1440 | 697 → 587px |

Footer layout now belongs to `footer.css`, imported by the component. Removed footer-only rules from global, experience, refinement, and Spanish styles rather than layering another late override. Existing reduced-motion behavior and keyboard-native disclosures remain. Link/phone-arrow feedback uses existing timing tokens.

## Quote and admin

Presentation only; customer field IDs, schema, configuration, security, validation, context, VIN, email, retry/idempotency, and storage boundaries are unchanged.

- Quote entry is denser, with a clear blue selected-coverage panel and visible Change action. Removed only the redundant entry emblem. Progress and selected states share brand blue; success/status semantics retain green.
- More consistent question headings, review surfaces, form borders, focus treatment, success styling, and subtle step movement. Reduced motion disables the new movement.
- Preset Auto at 390px is approximately 1,022px versus 1,175px before; Continue is about 160px earlier. Local-preview messaging remains visible and truthful.
- Admin heading is now “Quote form settings,” with direct editing instructions instead of a marketing phrase. Mobile saved/unsaved state stays visible. Question controls, draft feedback, preview grouping, and labels are clearer.
- Saved local settings remain authoritative, including the existing phone requirement. Focused draft/discard checks left the settings file byte-identical; integration suites intentionally save and restore settings through supported mechanisms, advancing metadata as before.
- Updated the two exact admin-heading locators in the intake suite; assertions were not weakened.

## Other pages and visual review

Reviewed Homepage, Services, all five coverage guides, Markets, Spanish, About, Contact, Locations, FAQ, Downey/Norwalk/Commerce, legal pages, 404, quote entry/details, admin login and authenticated studio. Shared refinements apply to all twelve city routes.

Specific fixes:

- All five guide summary grids had lost container centering through a global margin rule. A scoped family rule restores alignment with the hero and diagram at desktop/tablet widths.
- Services jump navigation now exposes “More insurance,” so Life/Motorcycle/RV/Boat are discoverable before scrolling the main product rows.
- Related coverage links use a useful “Coverage guide” helper instead of repeating the product name. Their crop, radius, motion, and secondary text follow the shared system.
- FAQ/legal topic and support text is more readable; legacy warm borders/focus styling use the existing tokens.

Retained strong working sections: homepage proposition and artwork, real office modules, explorer, exact reviews, map, native FAQ, current Spanish content, contact channels/form, practical location introduction, city/service-area truth, legal content, and utility navigation. They were inspected, not arbitrarily rewritten. Google’s third-party map can show the existing fallback when external loading is blocked; directions links remain available. Real-world external map delivery still depends on the provider.

## Style and motion ownership

`markets.css` now owns broker/market presentation, responsive rules, counts, and connector drawing; removed corresponding acquisition overrides and per-logo stagger. `footer.css` owns footer layout. Intake presentation remains explicitly in `intake-brand.css`; core form CSS/logic is retained. Family fixes stay in guides/information CSS.

This is controlled consolidation, not a claim that all historic CSS layering is gone. No new animation library, frontend framework, hydration runtime, font, or theme was introduced. No continuous animation, scroll hijacking, or hover-dependent information was added. No old asset evidence was deleted.

## Validation and evidence

All checks ran locally. Mutating intake suites ran sequentially and restored saved configuration through the supported mechanism. Captured emails were synthetic local test output; no real messages were sent.

| Check | Result |
|---|---|
| Production build / Astro check | PASS — 30 pages; 0 errors, warnings, or hints |
| ESLint / format check / diff whitespace | PASS |
| Schema validation | PASS — 29 pages |
| SEO browser | PASS — 27 indexable routes, metadata, headings, links/anchors, images, languages |
| SEO lint | Known blocker only: missing repository-root Vercel project link; preceding content checks pass |
| `test:site` | PASS — 27 routes × 11 widths; zero automated accessibility findings; navigation, routing, reduced motion, no-JS, mocked contact success/error |
| `test:intake-server` | PASS — migration, validation, security, origin/cookies/rates, email escaping/filtering/idempotency, storage and provider failures, VIN |
| `test:intake` | PASS — authentication, configuration/conflicts, eight submissions, repeat entries, validation/retry, captured email |
| `test:intake-usability` | PASS — custom editing, placement/focus, preview, discard/conflicts, review correction, preserved answers |
| `test:intake-stress` | PASS — eight flows, six custom answer types, ten drivers/vehicles, VIN races/failures, 68 axe scans |
| `test:acquisition` | PASS — A–G journeys, contexts, removable prefill, Spanish, local email, analytics privacy, FAQ/map/guide |
| `test:responsive` | PASS — 30 landscape/tablet/zoom-equivalent/150%-text checks; admin login accessibility and studio |
| `test:phase-three` | PASS — 63 final screenshots, 21 axe scans, city-through-guide context, Spanish header context, editable preset, eight widths, reduced motion, no page errors |
| New `test:refinement` | PASS — 30 layouts from 320–1920, 12 axe scans, complete 24-entry lists, keyboard filters, category quote contexts, no-JS links/content, reduced motion, loaded image assertions |
| Focused footer | PASS — 20 English/Spanish layouts, six axe scans, keyboard disclosures, reduced motion |
| Focused quote/admin | PASS — 30 layouts at ten widths, 12 axe scans, no page errors, draft/discard, preview and error states |
| Focused page families | PASS — 45 layouts, nine axe scans, guide-grid alignment and service jump link |

A new regression script is exposed as `npm run test:refinement`. The existing Phase Three script accepts `OIS_SCREENSHOT_DIR` to keep evidence isolated. Full-page capture explicitly loads and decodes offscreen images before capture, so screenshots show the real logos rather than lazy placeholders; production lazy loading is unchanged.

### Screenshot and log locations

Paths below are relative to the app unless otherwise stated. Output is intentionally ignored by Git.

- `output/playwright/refinement/`: original market baseline, final homepage/markets/About/Spanish at 390/768/1440, measurements, market review images.
- `output/playwright/refinement-final/`: 21 page/state families × 390/768/1440, quote deeper state, measurements, mobile comparison sheet.
- `output/playwright/refinement-footer/`: English/Spanish before/after and viewport/accessibility results.
- `output/playwright/post-phase-three-intake/`: quote/details/login/studio before/after at three widths, draft, preview and error captures; focused checks.
- `output/playwright/refinement-review/`: 17 public routes at three widths, family after-captures, property-logo contact sheet.
- `output/refinement-*.log`: build/lint/format/SEO/schema, all browser/intake suites, Lighthouse process logs.
- `output/lighthouse/refinement-*-mobile.json`: local production-build Lighthouse reports.

### Local production-build performance

Lighthouse laboratory measurements on localhost:3012, with browser suites finished first. These are not field or live-site results.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 | 1.81s | 0.000 | 0ms |
| Markets | 100 | 100 | 100 | 100 | 1.51s | 0.000 | 0ms |
| Spanish | 100 | 100 | 100 | 100 | 1.59s | 0.000 | 0ms |

Homepage marketing CSS is 119,018 bytes / 22,381 gzip (Phase Three: 118,722 / 22,252). Its marketing JavaScript is unchanged at 12,143 / 4,348 gzip. This measures the referenced entry assets, not every route's total transfer. Logos remain lazy, dimensioned Astro images; new PNG source files total approximately 348KB including the three retained originals. No new dependencies/fonts/runtimes.

### Final approximate mobile heights

At 390px, default disclosure/filter states. Footer is included. Homepage is about 110px longer than Phase Three because the initial Auto market view now exposes all eight names rather than four. That is an intentional trust/discovery tradeoff, not a claim that every page became shorter.

| Route | Height |
|---|---:|
| `/` | 8,852px |
| `/services` | 6,398px |
| `/auto-insurance-downey-ca` | 7,273px |
| `/home-insurance-downey-ca` | 7,239px |
| `/commercial-auto-insurance-downey` | 5,746px |
| `/sr22-insurance-downey` | 6,722px |
| `/no-license-auto-insurance-downey` | 6,281px |
| `/insurance-markets` | 4,536px |
| `/es` | 4,189px |
| `/about` | 6,165px |
| `/contact` | 3,105px |
| `/locations` | 4,578px |
| `/faq` | 4,060px |
| `/insurance/downey` | 4,571px |
| `/insurance/norwalk` | 4,594px |
| `/insurance/commerce` | 4,633px |
| `/quote?type=auto` | 1,022px |
| `/admin` | 1,000px |
| `/privacy` | 3,655px |
| `/accessibility` | 2,519px |
| `/404` | 1,295px |


## Production and future work

- Repository-root `.vercel/project.json` is still absent. SEO lint's project-link assertion remains intact; do not invent a project identity or bypass it.
- Production native-intake Redis/settings, admin/session secrets, allowed origins, email sender/recipient, actual inbox delivery, Web3Forms routing, and analytics still require authorized production verification.
- No live Search Console evidence, field performance, ranking, indexing, or conversion improvement is claimed.
- Complete professionally reviewed Spanish intake translation remains deferred; the form is English with Spanish assistance preference.
- Obtain real team photographs and business confirmation of existing parking/access claims.
- Obtain approved Progressive/California, CNA, and Attune agency assets or authorization before replacing text entries.
- Real-device screen-reader and broker/customer usability testing remain useful follow-up work.

Do not casually touch canonical URLs, redirects/410, schema, saved-setting migration, field IDs, custom-answer filtering, origin/rate/auth controls, email behavior, context allowlists, analytics privacy, exact reviews, market qualifications, reduced motion, or no-JavaScript marketing content. Do not reconnect OIS to Quotzal or modify RIA.

## Exact refinement files changed or added

Excludes the pre-existing `site.ts`/crossover asset change. The provenance file includes a new official-logo section while preserving its earlier crossover entry. Generated build/QA output and local synthetic settings/mail are excluded.

- `docs/brand-assets/carriers/bridger-official.svg`
- `docs/brand-assets/carriers/hagerty-official.svg`
- `docs/brand-assets/carriers/kemper-official.svg`
- `docs/handoffs/POST_PHASE_THREE_REFINEMENT_2026-10-13.md`
- `docs/rebuild/ASSET_PROVENANCE_2026-10-12.md`
- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_AUTO.md`
- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_COMMERCIAL.md`
- `docs/rebuild/CARRIER_LOGO_SOURCES_2026-10-13_PROPERTY.md`
- `original-insurance/package.json`
- `original-insurance/scripts/qa-intake.mjs`
- `original-insurance/scripts/qa-phase-three.mjs`
- `original-insurance/scripts/qa-refinement.mjs`
- `original-insurance/src/assets/carriers/aegis.png`
- `original-insurance/src/assets/carriers/american-modern.png`
- `original-insurance/src/assets/carriers/arrowhead.png`
- `original-insurance/src/assets/carriers/aspire.png`
- `original-insurance/src/assets/carriers/bamboo.png`
- `original-insurance/src/assets/carriers/blitz.png`
- `original-insurance/src/assets/carriers/bridger.png`
- `original-insurance/src/assets/carriers/cabrillo-coastal.png`
- `original-insurance/src/assets/carriers/delos.png`
- `original-insurance/src/assets/carriers/hagerty.png`
- `original-insurance/src/assets/carriers/hiscox.png`
- `original-insurance/src/assets/carriers/kemper.png`
- `original-insurance/src/assets/carriers/lightspeed.png`
- `original-insurance/src/assets/carriers/mapfre.png`
- `original-insurance/src/assets/carriers/national-general.png`
- `original-insurance/src/assets/carriers/next-insurance.png`
- `original-insurance/src/assets/carriers/pacific-specialty.png`
- `original-insurance/src/assets/carriers/three.png`
- `original-insurance/src/components/BrokerConnection.astro`
- `original-insurance/src/components/CarrierLogo.astro`
- `original-insurance/src/components/CarrierMarkets.astro`
- `original-insurance/src/components/Footer.astro`
- `original-insurance/src/components/ServicePage.astro`
- `original-insurance/src/components/ServicesPage.astro`
- `original-insurance/src/data/carriers.ts`
- `original-insurance/src/intake/admin.ts`
- `original-insurance/src/styles/acquisition.css`
- `original-insurance/src/styles/experience.css`
- `original-insurance/src/styles/footer.css`
- `original-insurance/src/styles/global.css`
- `original-insurance/src/styles/guides.css`
- `original-insurance/src/styles/information.css`
- `original-insurance/src/styles/intake-brand.css`
- `original-insurance/src/styles/markets.css`
- `original-insurance/src/styles/refinement.css`
- `original-insurance/src/styles/spanish.css`
