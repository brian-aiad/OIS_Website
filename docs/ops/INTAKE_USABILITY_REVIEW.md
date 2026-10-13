# OIS form usability review

October 12, 2026. Review of the local OIS admin and customer quote workflows, following the native form/VIN/custom-question release.

## Review criteria

The broker should be able to find a question, understand its effect, change it safely, preview the result, and share the saved form. The customer should understand what is required, provide repeated driver/vehicle information without losing work, correct an answer quickly, and receive a truthful submission result.

Reviewed the existing code and browser experience across insurance selection, standard/custom question editing, show/require controls, question placement, preview, sharing, save/discard/conflicts, customer navigation, validation, repeated entries, VIN lookup, review, and submission. This is an engineering/usability review supported by automated browser tests, not a study with real broker/customer participants.

## Findings and changes

| Finding                                                                                                 | Effect on the user                                                   | Change                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The share card occupied substantial space before the editing controls.                                  | Repeat visitors had to scroll past a task they were not doing.       | Sharing is a compact expandable panel. Its open state survives changes to the link selection.                                                                                                                                                                             |
| Eight insurance cards created a long mobile introduction.                                               | Reaching the questions took extra scrolling.                         | Mobile uses a horizontally scrollable insurance picker with a visible next card; desktop retains the full grid.                                                                                                                                                           |
| The editor did not communicate form size.                                                               | Brokers could make a form longer without seeing the overall effect.  | Show configured question-step, shown-question, and required-question counts, plus per-step counts and repeat-entry context. Counts describe definitions, not an estimate of completion time; conditional fields and repeated entries change the actual customer workload. |
| Custom questions were tied to their initial placement.                                                  | Moving a question meant removing and recreating it.                  | The question dialog includes a Form step selector. Moving preserves its stable ID, answer type, wording, choices, and requirement. Focus returns to the moved question in its new step.                                                                                   |
| The static preview resembled an interactive form, and conditional policy fields appeared unconditional. | Brokers could misinterpret what customers would see.                 | It is explicitly labelled Layout preview, conditional questions explain their trigger, hidden insurance types are identified, and the saved-form link is the route to a full functional test.                                                                             |
| Mobile preview had no independent step navigation.                                                      | Checking another step required switching back to editing.            | A labelled preview-step selector works in either layout.                                                                                                                                                                                                                  |
| Editing one answer from review restarted the remaining sequence.                                        | Customers had to click through already-completed steps.              | A validated Back to review action returns directly to review. Full-answer validation protects cross-section relationships.                                                                                                                                                |
| Completed progress indicators were not actionable.                                                      | Returning to an earlier step required repeated Back actions.         | Completed steps are keyboard-accessible buttons; mobile tap targets cover the step indicator. Navigation is guarded during submission.                                                                                                                                    |
| Required/optional notation was not explained.                                                           | Customers had to infer whether every visible question was necessary. | A short explanation appears on question steps. Existing per-field optional labels remain.                                                                                                                                                                                 |
| An unapplied question dialog was not covered by the editor's unsaved-page warning.                      | Reloading could silently lose wording before it reached the draft.   | An edited open dialog also registers an unsaved-page warning, removed when the dialog closes.                                                                                                                                                                             |

## Behaviors intentionally retained

- A broker explicitly saves the draft; customer-facing changes are not published on every keystroke.
- Shared links use saved, enabled categories. Draft edits do not leak into the live form.
- Core field types/validation remain fixed when their wording changes. Custom fields remain bounded and plain-text.
- No customer drafts are written to browser storage; answers stay in memory during the page session. Repeated-entry removal has undo, and hidden/stale values are stripped server-side.
- VIN decoding supplements manual entry. Provider failures and delayed responses do not overwrite manual work.
- Customer success requires email-provider acceptance. There is no new submission archive, analytics dashboard, or billing subsystem.
- The existing OIS ivory, navy, gold, typography, and visual identity remain.

## Verification

Use these local-only suites sequentially because they temporarily modify and restore the saved configuration:

```sh
npm run test:intake
npm run test:intake-usability
npm run test:intake-stress
npm run test:intake-server
```

The usability regression adds direct checks for custom-question placement/movement and focus, preview navigation, conditional guidance, sharing-panel persistence, discard, stale-save recovery, review correction with invalid input, direct return to review, mobile progress links, preserved vehicle answers, and opening/focusing an invalid collapsed driver.

The broader stress suite exercises all eight insurance flows and every editor/customer section, six custom answer types, ten drivers/vehicles, email contents, lookup failures/races, four widths, and 68 accessibility scans. The baseline suite covers login, protected settings, five widths, submission retries, and captured emails. Build/lint/schema and the existing SEO check remain required; SEO lint still stops at the previously missing Vercel project link.

No production deployment was performed. See [INTAKE_SETUP.md](INTAKE_SETUP.md) for launch configuration and [INTAKE_REUSE.md](INTAKE_REUSE.md) for the agency admin/reuse guide.
