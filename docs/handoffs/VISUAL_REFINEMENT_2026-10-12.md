# Original Insurance — visual refinement handoff

The local Astro site now uses a navy, white, and blue-gray visual system with a restrained serif accent, a working coverage explorer, readable customer reviews, consistent image frames, and coordinated motion. The business information, real office photographs, coverage guides, quote workflow, analytics, canonical URLs, and routing safeguards remain intact. No production deployment was performed.

Preview: http://localhost:3002. Production-output preview: http://127.0.0.1:3012.

## Pages reviewed and refined

All 25 canonical content pages received the shared navigation, typography, surface, spacing, image, review, CTA, and footer refinements where applicable. The quote and admin layouts inherit shared brand tokens; the quote introduction was rewritten. The 404 has direct recovery copy and a coverage link. Existing intake/editor behavior was preserved.

| Route | Visitor intent / primary action | Refinement scope |
| --- | --- | --- |
| `/` | Compare coverage / request quote | Hero, interactive coverage explorer, office section, process presentation, reviews, local presence, FAQ preparation, CTA, footer |
| `/services` | Select an insurance or office service / open its guide | Catalog typography, framed imagery, category navigation, surfaces, shared process/reviews |
| `/about` | Understand the agency / explore coverage or visit | Real office hero, history typography, founding-date treatment, office section, shared reviews; botanical removed |
| `/contact` | Contact the agency / send support message | Direct channels, blue-gray form surface, focus treatment, readable labels and heading, mobile layout |
| `/locations` | Plan a visit / get directions | Real storefront hero, address/hours hierarchy, map and copy-address retained, service-area treatment |
| `/faq` | Find an answer / call or open a guide | Clear title, topic navigation, readable section headings, native expandable answers |
| `/privacy` | Read data-handling notice / contact office | Reading hierarchy and navigation; policy wording retained |
| `/accessibility` | Find assistance / contact office | Reading hierarchy, direct help; unrelated botanical removed |
| `/auto-insurance-downey-ca` | Understand auto coverage / request quote | Guide-family hero, diagrams, reading hierarchy, notes, preparation, related coverage, reviews |
| `/home-insurance-downey-ca` | Compare property coverage / request quote | Same family system with home illustration and protection diagram |
| `/commercial-auto-insurance-downey` | Compare business vehicle coverage / request quote | Same family system with work-vehicle illustration and diagram |
| `/sr22-insurance-downey` | Understand filing / request quote | Same family system with document illustration and filing diagram |
| `/no-license-auto-insurance-downey` | Understand eligibility / request quote | Same family system; eligibility qualifications and driving-permission distinction retained |
| `/insurance/downey` | Local agency help / quote or visit | Shared city hero, office note, guide hierarchy, reviews and local directory |
| `/insurance/norwalk` | Local coverage help / quote | Same family system; commuting/garaging guidance retained |
| `/insurance/bellflower` | Local coverage help / quote | Same family system; matching limits/deductibles guidance retained |
| `/insurance/lynwood` | Local coverage help / quote | Same family system; language assistance retained |
| `/insurance/cerritos` | Local coverage help / quote | Same family system; household/vehicle comparison retained |
| `/insurance/whittier` | Local coverage help / quote | Same family system; renewal guidance retained |
| `/insurance/lakewood` | Local coverage help / quote | Same family system; property/bundle guidance and home diagram retained |
| `/insurance/paramount` | Local coverage help / quote | Same family system; business-use guidance retained |
| `/insurance/south-gate` | Local coverage help / quote | Same family system; budget/limits comparison retained |
| `/insurance/pico-rivera` | Local coverage help / quote | Same family system; renters guidance retained |
| `/insurance/montebello` | Local coverage help / quote | Same family system; matched-coverage price comparison retained |
| `/insurance/commerce` | Local coverage help / quote | Same family system; business vehicle guidance and diagram retained |
| `/quote` | Complete a quote request | Shared palette and heading system, concrete introduction; eight intake flows retained |
| `/admin` | Configure quote intake | Shared presentation tokens; login/editor workflows reviewed with existing regression/stress suites |
| `/404` / unknown URL | Recover navigation | Direct heading, coverage and contact actions; real 404 handling retained |

## Design decisions and implementation

- **System:** `src/styles/tokens.css` centralizes navy, blue, surfaces, typography, spacing, radii, shadows, durations, easing, and container values. Existing variable names resolve to these tokens. `index.css` establishes a stable stylesheet order.
- **Typography:** DM Sans now leads titles, headings, forms, navigation, reviews and supporting information. Newsreader remains selectively in the home brand phrase and local-presence heading. H1 scales from 36–56px, home display 42–68px, H2 28–42px; captions and body text retain their separate roles.
- **Color:** White reading surfaces and blue-gray supporting surfaces replace the pervasive cream/beige treatment. Navy anchors navigation, process, local directory and footer. Medium blue marks focus, selected details and key rules. Gold remains controlled on navy and existing illustration details.
- **Grid:** Shared 1280px container, 1440px wide-screen hero, 48/32/20px desktop/tablet/mobile gutters. Tablet composition is adjusted separately. Reading guides retain their useful content rail.
- **Images:** Consistent small-radius frames replace decorative arches in hero/catalog imagery. Coverage images use landscape ratios; mobile hero recrops to 4:3. The real storefront overlaps its factual address panel. All delivered imagery still uses Astro AVIF/WebP derivatives and responsive source sizes.
- **Assets created:** No new generated raster assets. The new coverage interface is native Astro/HTML/CSS with existing illustrations.
- **Assets removed from presentation:** Citrus-branch decoration in reviews, About and the accessibility notice, and the decorative policy-folder placement in the privacy sidebar; giant quotation marks, initial avatars and manufactured review-theme captions. Source image files were retained, not deleted.
- **Navigation:** White desktop header, current coverage-page states, navy mobile panel, clear nested coverage links, phone and quote actions. Existing native dialog focus trapping, Escape and trigger-focus restoration remain.
- **Content:** City headings now name the location directly; local comparison and CTA headings use concrete insurance language. Catalog labels identify personal/business coverage instead of arbitrary numbering.
- **Coverage:** New three-category explorer supports click, arrow keys, Home/End, selected states, responsive tab orientation and direct guide links. Without JavaScript, all three linked panels remain visible. Catalog anchors and all five substantive guides remain.
- **Testimonials:** One featured review plus two distinct supporting reviews; four reviews available through manual controls. Existing review wording is unchanged. Supporting reviews update without duplicating the featured text. Without JavaScript, all four original reviews are shown once. Google source link remains; no rating or review schema added.
- **About:** Verified 1999 date, existing history and actual office imagery carry the story. Decorative botanical seal and oversized editorial treatment removed.
- **Contact/forms:** Working submission and validation behavior retained. Blue-gray form panel, clean white inputs, blue focus indication and sensible mobile field spacing replace the paper-shadow treatment. Success/failure messaging and entered-value preservation remain.
- **Footer:** Actual telephone number replaces the oversized “Let’s talk” billboard. Contact data comes from the shared site data. Compact mobile link accordions, company/coverage/service-area links and legal navigation remain.
- **Mobile/tablet:** Three touch-friendly coverage selectors replace the desktop vertical index. Hero proof becomes compact rows, review composition stacks, desktop image framing is recomposed, and mobile navigation is a complete branded panel. Tablet has its own gutters, hero type and coverage proportions.
- **SEO:** Titles, descriptions, canonicals, sitemap, robots, structured-data policy, route ownership and redirects retained. The headline revisions are concrete and preserve page subject matter. No public search, carrier claims, fabricated metrics, new URLs or unsupported schema introduced.

## Motion

Fast interactions, standard transitions and slower visual entrances share duration/easing tokens. The hero uses a text-mask entrance and image reveal; coverage changes animate the image and a small directional detail movement. Native FAQ movement, diagram tracing, finite process rules, local-scene arrival, history markers, link arrows and image hover behavior remain. Footer arrival is subtle.

Removed unnecessary per-card/per-heading observer targets and overlapping coverage-section text fades. The coverage selection state changes instantly so transitions never pass through low-contrast text/background combinations. There is no autoplay review rotation, idle loop, scroll hijacking, animation framework or new client framework. Reduced motion makes state changes immediate; static content remains available without JavaScript.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed, including Astro/TypeScript checks with zero errors/warnings; 28 pages built.
- `npm run validate:schema`: passed on 27 checked documents (404 is not part of that validator's content set).
- `npm run seo-lint`: content/routing/schema assertions pass up to the final infrastructure assertion; **fails because repo-root `.vercel/project.json` was already absent**. No project ID was invented and the check was not bypassed.
- `npm run test:site`: passed across all 25 content routes at 11 widths (320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560). Zero detected axe findings. Includes internal links, image loading, metadata, redirects, query cleanup, 404/410, navigation, reduced motion, no-JavaScript content, and mocked contact success/failure.
- Added regression coverage for keyboard/click coverage selection, direct guide destinations, no-JavaScript panels, and nonduplicated featured/supporting reviews.
- `test:intake-server`, `test:intake`, `test:intake-stress`: passed sequentially. Includes eight customer flows, multiple drivers/vehicles, validation, retry, custom questions, saved wording, ordering/undo, VIN conditions, synthetic email contents, responsive layouts and 68 stress-suite axe scans. No real customer messages were sent.
- Focused accessibility checks cover open mobile navigation, expanded coverage navigation, all coverage tabs during state changes and reduced motion. A transient contrast issue found in the new coverage transitions was corrected, then rechecked.
- Final full-page screenshot sweep: **28 routes × seven widths = 196 captures**, at 1440, 1280, 1024, 768, 430, 390 and 375px. No detected overflow or broken images. Cross-page visual contact sheets cover all twelve cities and all five coverage guides. Baseline captures are also retained locally.
- Local mobile Lighthouse: **95 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**; FCP 1.7s, LCP 2.8s, TBT 0ms, CLS 0.005. These are simulated lab results, not production field measurements or a complete WCAG certification.
- Marketing JS: approximately **10.1KB uncompressed / 3.8KB gzip**, including existing analytics integrations. Shared CSS approximately 108KB / 20KB gzip. No new framework or animation dependency.
- `git diff --check`: passed.

Raw screenshots, capture logs, build/schema logs, browser results and Lighthouse HTML/JSON are ignored artifacts under `output/playwright/`. The final layout captures are in `output/playwright/final/`.

## Remaining recommendations and release prerequisite

1. Restore the correct existing repo-root `.vercel/project.json` before release, rerun SEO lint, then use only `bash scripts/deploy.sh` when publication is requested. No deployment was attempted in this task.
2. Commission real team-at-work photographs and updated exterior/interior photography in natural light. Keep the current real office photographs until approved replacements exist. Do not substitute generated employees or generated office evidence.
3. Add a carrier-logo section only after the agency supplies an approved carrier list and logo assets. No verified inventory exists in the current project.
4. Production mailbox delivery and provider account configuration remain the account-side checks described in the existing intake documentation. This pass validates local synthetic delivery and preserves those integrations.
5. A final real-device and assistive-technology review remains useful before release; automated accessibility findings are not a certification.

The design and page-level work is complete locally. These recommendations do not require inventing business facts or changing working operational integrations.
