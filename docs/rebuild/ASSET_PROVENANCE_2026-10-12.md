# Acquisition asset provenance and visual rules

## Three visual modes

1. Actual office photography establishes business identity. Never substitute generated staff, customers or office photographs.
2. Architectural editorial raster illustration explains auto/home/business coverage. Cool white, navy, slate blue, believable proportions, restrained material texture. These are conceptual scenes, not locations or evidence.
3. Technical SVG line drawings explain coverage, documents, connections, process and geography. Shared navy/blue strokes and small corners; no unrelated plants, stars, blobs or floating ornaments.

Use road motifs with auto, architectural outlines with property, fleet/building graphics with commercial, document graphics with filing, and route/location graphics with office service. Do not fill every empty corner. Reserve real photographs for real-business claims. Use responsive Astro Image output with dimensions; below-fold images lazy load. Motion follows `tokens.css`, with no informational opacity loss and global reduced-motion equivalents.

## Generated raster assets

Generated with the **built-in image generation tool**, not a CLI fallback. Each source is 1536×1024 PNG, retained for future optimization; browser delivery uses Astro AVIF/WebP. Paths below are relative to `original-insurance/`. No image represents an actual employee, customer or office.

### Homepage

Saved: `src/assets/southern-california-auto-home-business-v3.png`; stable optimized metadata derivative: `public/images/southern-california-insurance-v3.webp`.

Prompt:

> Use case: stylized-concept. Asset type: premium insurance agency website hero illustration, landscape 3:2. Create a sophisticated architectural editorial illustration for Original Insurance Services, Southern California. One coherent cropped street-level composition with a modest single-story California stucco house at left, a navy everyday sedan in foreground center, and a small modern neighborhood shop and white work van at right. Show recognizable complete structures and vehicles, not an entire cartoon city. No people, logos, typography, words, or labels. Crisp fine navy drafting outlines, restrained flat gouache-like material texture, cool off-white background #eef3f7, deep navy #142b44, blue #245da0, pale slate, tiny warm ochre accents on building materials only. Controlled architectural perspective, believable proportions, strong graphic silhouettes, spare elegant road geometry. Feels commissioned for an established local insurance agency, not children’s art, stock 3D, Pixar, miniature isometric world, glossy render, beige watercolor, fantasy suburb, excessive vegetation, palm-tree clipart, floating cards, or gradients. Keep the subjects relatively large and uncluttered, with edges breathing, designed to sit beside a bold sans-serif heading. This is clearly conceptual illustration, not a real office or a real geographic location.

### Auto

Saved: `src/assets/photos/auto-coverage-editorial-v3.png` (the existing directory name does not make this a photograph).

Prompt:

> Use case: stylized-concept. Asset type: landscape 3:2 auto insurance editorial illustration for Original Insurance Services. A single unbranded navy everyday sedan, three-quarter side view, parked on a Southern California street. A low stucco wall and modest architectural facade behind it, no people, no signs, no words. Refined commissioned architectural illustration: crisp fine navy technical outlines, flat gouache-like material texture, restrained realistic proportions and perspective. Palette cool off-white #eef3f7, navy #142b44, slate blue #245da0, tiny warm ochre material accents. Car occupies 65 percent of frame, fully visible including wheels, strong clear silhouette; simple road geometry gives direction. Calm uncluttered background. Not a photograph, not an actual business, no logo, no glossy 3D, no cartoon or miniature city, no beige watercolor, no huge trees, no palm clipart, no floating insurance icons. Cohesive premium style for an established local agency.

### Home

Saved: `src/assets/photos/home-coverage-editorial-v3.png`.

Prompt:

> Use case: stylized-concept. Asset type: landscape 3:2 home insurance editorial illustration for Original Insurance Services. A modest single-story Southern California stucco bungalow, entire front elevation visible, with a small front porch and a simple paved walkway, restrained drought-tolerant landscaping. Clearly a conceptual home, not an actual property. Refined commissioned architectural illustration with crisp fine navy drafting outlines, flat gouache-like material texture, realistic proportions and perspective, no people. Palette cool off-white #eef3f7, deep navy #142b44 roof and window trim, slate blue #245da0 shadows, tiny muted ochre accent at the doorway. House fills 65 percent of frame, strong architectural lines and material details. Background very spare cool pale sky. No text, logos, mountains, sea, palm trees, excessive plants, floating cards, shields, glossy 3D, cartoon, miniature town, beige watercolor. Premium, practical and inviting local agency art direction, restrained rather than fantasy luxury.

### Commercial

Saved: `src/assets/photos/commercial-coverage-editorial-v3.png`.

Prompt:

> Use case: stylized-concept. Asset type: landscape 3:2 commercial auto insurance editorial illustration for Original Insurance Services. A white unbranded work van and smaller navy service pickup parked in front of a modest Southern California light-industrial workshop with a simple flat roof and garage door. No people, no logos, no wording or signs. Refined commissioned architectural illustration with crisp fine navy drafting outlines, flat gouache-like material texture, realistic vehicle proportions and perspective, clear strong silhouettes. Palette cool off-white #eef3f7, deep navy #142b44, slate blue #245da0, tiny muted ochre building material accents. Vehicles and practical business building fill frame, uncluttered paved foreground. Clearly conceptual illustration, not a real business photograph. No shipping terminal, enormous fleet, cartoon city, glossy 3D, miniature isometric world, beige watercolor, floating cards, vegetation decorations, or fantasy architecture. Visually cohesive with premium understated architectural house and sedan illustrations.

### Auto variation — October 13, 2026

Saved: `src/assets/photos/auto-coverage-editorial-v4.png`. Generated with the built-in image generation tool. Replaces v3 in the shared auto coverage data (homepage explorer, Services, Auto guide, and related coverage). The homepage hero is unchanged. The previous source is retained for provenance. This is conceptual illustration, not a real customer vehicle or verified location.

The silver crossover, rear three-quarter angle, and residential setting differentiate the auto panel from the hero's front-facing navy sedan. Responsive AVIF/WebP delivery continues through Astro.

Prompt:

> Use case: stylized-concept. Create a finished landscape 3:2 editorial illustration for the auto insurance coverage panel of Original Insurance Services, a sophisticated Southern California independent insurance agency. This is ONLY the illustration asset, not a website screenshot, layout, or mockup. Subject: a contemporary silver-gray compact crossover SUV, viewed from rear three-quarter angle, nose pointing toward the RIGHT, all wheels and vehicle fully inside frame. Distinct from a navy sedan viewed from the front. Scene: a believable quiet Southern California residential street, low understated mid-century homes set back behind modest drought-tolerant landscaping, simple sidewalk, a few mature shade trees. No ocean, no mansion, no prominent palm trees. Vehicle is main subject but occupies roughly half the width, with ample environmental breathing room and crop-safe margins. Style: carefully art-directed semi-realistic painted editorial illustration, crisp architectural forms, restrained brush texture, matte finish, natural soft daylight. Cool navy shadows, pale blue-gray atmosphere, silver bodywork, subdued green vegetation and white architectural surfaces. Premium but ordinary and believable, not a glossy car advertisement. No people, no text, no lettering, no readable license plate, no logos or car badges, no watermark. Correct wheels, windows, road perspective, architectural geometry and realistic proportions. No fantasy architecture, excessive golden light, dramatic lens blur, glowing effects, glass UI, or decorative graphics.

## Official carrier assets

The relationship and category inventory comes from the user's explicit list of 24 companies/markets, not logo availability. Asset access alone does not establish a carrier relationship or guarantee a product's availability.

| Asset in `src/assets/carriers/` | Official source | Treatment |
|---|---|---|
| `chubb.png` | [Chubb media logos](https://news.chubb.com/logos?item=19156), [usage guide](https://news.chubb.com/usage-guide) | Original black RGB asset, proportions preserved; attribution on market page |
| `foremost.png` | [Foremost agent marketing](https://www.foremostagent.com/marketing), `https://www.foremostagent.com/assets/images/Foremost_Choice_Property-Casualty.png` | Official supplied variant, unaltered colors |
| `bristol-west.png` | [Foremost agent resources](https://www.foremostagent.com/marketing), `https://www.foremostagent.com/assets/marketing/logoMaterials/img/Bristol-West-Full-Color-Logos.zip` | Official `Rep_BristolWest_IG_Color.png`, unaltered colors |

Astro optimizes these to small WebP output with intrinsic dimensions. `CarrierLogo.astro` provides a common visual container without stretching or tint filters. Other names are normal text. [Progressive](https://design.progressive.com/logo) requires agent-ad approval; [Kemper terms](https://www.kemper.com/terms-of-use) require permission. Obtain approved assets rather than copying random search images. [Blitz](https://www.blitzinsurance.com/about-us) is a market/MGU; wording deliberately says companies and markets, not that all entries are insurers writing every product.

## Geographic, informational and social artwork

`src/data/service-area.ts` uses city representative coordinates from the [2025 Census California places gazetteer](https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_gaz_place_06.txt). It is an orientation diagram, not a road map. Downey represents the office city, not an exact building coordinate. Directions use the actual street address. Surrounding markers mean service areas, not offices.

`BrokerConnection`, `CoverageDiagram`, `LineMotif`, `LineAccent` and `ServiceAreaMap` use code-native SVG. `scripts/generate-social.mjs` generates seven 1200×630 SVG/JPEG pairs in `public/images/social/`: original-insurance, auto, home, commercial, sr22, license and es. These are template graphics, not image-generation outputs.

Insurance explanations were checked against [CDI auto guidance](https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/auto101.cfm), [CDI residential guidance](https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/res-ins-guide.cfm) and [DMV financial responsibility guidance](https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/). Language architecture follows [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions); an assistance hub is not represented as an equivalent translation of every source page.

## Official carrier artwork — October 13 refinement

The post Phase Three pass added 18 authentic carrier logo assets, bringing the implemented visual-logo count to 21 of 24 names. These are official supplied graphics, not generated illustrations. SVG rasterization and responsive image conversion preserve their artwork; no carrier identity was reconstructed or recolored. Existing Chubb, Foremost, and Bristol West assets remain.

See the category records for exact official source pages, URLs/inline selectors, processing, and exceptions:

- [Auto logo sources](CARRIER_LOGO_SOURCES_2026-10-13_AUTO.md)
- [Property logo sources](CARRIER_LOGO_SOURCES_2026-10-13_PROPERTY.md)
- [Commercial logo sources](CARRIER_LOGO_SOURCES_2026-10-13_COMMERCIAL.md)

Progressive, CNA, and Attune remain text pending agency-authorized artwork/permission; source verification alone is not an approval grant. NEXT's current ERGO | NEXT artwork is used without changing the encoded relationship name. No assets were deployed in this pass.
