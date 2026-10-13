# Native OIS quote intake

OIS now has a native `/quote` page and a password-protected form editor at `/admin`. Quotzal remains unchanged in its separate repository. Quote links on the website navigate to `/quote`. The old embedded dialog, its unused CSS, and the Quotzal iframe CSP allowance have been removed from OIS.

## Scope

- Eight insurance categories; multiple drivers and vehicles (up to ten of each).
- Per-category field visibility/requirement, editable question labels/help, and up to ten custom questions per type, with essential field validation protected.
- Optional VIN decoding, repeat-entry summaries/undo, first-driver shortcut, contact preferences, and category-specific share links/invitations.
- Conditional existing-policy questions, review/edit, contact consent, and formatted email.
- Shared field catalog used by the editor, customer form, and server validation.
- No subscriptions, CRM, uploads, customer accounts, or production submission archive.
- Only configuration and expiring abuse-prevention counters are stored in Redis. Email content is retained by the email provider and recipient mailbox, subject to their settings.
- Date of birth is optional. No SSNs, payment details, medical records, or driver's license numbers are requested. Do not add highly sensitive fields without revisiting delivery and retention.

## Local preview

From `original-insurance/`:

```sh
npm ci
node scripts/setup-intake-local.mjs
npm run dev
```

The setup script creates a random admin password in `.intake-local-password` and its scrypt hash and session secret in `.env.local`. Both are ignored by Git. It refuses to overwrite an existing `.env.local`.

- Quote: `http://127.0.0.1:3002/quote`
- Admin: `http://127.0.0.1:3002/admin`
- Settings: `.intake-local/settings.json`
- Test emails: `.intake-local/mail/*.json` (formatted HTML and plain text)

The local banner explicitly identifies test mode. No email is sent from local mode. Use synthetic information only; captured local messages can be deleted after inspection. The local adapter is forcibly disabled when `VERCEL` is present or `NODE_ENV=production`.

## Production configuration

Set these server-only variables in the existing OIS Vercel project. Do not put them in public/browser variables or commit them:

| Variable                     | Purpose                                                       |
| ---------------------------- | ------------------------------------------------------------- |
| `INTAKE_ORIGIN`              | `https://originalinsurance.net`; exact allowed POST origin    |
| `INTAKE_ADMIN_PASSWORD_HASH` | Hex salt and scrypt hash separated by `:`                     |
| `INTAKE_SESSION_SECRET`      | At least 32 random characters for signed cookies              |
| `UPSTASH_REDIS_REST_URL`     | HTTPS Redis REST endpoint                                     |
| `UPSTASH_REDIS_REST_TOKEN`   | Redis REST credential                                         |
| `RESEND_API_KEY`             | Sending credential                                            |
| `INTAKE_EMAIL_FROM`          | Sender on a domain verified in Resend                         |
| `INTAKE_EMAIL_TO`            | Agency recipient; defaults to `contact@originalinsurance.net` |

Use `.env.example` as the template. For a password hash, generate 16 random bytes as hex for the salt, then run Node `scryptSync(password, salt, 64).toString('hex')`. Store `salt:hash`. Do not pass real passwords in command-line arguments or paste credentials into chat. A password manager can generate and hold the admin password. Rotating the session secret signs out all existing sessions.

The app uses a single agency admin password, eight-hour signed HttpOnly/SameSite=Strict cookies (Secure in production), same-origin POST checks, server-side allowlists, bounded request bodies (1 MiB for settings/submissions, 64 KiB for other actions), and shared Redis rate limits. Eight login attempts, twelve submissions, and forty VIN lookups are allowed per IP per fifteen minutes. Vercel's overwritten `x-real-ip` is the trusted client-IP source; changing hosting requires reviewing that assumption.

Save conflicts return HTTP 409 so an older tab cannot overwrite newer settings. A form changed during completion asks the customer to review updated questions, retaining current answers where possible. Hidden fields are stripped server-side. Email retries use a stable Resend idempotency key; the customer sees success only after provider acceptance. Provider acceptance does not guarantee inbox delivery: check the Resend delivery events and recipient mailbox before launch. No email body is logged by the server.

## Deployment and launch checks

Use only the existing repo-root `bash scripts/deploy.sh` workflow. Static pages remain Astro; `original-insurance/api/intake.ts` is a separate Vercel Node function. The dev Vite adapter runs that same handler locally.

Before deployment:

1. Restore/link the correct existing Vercel project at repo-root `.vercel/project.json`. Do not create a replacement project or guess its identifiers. This file was absent from the checkout at implementation time.
2. Configure Redis, Resend, the verified sender, and the admin credentials above. Confirm the agency recipient mailbox is ready.
3. Run lint, SEO lint, build, schema validation, `npm run test:intake`, and `npm run test:site`.
4. Use the deployment script after the normal review/commit workflow. Verify `/api/intake` is included in Vercel's output; copying static HTML alone does not deploy the API.
5. On the deployed site, verify login, save/reload, one synthetic quote delivered to the intended inbox, correct reply-to and formatting, and delivery failures in Resend. Remove the synthetic message from the agency inbox after verification.

Do not deploy without backend configuration: the API deliberately fails closed rather than silently dropping requests or pretending to save settings.

## Testing

```sh
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npx playwright install chromium
npm run test:intake  # requires the running local dev server and setup above
npm run test:site    # production HTML regression checks
npm run test:intake-server # backend tests with fake provider/Redis responses; no network
npm run test:intake-stress # local browser stress suite; run separately from test:intake
npm run test:intake-usability # editor/navigation usability regressions
```

The intake browser suite tests sign-in, forged sessions, cross-origin denial, rate limits, stale saves, protected fields, saved configuration, live preview, five viewport widths, accessibility, all eight coverage payloads, two drivers/two vehicles, conditional questions, retries, and local email contents. It restores pre-test form settings in a finally block. Captured test messages and screenshots are Git-ignored.

## Reuse for another agency

Keep this first implementation in OIS. The catalog and browser code live in `src/intake/`, the backend in `src/server/intake.ts`, and dedicated styles in `src/styles/intake.css`. The agency identity now lives in `src/intake/agency.ts`; question editing lives in `src/intake/editor.ts`, VIN lookup in `src/server/vin.ts`, and email formatting in `src/server/email.ts`. Follow [INTAKE_REUSE.md](INTAKE_REUSE.md) for the complete admin guide, file map, reuse steps, data boundaries, and monthly-service scope. When RIA is ready, adapt branding, contact details, origin, configuration key prefix, and credentials together. There is no shared hosted tenant platform or separate package to maintain yet.

## Verification recorded — October 12, 2026

- `npm run lint`: passed.
- `npx tsc --noEmit` and Astro check: passed, no errors or warnings.
- `npm run build`: passed, 28 static pages including `/admin`, `/quote`, and 404.
- `npm run validate:schema`: passed across 27 indexed output documents.
- `npm run test:intake-server`: passed production-handler checks using fake Redis/Resend responses, with no external requests.
- `npm run test:intake`: passed browser/API coverage described above, including local-file access denial. Tested widths: 320, 390, 768, 1024, and 1440 pixels. No automated WCAG A/AA findings in the tested intake/admin states.
- `npm run test:site`: passed all 25 content routes at 11 widths, with zero automated accessibility findings; navigation, redirects, no-JavaScript content, reduced motion, and mocked contact submission checks passed. The test injects a dummy contact key only into the mocked browser session and excludes Chromium's specific native transition-cancellation message from application exceptions.
- Focused network-failure browser check: readable error, phone fallback, and retry action passed.
- VIN lookup: one live public sample decoded successfully to a 2003 Honda Accord; browser/provider failure tests use mocks, not repeated external requests.
- `npm run test:intake-stress`: all eight browser flows and every form/editor section passed; 68 axe scans, layouts at 320/390/768/1440px, six custom answer types, edited wording persisted to email, ordering/remove/undo, clipboard links, mobile preview, ten drivers/vehicles, VIN conflict/manual fallback/stale-response checks.
- `git diff --check`: passed. Quotzal was not modified.
- `npm run seo-lint`: all content assertions preceding the final project-link check passed; the command still fails because the existing repo-root `.vercel/project.json` is absent. It was not fabricated or bypassed.

No production deployment or live inbox test was performed. Configure the services and restore the Vercel link before launch. Screenshots and synthetic email previews are under Git-ignored `output/playwright/` and `original-insurance/.intake-local/mail/` respectively.

Implementation references: [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js), [trusted request headers](https://vercel.com/docs/headers/request-headers), [Upstash REST commands](https://upstash.com/docs/redis/features/restapi), and [Resend retry keys](https://resend.com/changelog/idempotency-keys).

VIN provider reference: [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/). Only VIN is sent on an explicit lookup; the app stores no lookup history. Existing saved form settings are hydrated with new optional fields without resetting visibility choices.

Run the intake suites sequentially because both temporarily change local settings and restore them in `finally`. The browser tests capture synthetic messages locally. Automated accessibility and layout checks cover the exercised states; they are not a claim of exhaustive device or assistive-technology certification.

See [INTAKE_USABILITY_REVIEW.md](INTAKE_USABILITY_REVIEW.md) for the subsequent editor/customer workflow review and improvements. Run all browser suites sequentially.
