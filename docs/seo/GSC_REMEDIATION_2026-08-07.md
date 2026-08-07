# Google Search Console Remediation — August 7, 2026

This record captures the Search Console screenshots and text supplied by the site owner, the technical interpretation, the implemented remediation, and the manual actions that remain inside Google Search Console.

## Search Console Evidence Supplied

### Page indexing report

- Last report update shown: July 23, 2026.
- Indexed: 23 pages.
- Not indexed: 13 URLs across four active reasons.
- Not found (404): 5 examples.
- Page with redirect: 5 examples.
- Crawled — currently not indexed: 2 examples.
- Discovered — currently not indexed: 1 URL, with passed validation.
- Redirect error and alternate-canonical categories showed zero affected URLs and passed validation.

The 404 examples shown were:

- `https://originalinsurance.net/faq/`
- `https://originalinsurance.net/about/`
- `https://originalinsurance.net/auto-insurance-downey-ca/`
- `https://originalinsurance.net/sr22-insurance-downey/`
- `https://originalinsurance.net/cdn-cgi/l/email-protection`

The redirect examples shown were:

- `https://originalinsurance.net/insurance/lynwood/`
- `https://originalinsurance.net/index.html`
- `https://originalinsurance.net/contact/`
- `https://originalinsurance.net/insurance/bellflower/`
- `https://originalinsurance.net/insurance/downey/`

The crawled-not-indexed examples shown were Google-generated search-template URLs:

- `https://originalinsurance.net/faq/?q={search_term_string}`
- `https://originalinsurance.net/faq?q={search_term_string}`

### Sitemaps and HTTPS

- `/sitemap.xml`: success, last read August 6, 2026, 25 discovered pages.
- `/SITEMAP.XML`: success, last read July 29, 2026, 23 discovered pages.
- HTTPS report: 21 HTTPS URLs and zero non-HTTPS URLs; no critical issue detected.

The lowercase sitemap is authoritative. The uppercase URL is a legacy duplicate and redirects to the lowercase canonical.

### Search performance supplied

- Last 28 days: 3.68K impressions, up 26%.
- Last 28 days: 4 clicks, down 20%.
- Approximate CTR from the supplied totals: 0.11%.
- Visible branded query: `original insurance services`, 2 clicks.
- Visible pages with clicks: homepage 3, About 1, Contact 1.
- Image Search contributed 1 click.
- The report contained 282 query rows, but the complete query/page export was not supplied.

The low click count makes country percentages statistically noisy. The important signal is rising visibility with weak click-through and limited non-branded demand capture.

## Technical Interpretation

Search Console's July 23 exclusion report is a historical crawl snapshot, not a real-time inventory of the current production site.

- Clean canonical pages intentionally do not use trailing slashes.
- Trailing-slash variants now redirect once with HTTP 308 to their clean canonical URLs.
- `/index.html` intentionally redirects to `/`.
- The Cloudflare email-protection crawler artifact intentionally returns HTTP 410 and should not be indexed.
- FAQ query-template URLs intentionally strip `?q=` with HTTP 308 and are disallowed in `robots.txt`.
- “Page with redirect” is expected for redirect-source URLs; Google should index the destination, not the source.
- The authoritative sitemap contains only the 25 clean canonical URLs.

The earlier production routing incident that caused canonical route 404s was fixed before this content pass. The approved deployment pipeline now prerenders and verifies all 25 canonical routes and prevents incomplete automatic Vercel builds from replacing production.

## Changes Implemented in This Pass

- Rewrote titles and descriptions across every canonical page family to be clear, unique, and professional.
- Assigned distinct intent to the homepage, `/insurance/downey`, and `/auto-insurance-downey-ca` to reduce internal competition.
- Added visible reviewer, review date, official California consumer resources, and policy-terms disclaimer to substantive insurance pages.
- Corrected or qualified California SR-22 duration, filing, fee, lapse, and processing claims throughout the site.
- Updated California minimum-liability guidance to the 30/60/15 limits effective January 1, 2025.
- Removed fixed price ranges, fixed bundle savings, unsupported client-volume statements, repeated exact-match “cheap car insurance” language, and unsupported accreditation or membership claims.
- Added an official California insurance-license lookup link without inventing a license number.
- Refined the visual system with calmer heroes and buttons, clearer quote steps, stronger local-office proof, and a restrained trust panel.
- Updated all 25 sitemap modification dates after substantive page changes.

## Manual Search Console Actions After Deployment

1. Keep `/sitemap.xml` submitted. Remove the legacy `/SITEMAP.XML` submission from Search Console if the interface allows it; the redirect can remain for old crawlers.
2. Use URL Inspection → Test Live URL on the homepage and priority canonical pages such as `/auto-insurance-downey-ca`, `/sr22-insurance-downey`, `/home-insurance-downey-ca`, `/services`, and `/about`.
3. Request indexing for a small set of priority canonical pages after the live test succeeds. Do not request indexing for trailing-slash, query-template, `/index.html`, or `/cdn-cgi/` URLs.
4. Restart validation for the historical 404 category after Google sees the new production responses. The crawler artifact may remain excluded as 410, which is correct.
5. Restart validation for crawled-not-indexed after the query URLs redirect cleanly. Google may continue listing old examples until its reporting window refreshes.
6. Treat “Page with redirect” as expected when each source makes one hop to the intended self-canonical destination.
7. Allow at least one or more crawl/reporting cycles before judging the new totals. Search Console validation dates lag deployments.

## Measurement Plan

Compare 28-day periods after recrawl using:

- clicks and CTR by non-branded query;
- impressions, clicks, CTR, and average position by canonical page;
- homepage versus Downey auto versus Downey service-area queries;
- growth in auto, SR-22, home, commercial auto, and nearby-city intent;
- indexed canonical count and exclusion examples, not just the category headline.

For the next keyword pass, export the complete 282-row Search Console Queries report and the Pages report for the same date range. That is required to prioritize changes from actual impressions instead of guessing from the few visible rows.

## Primary Research Sources Used

- Google Search Central: creating helpful, reliable, people-first content — `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Google Business Profile: how local ranking works — `https://support.google.com/business/answer/7091`
- Google Business Profile: review best practices — `https://support.google.com/business/answer/3474122`
- Google Search Central: Organization structured data — `https://developers.google.com/search/docs/appearance/structured-data/organization`
- California Department of Insurance: auto insurance guide — `https://www.insurance.ca.gov/01-consumers/105-type/95-guides/01-auto/auto101.cfm`
- California Department of Insurance: current auto liability limits — `https://www.insurance.ca.gov/01-consumers/105-type/9-compare-prem/auto-limits.cfm`
- California Department of Insurance: earthquake insurance guide — `https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/eq-ins.cfm`
- California Department of Insurance: license lookup — `https://cdicloud.insurance.ca.gov/cal/`
- California DMV: financial responsibility and SR-22 guidance — `https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/`

## Business-Owner Verification Still Needed

- The exact California insurance license number for prominent display.
- Current carrier appointment list and permission to display carrier logos.
- Confirmation of any association, chamber, accreditation, or award claims before they return to the site.
- Current Google Business Profile review total if the visible count changes.
