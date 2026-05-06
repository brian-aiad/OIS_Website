# Design Cohesion Audit — 2026-05-06

## Summary

| Category | Before | After | Status |
|----------|--------|-------|--------|
| Inline hex colors in className | 5 violations | 0 violations | ✅ Fixed |
| H1 tags per page | 2 (noscript + PageHero) | 1 (PageHero only) | ✅ Fixed |
| Border-radius values | All standard Tailwind | All standard Tailwind | ✅ Pass |
| Section padding | Consistent `.sp` / `.sp-sm` | Unchanged | ✅ Pass |
| Animation violations (>0.6s) | App.tsx 1.2s (Lenis scroll — acceptable), Locations.tsx 0.7s | Locations reduced to 0.5s | ✅ Fixed |
| CTA section consistency | Mostly consistent | Unchanged | ⚠️ Home.tsx ends with FAQ, not CTA |
| CLS 0.295 on inner pages | Unresolved | Unchanged — not from font swap | ⚠️ Open |

---

## Gradient definitions (5 inline → 0 after fixes)

**Fixed violations:**
- `from-[#060E1F]/90 via-[#0B1E3D]/65 to-[#0B1E3D]/30` → `from-brand-950/90 via-brand-900/65 to-brand-900/30` (Home.tsx line 34)
- `from-[#F1F5F9] to-transparent` × 2 → `from-slate-50 to-transparent` (Home.tsx lines 396-397)

**Remaining inline gradients in style= props (not className):**
- `linear-gradient(135deg, #060E1F 0%, #0B1E3D 50%, #162D5E 100%)` in PageHero.tsx line 43 — page hero default background
- `linear-gradient(105deg, rgba(6,14,31,0.92)...)` in About.tsx line 47 — overlay gradient
- `linear-gradient(135deg, #1a2a4a 0%, #0f2147 100%)` in Home.tsx service cards — card background
- `radial-gradient(ellipse at center...)` in PageHero.tsx line 87 — vignette effect

These are in `style={{}}` props, not className, so they don't trigger the hex lint rule. They should be moved to design system tokens as a follow-up task.

---

## Box-shadow analysis

**7 distinct values found in style props.** These are not in className but in style={{}} — not caught by the hex lint rule. Recommend moving to CSS variables or Tailwind custom shadows.

Specific values:
1. `"0 20px 60px rgba(0,0,0,0.35)"` — Home.tsx hero trust panel
2. `"0 0 0 3px rgba(245,166,35,0.25)"` — About.tsx timeline dots
3. `"var(--shadow-lg)"` — About.tsx comparison table, Contact.tsx form
4. `"0 0 0 4px rgba(245,166,35,0.15), 0 4px 14px rgba(15,33,71,0.18)"` — Home.tsx step numbers
5. `"var(--shadow-gold)"` — Contact.tsx form card
6. `"var(--shadow-sm)"` — Home.tsx stat strip

**CSS variable usage is correct.** Raw rgba values in 3 places should move to CSS variables.

---

## Border-radius (PASS — no drift)

All values are standard Tailwind:
- `rounded-lg` (12px) — buttons, small cards
- `rounded-xl` (16px) — medium cards, inputs
- `rounded-2xl` (24px) — most cards
- `rounded-3xl` (32px) — hero panels
- `rounded-full` — pills, avatars

No non-standard `rounded-[Xpx]` values found.

---

## Animation timings

Before:
- 1.2s (Lenis duration — scroll physics, not a visual animation, acceptable)
- 0.7s in Locations.tsx — VIOLATION (visual element animation)

After:
- 0.5s in Locations.tsx — FIXED

Remaining distinct Framer Motion durations in codebase: 0.15, 0.18, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65. All ≤ 0.6s.

---

## CLS investigation (unresolved)

Desktop CLS of 0.295 on all inner pages (PageHero pages) is a persistent issue.

**What was tested:**
- `font-display: swap → optional` — Did NOT fix the CLS. Font was NOT the cause.
- The CLS has no attributable DOM elements (Lighthouse layout-shift-elements array is empty)
- Mobile CLS is 0.000 for all pages (mobile Lighthouse measurement doesn't show the shift)

**Hypotheses (not yet tested):**
1. Lenis smooth scroll initialization causes a scroll offset adjustment on desktop
2. The PageHero wave-divider SVG (positioned absolute at hero bottom) causes reflow during page paint
3. The AnimatePresence page transition y:20 → y:0 is somehow being counted as layout shift despite being a CSS transform

**Impact:** CLS 0.295 puts inner pages in the "Poor" range (>0.25). This should be investigated in a dedicated session using Chrome DevTools CLS overlay.

---

## Design system shipped

- `src/design-system/tokens.ts` — 6 categories: colors, gradients, shadows, radii, spacing, motion, typography
- `src/design-system/components/RevealOnScroll.tsx` — canonical scroll entrance
- `src/design-system/components/Section.tsx` — section wrapper
- `src/design-system/components/SectionHeader.tsx` — eyebrow + h2 + lede
- `src/design-system/components/Card.tsx` — 5 card variants
- `src/design-system/components/CTASection.tsx` — canonical page CTA closer
- `src/design-system/README.md` — full style guide
