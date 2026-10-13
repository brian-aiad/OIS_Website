# Original Insurance Website

Astro 7.3.5 static website for Original Insurance Services in Downey, California.

## Repo Layout

```text
ois_website/
  AGENTS.md                         Codex instructions
  CLAUDE.md                         Claude instructions
  docs/                             handoffs, SEO notes, audits, brand sources
  original-insurance/               Astro app
  scripts/                          repo-root deploy and live verification scripts
```

## Common Commands

Run app commands from `original-insurance/`:

```bash
npm run dev
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npm run deploy:check
npm run test:site
npm run format:check
```

Run deployment and live verification from the repo root:

```bash
bash scripts/deploy.sh
bash scripts/verify-live.sh
```

The dev server is pinned to `http://localhost:3002` with `strictPort: true`.

## Notes For AI Agents

Claude and Codex share the same operating rules in `docs/AI_WORKFLOW.md`. Keep that file, `AGENTS.md`, `CLAUDE.md`, and `.claude/skills/original-insurance-seo/SKILL.md` aligned when SEO or deployment behavior changes.

## Native quote intake

`/quote` is the branded customer intake flow; `/admin` is the protected form studio. See [intake setup](docs/ops/INTAKE_SETUP.md) for local login, email previews, production configuration, and tests. Quotzal remains a separate, unchanged project.

Form editor/admin guide and future agency reuse: [docs/ops/INTAKE_REUSE.md](docs/ops/INTAKE_REUSE.md). Includes VIN decoding, custom questions, mobile workflows, email behavior, and monthly-service boundaries.
