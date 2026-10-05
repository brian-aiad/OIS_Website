# Original Insurance App

Astro 7.3.5 static site for `https://originalinsurance.net`. Quote requests use the existing Quotzal integration; the general contact form uses Web3Forms.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run seo-lint
npm run build
npm run validate:schema
npm run deploy:check
npm run test:site
npm run format:check
```

The dev server uses port `3002`.

## Structure

```text
src/
  components/
  data/
  layouts/
  styles/
  scripts/
  pages/
public/
  images/
scripts/
  qa-site.mjs
  seo-lint.mjs
  validate-schema.mjs
```

Deployment is managed from the repo root with `bash scripts/deploy.sh`.
