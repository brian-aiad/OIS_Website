# AI Workflow

This repo is shared between Codex and Claude. Keep instructions short, current, and consistent so agents do not reverse each other's work.

## Project Facts

- Site: `https://originalinsurance.net`
- Business: Original Insurance Services, Downey CA
- Stack: React 19, Vite 7, TypeScript, Tailwind, React Router
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

`npm run build` performs TypeScript checking, Vite build, and Playwright prerendering for all 22 routes.

## Deployment Rules

- Deploy from repo root with `bash scripts/deploy.sh`.
- Do not use GitHub/Vercel push deploys as the source of truth for production. The deploy script preserves prerendered HTML.
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
- Do not add `LocalBusinessSchema` to `/faq`, `/about`, `/contact`, or `/services`.
- Do not emit `FAQPage`, `Review`, or `AggregateRating` JSON-LD. Google deprecated FAQ rich results and GSC flags the old FAQ/review schema as invalid. Keep visible FAQ and review content only.
- Every prerendered route needs one self-referencing canonical.

## File Organization

- Human docs live under `docs/`.
- Brand source files live under `docs/brand-assets/`.
- App images used by the website live under `original-insurance/public/images/`.
- Imported React assets live under `original-insurance/src/assets/`.
- Do not keep raw audit JSON in git; keep summaries only.

## Current Important Docs

- `docs/handoffs/HANDOFF_CLAUDE_2026-05-26.md`
- `docs/seo/SEO_CONVENTIONS.md`
- `docs/seo/CHANGELOG-SEO.md`
- `docs/ops/PHOTOGRAPHY_NEEDS.md`
- `docs/ops/REVIEW_ACQUISITION_PLAYBOOK.md`
