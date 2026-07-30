# Original Insurance Website — Application Support Runbook

## Purpose

This runbook documents the production support model for `originalinsurance.net`. It is intended for incident triage, handoff, release validation, and root-cause review.

## Production Architecture

- React 19 + TypeScript + Vite application
- Static prerendering for canonical routes
- Vercel production hosting and edge headers
- Vercel Analytics and Speed Insights for traffic and performance signals
- Web3Forms for general contact-form delivery
- Quotzal for the embedded insurance quote workflow
- Google Maps for office-location embeds

## Data Flows

| Flow | Entry point | Processor | Expected result |
|---|---|---|---|
| General inquiry | `/contact` | Web3Forms | Message delivered to office inbox |
| Quote request | Quote widget | Quotzal | Quote intake available to brokerage staff |
| Performance telemetry | All routes | Vercel | Aggregate performance and usage signals |
| Office directions | Contact/location pages | Google Maps | Interactive map loads inside allowed frame |

Never request Social Security numbers, payment-card details, passwords, or full driver’s-license images through the general contact form.

## Severity Model

- **SEV-1:** Entire production site unavailable, malicious redirect, or confirmed exposure of customer information.
- **SEV-2:** Quote workflow or contact workflow unavailable; primary money page failing; widespread broken navigation.
- **SEV-3:** Single-page defect, degraded image or map, analytics gap, or non-blocking accessibility regression.
- **SEV-4:** Copy, styling, or minor content defect with a documented workaround.

## Initial Triage

1. Record UTC/local time, affected URL, device/browser, and exact user-visible symptom.
2. Reproduce in a clean browser session.
3. Check response status, redirects, browser console, and failed network requests.
4. Identify the boundary: app, Vercel edge/routing, Web3Forms, Quotzal, Google Maps, or client network.
5. Capture a minimal evidence set without customer PII.
6. Apply the lowest-risk fix and run the required validation suite.

## Required Validation

From `original-insurance/`:

```bash
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
```

From the repository root:

```bash
bash scripts/deploy.sh --dry-run
```

Deploy only with:

```bash
bash scripts/deploy.sh
```

## Workflow-Specific Checks

### Contact form

- Verify `VITE_WEB3FORMS_KEY` exists in the deployment environment.
- Confirm `https://api.web3forms.com/submit` is permitted by Content Security Policy.
- Submit only synthetic test data.
- Confirm success and failure states are readable and keyboard accessible.

### Quote widget

- Confirm `https://quotzal.com/f/original-insurance` loads in the iframe.
- Confirm the new-tab fallback works.
- Verify the CSP `frame-src` directive still allows Quotzal.
- Check desktop and mobile modal height, focus order, close control, and body-scroll restoration.

### Routing and SEO

- Canonical URLs never use trailing slashes.
- `?q=` URLs redirect without retaining the query.
- Unknown URLs must return a real 404.
- Do not add a global SPA catch-all rewrite.
- Validate the sitemap route list against the prerender list.

## Incident Communication Template

```text
Impact:
Start time:
Affected workflow/routes:
Current status:
Evidence:
Suspected boundary:
Mitigation:
Next update:
```

## Root-Cause Review

For SEV-1 and SEV-2 incidents, document:

- customer and business impact
- timeline and detection source
- technical root cause
- why existing controls did not prevent or detect it earlier
- corrective action with owner and due date
- regression test or monitoring change

Do not include customer PII, credentials, API keys, or access tokens in tickets, screenshots, commits, or post-incident documents.
