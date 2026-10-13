# Commercial carrier logo sources — October 13, 2026

Actual official website artwork, retrieved for the local OIS refinement. No logo was generated, traced, reconstructed with text, or fetched from a third-party logo library. These sources establish provenance, not a blanket trademark license or a product-availability claim. The encoded business relationships and their qualifications remain unchanged. No deployment occurred.

## Assets prepared

All four outputs are transparent PNGs in `original-insurance/src/assets/carriers/`, rasterized directly from official SVG with the project's existing Sharp dependency. Original paths, geometry and colors are preserved. Width is 600px for responsive Astro processing. Raw source snapshots are retained locally in ignored `output/carrier-source-commercial/`.

| Network name | Local asset | Dimensions | Official source page | Exact artwork source |
| --- | --- | --- | --- | --- |
| NEXT Insurance | `next-insurance.png` | 600 × 84 | https://www.nextinsurance.com/ | Inline SVG with `aria-label="ERGO \| NEXT Insurance logo"` in the official homepage header; viewBox `0 0 229 32` |
| Hiscox | `hiscox.png` | 600 × 292 | https://www.hiscoxgroup.com/about-hiscox/our-brand | https://www.hiscoxgroup.com/themes/custom/hiscox/logo-black.svg |
| THREE | `three.png` | 600 × 211 | https://threeinsurance.com/ | https://threeinsurance.com/three-logo.svg — explicitly identified by the site's Organization/ImageObject JSON-LD |
| Blitz | `blitz.png` | 600 × 193 | https://www.blitzinsurance.com/ | https://cdn.prod.website-files.com/6849cf37787dd9efa946a7bf/6a4496324da53db147fab56a_Blitz%20Insurance%20Logo.svg — official homepage's `nx-logo-dark` image, alt “Blitz Insurance Logo” |

NEXT's current official header uses the **ERGO | NEXT** lockup. The [official About page](https://www.nextinsurance.com/about-us/) describes the acquisition and ERGO NEXT identity. This work preserves the existing OIS network name and uses the actual current artwork; it does not add a new carrier relationship.

Hiscox's US homepage returned a browser block; the separate public Group brand page and its directly linked logo were available normally. No access control or challenge was bypassed.

THREE's orange corner device, stacked subsidiary line, and supplied aspect ratio are part of its actual official asset. Blitz's orange/purple artwork is the supplied dark-on-light version; it has not been recolored to OIS navy.

Chubb's existing official asset is retained unchanged.

## Text treatment retained pending agency assets/permission

### Attune

The official homepage identifies this actual header asset:

https://cdn.prod.website-files.com/63c035ba129833c876e244ca/6679cf0c5c9b3a88b42188c0_Attune_Logo_TM.png

However, the [official corporate/licensing/legal page](https://www.attuneinsurance.com/legal/corporate-licensing-and-legal-information) expressly requires written permission for commercial trademark/logo use. No evidence of that agency permission exists in this checkout. The candidate is retained only in ignored research output; **no Attune logo is added to app assets**. Keep the established plain-text network entry until OIS supplies approved artwork or confirms its authorization.

### CNA

The public site returned HTTP 403/browser blocking to local retrieval. Its [official terms](https://www.cna.com/cna/cnadisclaimer/termsofuse), section 2, also require prior written consent for reuse of the marks. No official usable download or agency permission was verified. No third-party substitute was used; keep the plain-text entry.

## Review

All prepared PNGs were inspected visually against their official source markup. Retain clear space and original colors when displayed. Use descriptive carrier alt text, existing market qualification, lazy image loading, and Astro responsive image output. Public availability alone should not be described as an official endorsement of OIS or an approval grant.
