# Original Insurance acquisition rebuild — audit record, 2026-10-12

No deployment authorized or performed. Work builds on the existing uncommitted visual refinement; starting tracked patch and source snapshot are in `output/playwright/acquisition-baseline/`.

## Funnels guiding implementation

| Visitor | Landing / first answer | Trust and hesitation | Primary / secondary action | After click |
|---|---|---|---|---|
| Personal auto | Auto guide: coverage and driver fit | Independent markets, real office; avoid price promises | Auto quote / call | Auto selected, editable |
| Property | Home guide: owner or renter needs | Explain exclusions and limits | Home quote / call | Home selected |
| Commercial | Commercial auto or services#business: vehicle vs business risks | Distinguish product from market access | Commercial auto quote / business question | Relevant intake or human support |
| SR-22 | SR-22 guide: filing vs insurance vs DMV | No reinstatement guarantees | Quote / call | Auto + visible removable SR-22 context |
| License situation | License guide: lawful ownership and actual drivers | Never imply permission to drive | Discuss options / call | Auto + removable license context |
| Existing customer | Contact: support rather than shopping | Explain confirmation needed for changes | Call / support message | Policy topic, no quote requirement |
| Spanish preference | Contextual Español link to /es | Actual Spanish human assistance; English form stated clearly | Spanish call / text / English online intake | Language preference forwarded, context retained |
| Office visit | Locations: address/hours before photo | Real office photo; one Downey office | Directions / call | Google Maps at exact address |
| Surrounding city | City guide: service from Downey | Census-positioned city diagram, no fake branch | Quote / call | Auto + allowlisted source-city context, not residence |
| Office services | Services: verified notary/registration/translation | Requirements vary, ask what to bring | Contact / call | Human assistance |

## Implemented

- Shared allowlisted quote context across service, city, navigation, inline, mobile and final CTAs; safe email summary context.
- Unknown-path progress uses Getting started. Compact mobile coverage choices; default optional phone, required for call/text preference; existing configuration preserved.
- Carrier data from user-provided network, category filter, reusable CarrierLogo, /insurance-markets, official Chubb/Foremost/Bristol West assets. Other brands use ordinary text pending suitable approved assets.
- /es assistance hub, true `lang=es`, honest English-form links and Spanish preference. This is not a full translation, so no misleading hreflang equivalents.
- Homepage rebuilt around concrete insurance message, new conceptual hero, coverage, real office, carrier access, broker relationship diagram, real reviews and geographic service area.
- New coordinated auto/home/commercial editorial art; responsive AVIF/WebP. Old generated city scenery replaced with actual office photo.
- Census 2025 California place coordinates for orientation map, one Downey office, connections explicitly not driving routes.
- Three CTA compositions, shared technical SVG motifs, illustrated explanations, compact server-rendered guide accordions, existing customer support and office essentials.
- Shared safe analytics allowlist; original GA property retained, sanitized page URLs/referrers; no custom event sends form answers or identifiers. No analytics on admin.
- New static pages registered, canonical/sitemap/redirect coverage; actual office identity consistent in schema; seven consistent social images.

## Final status

Implementation and local verification are complete. See [the final handoff](../handoffs/ACQUISITION_REBUILD_2026-10-12.md) for results, evidence and external production limitations. No deployment performed.

## Sources and limits

Carrier relationship/category source: explicit user list. Asset sources: https://news.chubb.com/logos?item=19156 and https://www.foremostagent.com/marketing and /products/. Chubb attribution retained. Progressive requires agent ad approval; Kemper requires permission, so no logo copied for either.
Census: https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_gaz_place_06.txt
Insurance explanations checked against CDI auto and residential consumer guides. Business facts (address/phone/hours/languages/1999/office services) retained from repository; no new business claims invented.
Generated illustrations are conceptual and not photographs of clients or the business. Actual staff photography remains a future recommendation.
