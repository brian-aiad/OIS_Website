# Auto carrier logo sources — October 13, 2026

Collected from the carriers' own public websites for the local OIS refinement. These are actual supplied logo artwork, not generated logos or recreated wordmarks. Source verification establishes authenticity; it does not establish separate agency advertising approval. Carrier names and availability qualifications remain unchanged. Nothing was published.

| Carrier | Official source page | Exact asset or embedded-source location | Local asset | Dimensions |
|---|---|---|---|---|
| Kemper | https://www.kemper.com/ | Header inline SVG, `viewBox="0 0 259.76 48.71"`, first SVG in official homepage HTML | `original-insurance/src/assets/carriers/kemper.png` | 800 × 150 |
| National General | https://nationalgeneral.com/ | https://nationalgeneral.com/imgs/NatGen_all_vert_rgb_pos.png | `original-insurance/src/assets/carriers/national-general.png` | 184 × 86 |
| MAPFRE | https://www.mapfreinsurance.com/ | https://www.mapfreinsurance.com/media/logo_mapfre-insurance-trademarc_desktop.png | `original-insurance/src/assets/carriers/mapfre.png` | 367 × 29 |
| Hagerty | https://www.hagerty.com/ | Header inline SVG `[data-testid="hagerty-logo"]` from official homepage HTML | `original-insurance/src/assets/carriers/hagerty.png` | 800 × 189 |
| Aspire | https://www.aspiregeneral.com/ | https://www.aspiregeneral.com/_nuxt/brand-logo-dark.DDPgUvDd.png | `original-insurance/src/assets/carriers/aspire.png` | 641 × 120 |
| Bridger | https://www.bridgerins.com/ | https://cdn.prod.website-files.com/664bb82b419869cc5cea0ce1/66c849e9570e01c04cbb978c_Logo%20-%20Navbar.svg | `original-insurance/src/assets/carriers/bridger.png` | 800 × 223 |

The Bridger CDN asset is directly referenced by its official homepage; the CDN itself is not treated as an independent authority. Embedded Kemper and Hagerty SVGs have no separate asset URL. Their official page URL and precise source selector identify the original.

## Processing and visual checks

- SVG originals are retained as `docs/brand-assets/carriers/{kemper,hagerty,bridger}-official.svg`.
- PNGs were losslessly re-encoded; SVGs were rasterized using the existing Sharp dependency. No paths, lettering, palette, or logo proportions were redesigned.
- Hagerty uses `currentColor` for its black artwork. The official live header computed color was measured in Chromium as `rgb(21, 21, 24)`; this inherited color was explicitly supplied during rasterization so the standalone artwork retains the official appearance.
- Browser-delivered HTML parsed for standalone SVG uses the correctly cased `viewBox` attribute; the geometry is unchanged.
- All six were visually reviewed on white. Contact sheet: `original-insurance/output/playwright/refinement-footer/auto-logos.png` (ignored QA artifact).
- National General's current public header asset is comparatively small; retain its native resolution and avoid oversized presentation.
- Existing Bristol West asset is retained and was not replaced by this task.

## Progressive — hold for agency brand confirmation

The official brand page provides an authentic blue Progressive logo at:

- Source: https://design.progressive.com/logo
- Asset: https://design.progressive.com/uploads/progressive_logo_9e9f26946c.svg

However, that page explicitly states that local agent use needs approval by Progressive's Agent Ads team. Approval evidence is not present in this repository. The official logo usage guidance also describes a separate **Drive Insurance** identity for California auto/motorcycle products sold through agencies:

https://np-design.progressive.com/logo-usage-exceptions

Therefore this task does not label Progressive artwork approved or substitute Drive branding for the user's verified carrier name without confirmation. Progressive remains the intentional text entry pending the correct agency-authorized California brand asset. No logo was invented. This is a specific source-supported exception, not an inability to find the logo.
