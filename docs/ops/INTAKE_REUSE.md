# Agency quote service — reuse and handoff

Last updated: October 12, 2026. Reference implementation: OIS, `original-insurance/`.

## What this is

A branded quote-request service inside an agency's existing website. Customers open `/quote`, choose insurance, enter their information, review it, and submit. The broker receives a readable HTML email and a plain-text version suitable for copying into a quoting system. `/admin` controls the form using a single agency password.

OIS does not call Quotzal or require a Quotzal account. Quotzal's repository remains intact; this work does not delete that product. RIA has not been modified. There is no multi-agency dashboard, customer database, subscription billing integration, or CRM.

## Admin guide

1. Sign in at `/admin`.
2. Pick an insurance type, then a form step: About you, Drivers, Vehicles, or the relevant category-specific step.
3. Click a question's **Edit wording** control to change its label and help text. Standard question types and validation remain fixed. **Restore original wording** restores the original text inside the editor; apply and save to publish it.
4. Use **Show** and **Required** to control visibility and requirement. Essential questions such as name/email and vehicle year/make/model stay enabled and required.
5. Choose **Add custom question**. Select short answer, long answer, number, date, dropdown, or checkbox. Dropdowns accept 2–12 different choices. There are up to 10 custom questions per insurance type, placed in the step chosen in the question editor. Existing custom questions can move to another step without being recreated. A question in Drivers or Vehicles repeats for every entry.
6. A required checkbox must be checked; use a dropdown for Yes/No questions. Number questions accept nonnegative whole numbers up to 1,000,000. Custom questions do not support uploads, rich HTML, conditional logic, or calculations.
7. Use the arrow buttons to reorder custom questions within their step. Remove has an Undo action until saving; standard questions can be hidden when optional but not deleted. Editing a hidden custom question preserves visibility unless it is explicitly made required.
8. **Apply to draft** does not publish. Review the layout preview (it does not accept answers); on phones use **Edit questions / Preview form**. **Save changes** publishes the whole draft. **Discard** restores the last loaded/saved draft. A stale-session conflict offers **Load latest saved form**; this explicitly replaces the draft.
9. Expand **Share your quote form**. In the share card, choose all insurance types or a specific type. Copy the link or the ready-to-send invitation into your own email/text conversation. Nothing is sent automatically. Only saved, enabled categories are offered for sharing. A `?type=auto` link preselects Personal auto; the customer can still choose another enabled category.

Question wording is limited to 120 characters and help text to 300. Labels/help are plain text. Don't add sensitive-document, payment, SSN, or medical-record requests to an email intake flow. This is a quote request, not a binding or purchase flow.

## Customer and broker conveniences

- Optional VIN lookup fills year, make, and model from NHTSA vPIC. Only the VIN goes to that provider. No API key is required. There is an eight-second upstream timeout and 40 lookups per IP per 15 minutes.
- A lookup must return a zero-error VIN result before details are offered. Partial matches explicitly request manual completion. Lookup failure leaves manual entry available; differing existing details require **Use these details**. Late results cannot overwrite a changed VIN or a removed vehicle. VINs before the 17-character standard are handled through manual year/make/model entry, leaving VIN blank.
- First-driver shortcut copies the customer's name and relationship. Up to ten drivers and ten vehicles, collapsible entry summaries, removal undo, and driver association updates.
- In-memory answers survive backward navigation and switching insurance types within the page. They do not survive closing/reloading the page; an unsaved-work browser warning is provided when answers exist. No localStorage/sessionStorage customer drafts.
- Preferred contact method/time, optional requested coverage start, conditional existing-policy questions, and review/edit before submission. Corrections made from review return directly to review after validation. Completed progress steps are clickable.
- Emails include an at-a-glance summary, driver/vehicle counts, clear sections, resolved driver names, all visible custom answers, and reply-to set to the customer's email. Hidden/stale answers are filtered on the server.

## Architecture / files to carry forward

| Area             | Files in `original-insurance/`                                                                        | Purpose                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Agency identity  | `src/intake/agency.ts`, `src/data/site.ts`                                                            | Name, unique ID/prefix, domain, contacts, location, languages, established year                                      |
| Catalog/settings | `src/intake/schema.ts`                                                                                | Default coverage catalog, wording overrides, bounded custom questions, settings migration, server/browser validation |
| Customer flow    | `src/intake/quote.ts`, `vin.ts`, `ui.ts`                                                              | Guided form, lookups, review, errors, shared helpers                                                                 |
| Form studio      | `src/intake/admin.ts`, `editor.ts`                                                                    | Login, live preview, share links, custom question dialog, drafts/save/conflicts                                      |
| API              | `src/server/intake.ts`, `vin.ts`, `email.ts`, `api/intake.ts`                                         | Auth, persistent settings, rate limits, VIN proxy, validated email delivery                                          |
| Presentation     | `src/layouts/Intake.astro`, `src/pages/quote.astro`, `src/pages/admin.astro`, `src/styles/intake.css` | Dedicated layouts, agency styles and responsive behavior                                                             |
| Local adapter    | `scripts/intake-dev.mjs`, `scripts/setup-intake-local.mjs`, `astro.config.mjs`                        | Same handler in Vite, generated ignored local credentials/captured test messages                                     |
| Hosting/config   | `.env.example`, `vercel.json`, repo-root `.gitignore`/`.vercelignore`                                 | Required environment, no-store routes, function duration, secret exclusion                                           |
| Verification     | `scripts/qa-intake*.mjs`, `scripts/qa-site.mjs`                                                       | Backend mocks, browser flows, stress and site regression                                                             |

Brand image imports in the Astro page and admin module, font imports in the intake layout, CSS color/font variables, editorial phrases, privacy language, and website quote CTAs also need adapting. `agency.ts` centralizes operational identity; it is not a theme generator or a universal one-file installation.

For RIA or another Astro website:

1. Copy this module into a dedicated branch in that website's repository. Preserve its existing routing/build/deploy rules and read its agent instructions.
2. Adapt the identity module and brand assets. Give `agency.id` a unique stable value: it namespaces the settings key, rate-limit keys, session cookie, and email retry key. Prefer separate backend credentials per agency. Do not copy OIS credentials or local test storage.
3. Adapt the layout/styles to the host website. Keep accessible labels, mobile text/input sizes, keyboard support, reduced-motion styles, and escaped content.
4. Connect the equivalent `/quote`, `/admin`, and `/api/intake` routes and quote CTAs. Include the API function in the host's deployment, not just the static pages.
5. Supply a new admin password/hash/session secret, verified email sender, intended recipient, allowed origin, and settings store. Follow [INTAKE_SETUP.md](INTAKE_SETUP.md).
6. Update privacy/retention disclosures, including the optional NHTSA lookup. Match actual provider configuration; don't promise “nothing is stored anywhere.”
7. Adjust the QA agency-specific fixture assertions, run all applicable checks, then perform one synthetic live delivery test after authorized deployment.

For Next.js or another framework, reuse the catalog, vanilla browser modules, and Web Request handler, but implement that framework's routing and bundling adapter. Astro files, Vite middleware, and the current Vercel entrypoint are not drop-in components for every framework. Review host-specific trusted proxy headers and cookie/origin handling.

Keep separate copies until several agencies demonstrate the same needs. This is a documented reusable module, not yet an independently versioned package. Future fixes must be propagated to each installed copy.

## Storage and service boundaries

Production stores **form settings**, including custom question definitions, in Redis, plus short-lived hashed-IP abuse counters. It does not archive submitted answers in an application database. Answers travel through the browser/server and email provider; the provider and broker mailbox can retain the message. NHTSA receives the VIN on explicit lookup and has its own request handling. The existing website may have anonymous analytics; there is no per-customer submission tracking dashboard in this module.

Local test mode intentionally writes settings and synthetic captured emails to `.intake-local/`. It sends no real email. That directory and credentials are ignored by Git/deployment and denied by the dev file server. No production email body is logged by this code.

## Monthly service scope

This can be offered as the agency's **branded quote intake and form management** add-on: hosted form, admin editing, VIN lookup, email delivery setup, maintenance, and support according to your agreement. Billing is separate from the form module; no subscription checkout, automated recurring charge, payment collection, or plan enforcement has been built. Set the fee and support limits with the agency before enabling paid service. Do not describe this as an automated insurance quote engine: it collects information so a broker can prepare the quote.

## Verification and launch status

See [INTAKE_SETUP.md](INTAKE_SETUP.md) for environment variables, launch blockers, commands, and the recorded verification. Screenshots and synthetic mail are local QA artifacts under the ignored `output/playwright/` and `.intake-local/mail/` directories. No deployment was made as part of this update.

Usability follow-up: [INTAKE_USABILITY_REVIEW.md](INTAKE_USABILITY_REVIEW.md) records the reviewed workflows, findings, refinements, and regression checks. Preview has its own step selector; the editor shows question counts and repeat-entry context.

## Acquisition integration (October 12 follow-up)

Carry `src/intake/context.ts` with the module and replace its route/city allowlists for each agency. Use `quoteHref()` for every contextual CTA; do not concatenate arbitrary query strings. Preserve editable coverage and removable request context. The server must clean context independently; a source-city page is not proof of the customer's address. Broker email context is an optional fourth argument to the email builder.

`lang=es` means a Spanish assistance preference, not a translated workflow. OIS's `/es` page explicitly says the online form is English. For a new agency, verify actual language service and translate the entire form before claiming a Spanish form. New default phone requirements are optional except for a call/text preference; existing saved agency settings take precedence.

The safe analytics module records only approved actions/routes/categories/steps/placements. Never pass answers, VINs, contact details, special license needs or raw query strings. Review account-side analytics settings separately. Keep `Analytics.astro` off admin.

Adapt shared tokens and `intake-brand.css`, but keep marketing animation out of the form studio. Verify all eight paths and context links with `test:acquisition` in addition to the existing intake suites. See [the acquisition handoff](../handoffs/ACQUISITION_REBUILD_2026-10-12.md).
