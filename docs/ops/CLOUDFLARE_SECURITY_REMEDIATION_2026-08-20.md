# Cloudflare Security Remediation — 2026-08-20

## Verified state

- Cloudflare nameservers are authoritative for `originalinsurance.net`.
- Google Workspace handles email through the five Google MX hosts.
- SPF exists: `v=spf1 include:_spf.google.com ~all`.
- `_dmarc.originalinsurance.net` does not exist.
- The common `google._domainkey` selector does not exist; confirm the active selector in Google Admin before enforcing DMARC.
- The apex and `www` web records resolve directly to Vercel and live responses contain Vercel headers, not Cloudflare proxy headers.

## Completed in the website

- Publish `/.well-known/security.txt` with the public business contact, canonical URL, preferred languages, and an expiry less than one year away.
- Permanently redirect `/security.txt` to the RFC location.
- Validate both endpoints during every production deployment.

## Cloudflare/Google Admin actions requiring authenticated account access

1. In Google Admin, open Apps > Google Workspace > Gmail > Authenticate email. Generate or confirm a 2048-bit DKIM key, publish the exact selector/value Google supplies in Cloudflare DNS, then start authentication.
2. Create a monitored same-domain address or Google Group for aggregate DMARC reports, such as `dmarc@originalinsurance.net`.
3. After SPF and DKIM have been active for at least 48 hours, add a Cloudflare DNS TXT record at `_dmarc` beginning with a monitoring policy: `v=DMARC1; p=none; rua=mailto:dmarc@originalinsurance.net`.
4. Monitor reports for at least one week, inventory every legitimate sender, then stage `quarantine` at a small percentage before considering `reject`.
5. Do not orange-cloud the Vercel apex or `www` record solely to clear the unproxied-CNAME insight. Vercel recommends DNS-only records and does not recommend placing an external reverse proxy in front of Vercel. Archive that Cloudflare insight as an accepted architecture exception.
6. AI Labyrinth is optional bot-policy configuration, not a vulnerability. It cannot protect DNS-only Vercel traffic at Cloudflare's HTTP edge; do not enable a second reverse proxy solely to clear this suggestion.

Never proxy Google MX, SPF, DKIM, DMARC, or verification records.
