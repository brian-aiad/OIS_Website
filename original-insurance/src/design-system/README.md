# Design System — originalinsurance.net

Single source of truth for all visual decisions. Any change to colors, gradients,
shadows, animation timings, or spacing must go through `tokens.ts` first.

---

## Tokens (`tokens.ts`)

### Colors
Use Tailwind class names (e.g., `bg-brand-900`, `text-gold-500`) in JSX.
Import color constants only for style props or Framer Motion color animations.

| Token | Value | Use case |
|-------|-------|----------|
| `navyDeepest` | `#060e1f` | Footer, hero overlays |
| `navyDeep` | `#0b1e3d` | Dark card backgrounds |
| `navyStrong` | `#0f2147` | Buttons, icon backgrounds |
| `navyMid` | `#1e3a8a` | Text links, hover states |
| `gold` | `#f5a623` | Primary CTA background ONLY |

### Gradients (only 3)
```ts
gradients.hero    // Dark hero backgrounds (home hero, dark CTAs)
gradients.mesh    // Mesh overlay for `.hero-mesh` sections
gradients.subtle  // Very light background tint for alternating sections
```

### Shadows (use Tailwind: shadow-soft, shadow-lifted, shadow-heavy)
```ts
shadows.soft     // Cards at rest
shadows.lifted   // Cards on hover
shadows.heavy    // Modals, floating elements
shadows.goldGlow // Gold CTA button glow
```

### Motion — 3 timing profiles, used everywhere
```ts
motion.fast     // 0.18s — hover states, button feedback
motion.base     // 0.28s — card hovers, tab switches
motion.emphasis // 0.50s — page entrances, modal open
motion.fadeUp   // Standard scroll-in: spread into <motion.div>
motion.stagger  // 0.05 — delay multiplier for grid items
```

---

## Components

### `<RevealOnScroll>` — scroll entrance animation
```tsx
import { RevealOnScroll } from "@/design-system";

<RevealOnScroll delay={0.1} direction="up">
  <h2>Section Heading</h2>
</RevealOnScroll>
```
Replaces all ad-hoc `<Reveal>` and `<motion.div initial={...} whileInView={...}>` patterns.

### `<Section>` — page section wrapper
```tsx
import { Section } from "@/design-system";

<Section tone="offwhite" id="services">
  <div className="container">...</div>
</Section>
```
Tones: `light` (white), `offwhite` (slate-50), `dark` (navy), `accent` (mesh).

### `<SectionHeader>` — eyebrow + h2 + lede
```tsx
import { SectionHeader } from "@/design-system";

<SectionHeader
  eyebrow="What We Cover"
  title="Personal & commercial coverage"
  lede="We shop dozens of carriers to find coverage that fits your life."
  align="center"
/>
```

### `<Card>` — all card patterns
```tsx
import { Card } from "@/design-system";

<Card variant="default" hover>
  <h3>Card title</h3>
  <p>Card content</p>
</Card>
```
Variants: `default`, `elevated`, `bordered`, `glass`, `dark`.

### `<CTASection>` — page-bottom closer
```tsx
import { CTASection } from "@/design-system";

<CTASection
  title="Ready to compare 30+ carriers?"
  lede="One call. Real answers."
  secondaryLabel="Call (310) 538-8666"
/>
```
Every page ends with `<CTASection>`. Never create bespoke CTA sections.

---

## Rules

### DO NOT
- Use hex colors in JSX className: `className="text-[#1e3a8a]"` → use `text-brand-700`
- Use raw box-shadow in style props: `style={{ boxShadow: "0 4px 12px..." }}` → use `className="shadow-soft"`
- Define new gradient values outside `tokens.ts`
- Use gold for anything other than primary CTAs (primary buttons, star ratings)
- Skip `<RevealOnScroll>` for section content — every section entrance should animate in

### Animation guidelines
- Every scroll-driven entrance: `<RevealOnScroll>` (uses `motion.emphasis`)
- Every hover state: CSS transition with `duration-[180ms]` (uses `motion.fast`)
- Every modal open: `motion.base` (0.28s)
- No animation longer than 0.5s
- Always include `prefers-reduced-motion: reduce` fallbacks (already in index.css)

### Background rhythm (alternating sections)
Repeat this sequence down the page — never 5 white sections in a row:
1. White (`.bg-white`)
2. Off-white (`.bg-slate-50`)
3. White
4. Navy CTA (`<CTASection>` at the bottom)

### Typography hierarchy
- One `<h1>` per page (usually in the hero)
- `<h2>` tags only at section boundaries via `<SectionHeader>`
- `<h3>` tags only inside cards or subsections
- Never skip levels (h1 → h3 is invalid)
