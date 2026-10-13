> Historical first refinement notes. The [acquisition handoff](../handoffs/ACQUISITION_REBUILD_2026-10-12.md) and [asset system](../rebuild/ASSET_PROVENANCE_2026-10-12.md) supersede this document where they differ. Current typography is DM Sans only; there are 27 content routes and a carrier network page.

# Original Insurance visual refinement

## Direction

The audience is people comparing personal or business insurance and existing customers who need assistance. The primary conversion is a quote request; phone, policy support, and directions are distinct secondary tasks.

Keep the existing navy identity and recognizable coverage artwork. Use the original square artwork as a framed insurance scene, without the decorative arch. The signature interaction is a coverage index beside a large changing illustration: auto, home, and commercial coverage remain direct, crawlable links. Real office photography supplies evidence of the business. Illustrations describe coverage and never stand in for real team or office photography.

Palette: deep navy #142b44, deep foundation #0d2033, medium blue #245da0, white #ffffff, blue-gray #eef3f7, restrained warm accent #d8b46d. White is the reading surface, blue-gray groups supporting information, navy anchors the process and footer. Gold is limited to contrast on navy and selected indicators.

DM Sans is the primary display, heading, body, navigation, and utility face. Newsreader remains a selective editorial accent. Headings use a medium weight, controlled line lengths, and fluid sizing. Reviews use readable body-scale sans serif. Eyebrows identify content categories rather than supplying sentimental commentary.

Layout comparison:

- Retaining three equal coverage cards repeats the existing site and hides useful differences.
- A large full-bleed photo would imply photographic evidence the illustration cannot provide.
- Selected: a structured coverage index with a generously framed illustrated panel and useful coverage details.

```
Brand / coverage / company navigation / quote

Concrete insurance heading | framed California coverage scene
Quote + phone              | auto / home / business links
Verified business information

Coverage index             | selected coverage illustration
Three category controls    | explanation + guide link
Additional service directory

Real office photograph     | independent brokerage explanation
Navy process: gather -> compare -> ongoing support
Customer reviews: featured text + supporting evidence
Local service illustration + directory
Questions / preparation
Quote prompt / compact navy footer
```

## Shared rules

- Standard container 1280px; mobile gutters 20px, tablet 32px, desktop 48px.
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px.
- Small radii for controls and image frames; no decorative arch crops or folded-paper corners.
- Images use 4:3 for coverage, landscape for office evidence, and a square hero scene. Keep whole illustrated subjects visible. No fake carrier logos or unverified partner claims.
- Fast interactions 160ms, standard transitions 260ms, image/section arrivals 650ms. Shared ease-out curve. No idle loops, scroll hijacking, or autoplay reviews.
- Content remains visible without JavaScript. Tabs enhance static linked panels. Motion reduces to immediate state changes under reduced-motion preferences.
- Reviews retain the existing supplied text exactly. Source link remains visible; no synthesized ratings or review schema.

## Baseline findings and route families

All 25 canonical routes, quote, admin login, and 404 were captured at 1440 and 390px. Major page families additionally receive 1280, 1024, 768, 430, and 375px baselines. Raw artifacts are in ignored `output/playwright/baseline/`.

| Family | Routes | Main task | Findings / action |
| --- | --- | --- | --- |
| Home | `/` | Compare coverage / request quote | Repeated cream/serif/gold formula, decorative captions, three near-identical cards. Recompose hero, coverage and reviews. |
| Catalog | `/services` | Select coverage or office service | Useful catalog and anchors; normalize image geometry, typography and density. |
| Coverage | auto, home, commercial auto, SR-22, no-license canonical routes | Understand options / request quote | Keep diagrams, structured guides, FAQs and preparation. Unify type, surfaces and motion. |
| Local | all twelve `/insurance/*` routes | Local coverage help through Downey | Keep individual guidance and truthful office disclosure. Normalize heroes, contact notes, local directory. |
| About | `/about` | Understand agency / visit or explore | Keep founding date, real office photos, history. Remove botanical seal and vague headings. |
| Contact | `/contact` | Policy support / contact form | Preserve form behavior, improve form surface, focus, heading, mobile pacing. |
| Visit | `/locations` | Directions / hours | Preserve actual photo, map, copy-address and practical information. |
| Questions | `/faq` | Find an answer / call | Keep topic navigation, native details and source content; simplify repeated decorative numbering. |
| Legal | `/privacy`, `/accessibility` | Read policy / get help | Retain copy and reading navigation, remove unrelated botanical art. |
| Quote | `/quote` | Complete intake | Preserve working module and existing user edits; align presentation through separate shared tokens. |
| Admin | `/admin` | Manage intake configuration | Operational utility; preserve workflow, review responsive login and existing tests. |
| Not found | `/404` | Recover navigation | Replace poetic headline with a direct recovery message and coverage link. |

No public testimonials-only route or approved carrier-logo inventory exists. Reviews are shared components on home, about, catalog, coverage and city routes. No new routes are needed.
