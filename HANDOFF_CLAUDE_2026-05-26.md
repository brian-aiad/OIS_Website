# Claude / Next-Agent Handoff - Original Insurance Website

Date: 2026-05-26
Repo: `C:\Users\kingt\Desktop\ois_website`
App: `original-insurance`
Local URL expected by user: `http://localhost:3002/`

## User Direction

The user wanted the site to stop feeling flat, repetitive, and obviously AI generated. Specific feedback:

- Use the actual Original Insurance logo on generated photos when it matters, especially the hero storefront.
- Do not reuse the same people photo across homepage sections.
- Product/service photos should be actual subject photos, not people:
  - auto = car
  - home = house
  - life = policy/documents
  - commercial = commercial vehicles
  - SR-22/no-license = documents/ID-style desk photos
- People photos should skew toward Hispanic households and local Southeast LA customers.
- The homepage hero "Clean quote review" label needed to be legible.
- Footer needed to be tighter and better organized.
- Scan the pages for layout/readability, not just swap assets.

## What Was Done

### Latest Organization / Mobile / SEO Pass

After the visual asset commit, the user said the site still felt like "a bunch of words and images mashed up together," especially on the homepage, and asked to triple-check mobile and Google SEO readiness.

Latest pass completed:

- Simplified homepage flow to reduce section overload.
- Removed unused homepage sections from rendering and source:
  - stats bento block
  - product text hub
  - carrier marquee
  - duplicate "how it works" section
  - claims CTA block
- Homepage now follows a cleaner path:
  - hero
  - trust strip
  - coverage image cards
  - quote process
  - why Original
  - reviews
  - service areas
  - FAQ
  - final CTA
- Tightened About hero copy so mobile no longer shows a long wall of text.
- Added a mobile clamp for shared `PageHero` subtitle paragraphs.
- Normalized review avatar colors back into the navy/gold brand palette instead of random green/red/purple gradients.

### Visual Assets

Added new generated/object-focused WebP assets in `original-insurance/public/images/`:

- `ois-hero-storefront-logo-v4.webp` - built from the generated storefront and composited with the real `public/logo.png` so the sign uses the actual logo.
- `ois-hero-storefront-natural-v3.webp`
- `ois-office-desk-detail-v3.webp`
- `ois-services-overview-products-v3.webp`
- `ois-product-auto-car-v3.webp`
- `ois-product-home-house-v3.webp`
- `ois-product-life-policy-v3.webp`
- `ois-product-commercial-vehicles-v3.webp`
- `ois-product-motorcycle-v3.webp`
- `ois-product-rv-boat-v3.webp`
- `ois-product-sr22-document-v3.webp`
- `ois-product-no-license-docs-v3.webp`
- `ois-hispanic-family-consult-v3.webp`
- `ois-hispanic-auto-consult-v3.webp`
- `ois-home-why-hispanic-consult-v4.webp`
- `ois-home-reviews-client-v4.webp`
- `ois-testimonial-auto-client-v4.webp`
- `ois-testimonial-family-client-v4.webp`
- `ois-testimonial-business-client-v4.webp`
- `ois-sr22-hispanic-consult-v4.webp`
- `ois-no-license-hispanic-consult-v4.webp`
- `ois-contact-reception-v4.webp`
- `ois-city-community-golden-v4.webp`
- `ois-city-commercial-corridor-v4.webp`
- `ois-city-small-business-v4.webp`

Original generated PNGs were left under:

`C:\Users\kingt\.codex\generated_images\019e4cad-a7eb-7370-8238-8ed381bdb457`

### Image Wiring

Updated `src/lib/images.ts` as the source of truth:

- Home hero now uses `ois-hero-storefront-logo-v4.webp`.
- Homepage "Why Original" and "Client Reviews" use different v4 Hispanic-client photos.
- Page testimonials use three distinct v4 testimonial photos.
- Service/product cards use object/product photos.
- SR-22, no-license, and commercial pages now use product/object hero photos plus separate consultation photos below.
- Contact hero uses `ois-contact-reception-v4.webp`.
- City pages rotate between three new Southeast LA street/business photos instead of all using the same old image.

### Layout / UX

- Removed the staged three-person team image from the homepage hero panel.
- Made the homepage "Clean quote review" badge solid gold and larger so it is readable.
- Removed the default right-side `BrokerHeroPanel` from generic `PageHero` pages because it repeated the same desk photo and made inner-page heroes busy.
- Tightened and reorganized the footer with clearer columns and a compact CTA strip.
- Removed the home-only sticky ribbon from rendering because it overlapped the footer and duplicated the floating quote widget.
- Updated SEO image URLs in `LocalBusinessSchema.tsx`.
- Updated `OfficePhotoBlock.tsx` to use the new branded storefront photo.

### Pages Touched

Core:

- `src/pages/Home.tsx`
- `src/pages/Services.tsx`
- `src/pages/AutoInsuranceDowneyCA.tsx`
- `src/pages/SR22InsuranceDowney.tsx`
- `src/pages/NoLicenseInsuranceDowney.tsx`
- `src/pages/CommercialAutoInsuranceDowney.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Faq.tsx`
- `src/pages/Locations.tsx`
- `src/pages/CityLanding.tsx`

Components:

- `src/components/Footer.tsx`
- `src/components/PageHero.tsx`
- `src/components/PageTestimonials.tsx`
- `src/components/BrokerHeroPanel.tsx`
- `src/components/seo/LocalBusinessSchema.tsx`
- `src/components/seo/OfficePhotoBlock.tsx`
- `src/lib/images.ts`

City pages:

- `src/pages/insurance/Bellflower.tsx`
- `src/pages/insurance/Cerritos.tsx`
- `src/pages/insurance/Commerce.tsx`
- `src/pages/insurance/Lakewood.tsx`
- `src/pages/insurance/Lynwood.tsx`
- `src/pages/insurance/Montebello.tsx`
- `src/pages/insurance/Norwalk.tsx`
- `src/pages/insurance/Paramount.tsx`
- `src/pages/insurance/PicoRivera.tsx`
- `src/pages/insurance/SouthGate.tsx`
- `src/pages/insurance/Whittier.tsx`

## Verification Done

Latest verification:

- `npm run build` passed.
- `npm run seo-lint` passed with 0 failures and 0 warnings.
- `npm run validate:schema` passed across 22 pages.
- Playwright mobile QA passed across all 22 routes:
  - no horizontal overflow
  - exactly one H1 per route
  - title present
  - meta description present
  - canonical present
  - no images missing `alt`

Temporary screenshots/contact sheets were created during QA and should be removed before committing if present:

- `tmp-mobile-qa/`
- `tmp-mobile-contact-sheet.webp`
- `tmp-home-organized-desktop.png`
- `tmp-about-mobile-fixed.png`
- `tmp-home-mobile-next-section.png`

## Notes / Remaining Caution

- The generated photos are improved and more locally targeted, but they are still AI-generated. The hero storefront is the strongest asset because the actual logo was composited from `public/logo.png`.
- City pages now rotate among three regional photos, not one unique photo per city. If the next pass has time, generate city-specific photos for all 11 city pages.
- The floating quote widget still appears sitewide; it is separate from the removed homepage sticky ribbon.
- Do not delete the source PNGs under `.codex/generated_images`; only temp QA folders in the repo should be cleaned.

## Useful Commands

Build:

```powershell
cd C:\Users\kingt\Desktop\ois_website\original-insurance
npm run build
```

Reset localhost 3002:

```powershell
cd C:\Users\kingt\Desktop\ois_website
$connections = Get-NetTCPConnection -LocalPort 3002 -State Listen -ErrorAction SilentlyContinue
$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
foreach ($id in $processIds) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue }
Start-Process -FilePath 'npm.cmd' -ArgumentList @('run','dev','--','--host','0.0.0.0','--port','3002') -WorkingDirectory (Resolve-Path 'original-insurance') -WindowStyle Hidden
```
