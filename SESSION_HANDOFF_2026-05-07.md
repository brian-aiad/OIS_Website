# Session Handoff - May 7, 2026

## User Goal

Brian asked for the Original Insurance website to look more professional, feel less generic, flow better across every page, keep only necessary content, incorporate real insurance/brokerage context, improve the quote widget, and test everything before committing, pushing, and deploying.

## Current Status

The UX revamp is implemented, committed, pushed, and deployed to production.

- Production site: https://originalinsurance.net
- Latest production deployment URL: https://ois-website-k1dwr2lza-aiadcollc.vercel.app
- Live verification: passed all checks
- Working tree after deploy: clean

## Commits From This Session

1. `69d28f45` - `Revamp insurance UX and quote flow`
   - Main visual/content/quote-widget revamp.

2. `2c6642ba` - `Harden deploy copy step for Git Bash`
   - First deploy-script hardening for Git Bash on Windows.

3. `bad4866c` - `Handle duplicate deploy metadata copies`
   - Second deploy-script hardening for duplicate sitemap/robots copies.

4. `343654a8` - `Snapshot prerender output before Vercel build`
   - Final deploy fix. This snapshots prerendered HTML before `vercel build` rewrites app `dist`, then copies that snapshot into `.vercel/output/static`.

All commits were pushed to `origin/main`.

Note: GitHub prints a moved-repository warning and says to use `https://github.com/brian-aiad/OIS_Website.git`, but the push to the existing remote still succeeded.

## Main UX Work Completed

### Shared Insurance Workflow

Added `original-insurance/src/components/InsuranceWorkflow.tsx`.

This component gives the pages a more real brokerage feel:

- Quote process steps
- Carrier appetite/matching context
- Documents checklist
- Call and quote actions
- Insurance-specific copy without filler

It was added to:

- Home
- About
- Services
- Contact
- City landing template, including `/insurance/downey`
- `/auto-insurance-downey-ca`
- `/sr22-insurance-downey`
- `/no-license-auto-insurance-downey`
- `/commercial-auto-insurance-downey`

Because `CityLanding.tsx` is the shared city template, the pattern applies across all city pages.

### Quote Widget

Rebuilt `original-insurance/src/components/QuoteWidget.tsx`.

Key changes:

- More professional floating CTA with `ClipboardCheck` icon
- Larger modal layout
- Desktop left-side brokerage context panel
- Embedded Quotzal iframe still works
- Phone fallback is visible
- Checklist explains what users need before quoting
- Loading state added
- Body scroll lock works when modal is open
- Modal behaves on desktop and mobile without horizontal overflow

### CTA And Footer Polish

Updated:

- `original-insurance/src/design-system/components/CTASection.tsx`
- `original-insurance/src/components/Footer.tsx`

Changes:

- Removed ambient decorative glow style from CTA
- Added practical trust chips: licensed CA broker, 30+ carriers, call/text/walk-in
- Replaced emoji-style footer badges with cleaner text badges and small gold dots
- Changed city footer label from `+ 12 more cities` to `All service areas`

### Lint And Stability Fixes

These were required so the revamp passed lint/build cleanly:

- Added `original-insurance/src/lib/lenisContext.ts`
- Moved `LenisContext/useLenis` out of `App.tsx`
- Updated `ScrollToTop.tsx` dependency handling
- Typed icon components in `Icons.tsx`
- Removed `any` from `AnimatedSection.tsx`, `MagneticButton.tsx`, and `Locations.tsx`
- Fixed empty catch in `LocalBusinessSchema.tsx`
- Fixed `prefer-const` in `lib/seo.ts`
- Fixed `CityLanding.tsx` hook order for unknown city redirects
- Eagerly imported the four money pages in `App.tsx` to keep CLS at 0:
  - Auto
  - SR22
  - No-license
  - Commercial auto

## Validation Already Run

Before committing/deploying the revamp:

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
```

All passed.

Browser smoke test was run locally across desktop `1440x1000` and mobile `390x844` for:

- `/`
- `/about`
- `/services`
- `/contact`
- `/locations`
- `/faq`
- `/insurance/downey`
- `/auto-insurance-downey-ca`
- `/sr22-insurance-downey`
- `/no-license-auto-insurance-downey`
- `/commercial-auto-insurance-downey`

Smoke test checks passed:

- Exactly one H1 per page
- No horizontal overflow
- No unexpected 404s
- Quote modal opens
- Quote iframe is present
- Body scroll locks in modal
- Call fallback is present

Local Lighthouse checks after revamp:

- Home desktop: Performance 95, Accessibility 96, Best Practices 96, SEO 100, LCP 1.4s, CLS 0
- Services desktop: Performance 93, Accessibility 95, Best Practices 96, SEO 100, LCP 1.7s, CLS 0
- SR22 desktop: Performance 91, Accessibility 96, Best Practices 96, SEO 100, LCP 1.9s, CLS 0
- Home mobile: Performance 69, Accessibility 96, Best Practices 96, SEO 100, LCP 5.6s, CLS 0
- Services mobile: Performance 71, Accessibility 95, Best Practices 96, SEO 100, LCP 5.7s, CLS 0

Production deploy was run with:

```powershell
& 'C:\Program Files\Git\bin\bash.exe' scripts/deploy.sh
```

Use Git Bash explicitly on this machine. Plain `bash scripts/deploy.sh` routes into disabled WSL and fails.

The final deploy passed:

- Clean working tree check
- SEO lint
- Build and prerender of 22 pages
- Schema validation on prerendered HTML
- Vercel build
- Copy of prerendered pages into `.vercel/output/static`
- Production deployment
- CDN propagation check
- `scripts/verify-live.sh` live verification

Live verification result:

- All 22 canonical URLs returned 200
- Trailing slash redirects returned 308
- `/index.html` redirect returned 308
- robots.txt query blocking present
- sitemap accessible with 12 city pages
- Homepage InsuranceAgency schema present and correct
- About/Services correctly do not include InsuranceAgency schema
- All 12 homepage city links present
- No `{search_term_string}` pollution
- About page word count around 1419
- All live checks passed

## Deployment Notes

Always deploy from repo root using:

```powershell
& 'C:\Program Files\Git\bin\bash.exe' scripts/deploy.sh
```

Do not use plain `bash` on this Windows machine.

Do not deploy by only running `git push`; Vercel GitHub auto-deploy is not connected for this site.

The deploy script now snapshots prerender output before Vercel build. This is important because a previous deploy copied SPA shell HTML instead of prerendered SEO HTML, causing live verification failures for homepage schema, city links, and About content.

## Remaining Work / Next Best Steps

1. Run a fresh live Lighthouse pass on the production site, especially:
   - `/`
   - `/services`
   - `/sr22-insurance-downey`
   - `/no-license-auto-insurance-downey`

2. Continue mobile LCP improvement.
   - Current local mobile Lighthouse is much better than earlier sessions but still around 5.6-5.7s on Home/Services.
   - Likely targets: Framer Motion bundle, critical CSS, font loading, JS execution.

3. Do a visual QA pass on all pages after Brian has seen the production changes.
   - The site now looks more cohesive and brokerage-specific, but further visual refinement should be driven by screenshots/user feedback.

4. Still waiting on Brian for business facts:
   - CDI license number for footer
   - Exact carrier logo list
   - BBB rating text, if he wants A/A+ shown
   - Holiday hours beyond Memorial Day

## Files Most Relevant For Continuing

- `original-insurance/src/components/InsuranceWorkflow.tsx`
- `original-insurance/src/components/QuoteWidget.tsx`
- `original-insurance/src/components/Footer.tsx`
- `original-insurance/src/design-system/components/CTASection.tsx`
- `original-insurance/src/App.tsx`
- `original-insurance/src/pages/CityLanding.tsx`
- `scripts/deploy.sh`
- `scripts/verify-live.sh`
- `CHANGELOG-SEO.md`
- `SEO_CONVENTIONS.md`

