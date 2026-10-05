# Search click opportunities — October 5, 2026

## What the supplied data establishes

The July 3–October 2 query examples show visibility with few clicks. They do not include average position, the ranking URL per query, device, or country. Zero clicks therefore cannot be attributed solely to titles, page quality, or indexing. The sample is ten of 319 queries, not the complete performance report.

| Query / cluster | Supplied clicks / impressions | Existing destination to investigate |
|---|---:|---|
| original insurance services | 9 / 268 | `/` |
| home insurance | 0 / 232 | `/home-insurance-downey-ca` |
| car insurance norwalk | 0 / 167 | `/insurance/norwalk` |
| car insurance in lynwood, ca; auto insurance in lynwood, ca | 0 / 108; 0 / 85 | `/insurance/lynwood` |
| car insurance quotes montebello; car insurance in montebello; cheap car insurance montebello | 0 / 99; 0 / 90; 0 / 89 | `/insurance/montebello` |
| downey asc commercial insurance; downey asc insurance | 0 / 231; 0 / 113 | Inspect the actual ranking URL before assigning intent |

The destinations above are editorial intent assignments, not a claim that GSC has identified those exact landing pages. “ASC” may refer to another business or a different intent; its meaning is unverified. Do not add that phrase to Original’s identity or claim an affiliation.

## Implemented metadata refinements

Changed only metadata in `src/data/pages.json`; preserved URLs, schema, and all 25 routes.

- **Home coverage:** `Home & Renters Insurance in Downey | Original Insurance`. Description now previews rebuilding limits, belongings, deductibles, and exclusions rather than simply listing coverage lines.
- **Norwalk:** `Car Insurance Quotes in Norwalk, CA | Original Insurance`. Description emphasizes a coverage comparison, SR-22 help, and online/phone quote access through the actual Downey team.
- **Lynwood:** `Car Insurance in Lynwood, CA | Original Insurance`. Description makes the Downey office and English/Spanish/Arabic service explicit.
- **Montebello:** `Car Insurance Quotes in Montebello | Original Insurance`. Description explains matching limits/deductibles and eligible discounts, without promising a cheapest rate.
- **Commercial auto:** Kept its accurate title; made the description specific to work trucks, vans, fleets, business use, and certificate requirements.
- **Homepage:** Kept the existing broker-intent title and aligned the JSON description with the metadata already rendered by `index.astro`. The actual homepage description did not change in this pass.

These are relevance and clarity improvements, not a ranking guarantee or a claim that exact wording alone increases clicks. Google recommends distinct, descriptive titles and may construct its displayed title from headings and other sources. Current service headings already name their products; no H1 changes were necessary in the owned data file. [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)

Descriptions summarize visible content instead of adding unsupported offers. Google can choose a query-dependent snippet from page text rather than the supplied meta description. [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

## What to measure next

1. Export GSC query and page data with clicks, impressions, CTR, and average position. For each priority query, open its Pages view and inspect the actual landing URL; segment mobile/desktop and relevant countries.
2. Record the deployment date. Compare equivalent 28-day periods after Google has recrawled the changed pages, then review a longer period where low volume makes short comparisons noisy. Keep a record of other changes and seasonality.
3. If relevant queries have useful positions but weak CTR, inspect the displayed snippet and competing result intent. If positions are weak, investigate usefulness, local relevance, business prominence, and the actual competitor landscape rather than repeatedly rewriting titles.
4. Track quote opens, genuine quote completions when Quotzal provides a reliable integration, and phone/contact actions separately. A quote-dialog open is not a completed lead. Never send personal form details to analytics.
5. Export the two crawled-not-indexed and two discovered-not-indexed URLs; compare the full indexed report with the 25-URL sitemap. Existing slash redirects and the retired Cloudflare 410 are intentional and should not be reversed to make excluded-URL counts disappear.

GSC supports query/page/device dimensions and separate CTR/position metrics; filtered results provide the evidence needed for this diagnosis. [Search Console performance documentation](https://support.google.com/webmasters/answer/7576553)

## Google Business Profile and reviews — account-side work

- Confirm the existing profile is verified and its real name, Downey address, phone, office hours, holiday hours, website, and supported services match the business. Use accurate categories available in the account and current real office photographs. Do not claim additional branch offices in service-area cities.
- Keep the real-world business name; do not append search phrases or create profiles for cities without eligible staffed locations. [Business representation guidelines](https://support.google.com/business/answer/3038177)
- Request an honest review after a genuine customer interaction using the business’s Google review link or QR code. Ask consistently, without incentives or pressure to leave a positive rating. Reply helpfully and avoid revealing policy or personal details in public replies. Google supports review links, QR codes, and replies, and prohibits incentives for reviews. [Google review guidance](https://support.google.com/business/answer/3474122)
- Seek legitimate local references through actual business relationships and accurate directory listings; do not buy links or fabricate memberships. These are proposed business-development actions, not actions taken by this coding pass.

Google describes local visibility in terms of relevance, distance, and prominence. Complete information, links, and genuine reviews can help; design changes cannot eliminate distance or buy a ranking position. [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en-en)

## New pages: improve existing destinations first

No new routes are warranted from these ten query rows alone. Home/renters, commercial auto, and the three highlighted cities already have relevant destinations. Expand useful explanations on those pages before adding near-duplicates.

A dedicated renters guide or general business-insurance guide could be appropriate later if actual customer questions, verified service details, and the full query/lead data justify a distinct intent. A new guide should answer its own questions, not merely swap a city or product name and funnel visitors to the same quote screen. Do not create pages for every city/product combination; Google explicitly identifies substantially similar regional funnel pages as a doorway-abuse risk. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)

Still needed from the business: verified carrier relationships, approved credentials, current review provenance, a working contact mailbox, and account access for GBP/GSC/Quotzal verification. No account changes, outreach, review requests, or production deployment were performed in this research pass.
