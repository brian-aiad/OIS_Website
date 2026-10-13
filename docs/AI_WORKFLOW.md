# AI Workflow

This repo is shared between Codex and Claude. Keep instructions short, current, and consistent so agents do not reverse each other's work.

## Project Facts

- Site: `https://originalinsurance.net`
- Business: Original Insurance Services, Downey CA
- Stack: Astro 7.3.5, TypeScript, native CSS, static HTML
- App directory: `original-insurance/`
- Dev server: `http://localhost:3002`
- Deployment: Vercel, using repo-root `scripts/deploy.sh`

## Required Local Checks

Run from `original-insurance/` after source, asset, routing, or SEO changes:

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
```

`npm run build` performs Astro/TypeScript checking and builds 25 canonical content routes plus `/quote` and `/admin` (both noindex) and a real 404 page. `npm run test:site` checks the production output with Playwright and axe.

## Deployment Rules

- Deploy from repo root with `bash scripts/deploy.sh`.
- Do not use GitHub/Vercel push deploys as the source of truth for production. The deploy script preserves the validated Astro HTML and matching hashed assets.
- `original-insurance/vercel.json` intentionally cancels automatic Git builds. Continue using the reviewed prebuilt deployment pipeline; do not re-enable automatic publishing during this migration.
- Keep `.vercel/project.json`; it links this repo to the Vercel project.
- Generated `.vercel/output/`, `dist/`, `.vite/`, raw Lighthouse JSON, and temp screenshots are disposable.

## SEO Routing Rules

- Canonical URLs do not have trailing slashes.
- `original-insurance/vercel.json` intentionally redirects trailing-slash sitemap routes to clean canonical paths.
- `/index.html` redirects to `/`.
- `/SITEMAP.XML` redirects to `/sitemap.xml`.
- `/cdn-cgi/l/email-protection` rewrites to `/api/gone` and returns `410`.
- `?q=` URLs are stripped by `original-insurance/middleware.js` with `308`.
- `robots.txt` must keep `Disallow: /*?q=`.
- Do not add a catch-all rewrite from `/(.*)` to `/index.html`; it bypasses prerendered route HTML and creates soft-404 `200` responses for unknown URLs.

## Schema Rules

- `LocalBusinessSchema` belongs on homepage and city/money pages where explicitly used.
- Do not add `LocalBusinessSchema` to `/faq`, `/about`, `/contact`, `/services`, `/privacy`, or `/accessibility`.
- Do not emit `FAQPage`, `Review`, or `AggregateRating` JSON-LD. Google deprecated FAQ rich results and GSC flags the old FAQ/review schema as invalid. Keep visible FAQ and review content only.
- Homepage `WebSite` schema must not include `SearchAction`, `potentialAction`, or `{search_term_string}` query templates.
- Every prerendered route needs one self-referencing canonical.

## File Organization

- Human docs live under `docs/`.
- Brand source files live under `docs/brand-assets/`.
- App images used by the website live under `original-insurance/public/images/`.
- Imported Astro image assets live under `original-insurance/src/assets/`.
- Do not keep raw audit JSON in git; keep summaries only.

## Current Important Docs

- `docs/handoffs/HANDOFF_CLAUDE_2026-05-26.md`
- `docs/seo/SEO_CONVENTIONS.md`
- `docs/seo/CHANGELOG-SEO.md`
- `docs/ops/PHOTOGRAPHY_NEEDS.md`
- `docs/ops/REVIEW_ACQUISITION_PLAYBOOK.md`

## Current rebuild (2026-10-05)

- See `docs/handoffs/REBUILD_2026-10-05.md` for the route inventory, issue matrix, validation and remaining external work.
- `src/data/pages.json` preserves the original 25 canonical routes (now 27 with the assistance and market pages); `src/data/site.ts` owns business contact details.
- Quote requests use the native `/quote` intake flow and `/api/intake`; `/admin` manages field settings. Web3Forms remains the general contact form only. See `docs/ops/INTAKE_SETUP.md`.
- Quote buttons navigate to `/quote`. The intake and admin require JavaScript; the quote page provides a phone fallback without JavaScript.
- Public email: `contact@originalinsurance.net`. Mailbox setup and the Web3Forms recipient are account-side configuration.
- Follow `docs/ops/VISUAL_SYSTEM_2026-10-12.md`: navy, white, and blue-gray surfaces; DM Sans throughout, with technical line illustrations; consistent framed coverage illustrations. Real office photographs identify the actual business. Do not restore the previous beige/oversized-serif review treatment.

## Quote module handoff (2026-10-12)

- Read `docs/ops/INTAKE_SETUP.md` and `docs/ops/INTAKE_REUSE.md` before changing the intake module.
- Standard question IDs and validation are stable; custom questions/wording are part of saved settings. Use the configured catalog in rendering, validation, and email so custom answers cannot disappear.
- Run `test:intake-server`, then local `test:intake` and `test:intake-stress` sequentially. The browser suites temporarily modify settings and restore them. Never point them at production.
- No production customer archive or payment system exists. Local mode captures synthetic emails in an ignored directory. Do not promise that the email provider/mailbox retains no data.
- Agency operational identity is in `src/intake/agency.ts`; brand assets/layouts still require adaptation for a future RIA installation.

- The follow-up usability changes and verification are in `docs/ops/INTAKE_USABILITY_REVIEW.md`. `test:intake-usability` covers direct review corrections, question placement/movement, preview controls, sharing state, and conflict recovery; run it sequentially with the other local browser suites.

## Visual refinement (2026-10-12)

- Shared design tokens live in `src/styles/tokens.css`; the marketing stylesheet entry is `src/styles/index.css`, with family rules before `refinement.css`. Keep this import order stable.
- `CoverageExplorer.astro` progressively enhances three static, linked coverage panels into keyboard-accessible tabs. Keep no-JavaScript guide access.
- `Reviews.astro` preserves supplied review text. One featured review and two distinct supporting reviews are manually controlled; no autoplay, invented rating, or review schema.
- Intake presentation uses `intake-brand.css` and shared tokens. Its operational behavior remains separate from marketing scripts.
- The checkout was already missing repo-root `.vercel/project.json` at the start of this pass. SEO lint reaches that final assertion and fails there. Do not fabricate project IDs or bypass the check; restore the correct existing project link before deployment.

## Acquisition rebuild (2026-10-12, authoritative follow-up)

- Read `docs/handoffs/ACQUISITION_REBUILD_2026-10-12.md` and `docs/rebuild/ASSET_PROVENANCE_2026-10-12.md`. These supersede earlier visual notes where they differ.
- 27 content routes; `/es` is Spanish human-assistance content, not a full translated form. `/insurance-markets` contains the user-supplied 24-market network.
- All contextual quote links use `src/intake/context.ts`; server cleaning is mandatory. Do not leak form values into analytics.
- Styles end with `acquisition.css`; DM Sans is the only loaded type family. Conceptual coverage illustrations, actual office photography and technical SVG graphics are the three visual modes.
- New checks: `test:acquisition`, `test:responsive`, `test:seo-browser`. See handoff for lab performance and final validation. No deployment performed; the missing Vercel project link remains an external setup gate.
