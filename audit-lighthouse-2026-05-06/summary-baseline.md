# Lighthouse Baseline — 2026-05-06

## Desktop Scores
| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|------|------|------|----|-----|-----|-----|-----|
| / (home) | 80 | 91 | 100 | 92 | 2.90s | 0.001 | 0ms |
| /about | 70 | 96 | 100 | 100 | 2.49s | 0.296 | 0ms |
| /services | 87 | 95 | 100 | 100 | 2.11s | 0.000 | 0ms |
| /faq | 72 | 95 | 100 | 100 | 2.29s | 0.295 | 0ms |
| /insurance/downey | 72 | 95 | 100 | 100 | 2.25s | 0.295 | 0ms |
| /sr22-insurance-downey | 71 | 91 | 100 | 100 | 2.33s | 0.296 | 0ms |
| /no-license-auto-insurance-downey | 73 | 91 | 100 | 100 | 2.21s | 0.296 | 0ms |

## Mobile Scores
| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP |
|------|------|------|----|-----|-----|-----|-----|-----|
| / (home) | 53 | 91 | 100 | 92 | 15.03s | 0.000 | 424ms | 3.42s |
| /about | 60 | 96 | 100 | 100 | 12.64s | 0.000 | 227ms | 3.50s |
| /services | 58 | 95 | 100 | 100 | 10.99s | 0.000 | 283ms | 3.32s |
| /faq | 64 | 95 | 100 | 100 | 11.68s | 0.000 | 192ms | 3.05s |
| /insurance/downey | 62 | 95 | 100 | 100 | 11.52s | 0.000 | 235ms | 2.98s |
| /sr22-insurance-downey | 65 | 91 | 100 | 100 | 11.46s | 0.000 | 160ms | 2.90s |
| /no-license-auto-insurance-downey | 62 | 91 | 100 | 100 | 11.59s | 0.000 | 135ms | 4.28s |

## Specific Failures

### SEO 92 (Homepage)
- `crawlable-anchors`: MagneticButton wraps CTA buttons in `<a>` tags with no href. Googlebot can't follow these.

### A11y 91 (Homepage, SR-22, No-license)
- `color-contrast`: text-slate-400 on white (Navbar subtitle), text-white/40 (Footer)
- `label-content-name-mismatch`: ReviewBadge aria-label doesn't match visible text; floating scroll button
- `aria-required-children`: TrustStrip div with role="list" has no role="listitem" children

### CLS 0.295-0.296 (Desktop — 5 pages)
- About, FAQ, insurance/downey, SR-22, no-license all show ~0.295
- Homepage and Services are clean (0.000-0.001)
- Likely cause: Google Fonts font-display:swap causing text reflow on pages with
  specific text+image combinations. Not the Framer Motion transforms (transforms ≠ CLS).

### Mobile LCP 11-15s
- Root cause: storefront.png is 229KB PNG — not WebP, not preloaded correctly.
  index.html preloads hero-celebration-highfive.webp but the actual hero uses storefrontImg (PNG asset).
- Secondary: 150KB Framer Motion on mobile throttled CPU causes TBT 135-424ms.
