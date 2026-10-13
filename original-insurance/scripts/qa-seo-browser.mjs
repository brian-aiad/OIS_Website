import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const pages = JSON.parse(fs.readFileSync('src/data/pages.json'));
const b = await chromium.launch();
const p = await b.newPage();
try {
  await p.goto('http://127.0.0.1:3012/');
  const audit = await p.evaluate(async (pages) => {
    const entries = await Promise.all(
      pages.map(async (item) => {
        const r = await fetch(item.path);
        const text = await r.text();
        return [
          item.path,
          { item, status: r.status, doc: new DOMParser().parseFromString(text, 'text/html') },
        ];
      }),
    );
    const docs = new Map(entries);
    return entries.map(([route, { item, status, doc }]) => {
      const broken = [];
      for (const a of doc.querySelectorAll('a[href^="/"]')) {
        const url = new URL(a.getAttribute('href'), location.origin);
        if (['/quote', '/admin'].includes(url.pathname)) continue;
        const target = docs.get(url.pathname);
        if (!target) broken.push(a.getAttribute('href'));
        else if (url.hash && !target.doc.getElementById(decodeURIComponent(url.hash.slice(1))))
          broken.push(a.getAttribute('href'));
      }
      const levels = [...doc.querySelectorAll('main h1,main h2,main h3,main h4')].map(
        (h) => +h.tagName.slice(1),
      );
      return {
        route,
        status,
        title: doc.title,
        titleMatches: item.title === doc.title,
        descriptionMatches:
          doc.querySelector('meta[name=description]')?.content === item.description,
        h1: [...doc.querySelectorAll('h1')].map((h) => h.textContent.trim()),
        lang: doc.documentElement.lang,
        canonical: doc.querySelector('link[rel=canonical]')?.href,
        brokenLinks: broken,
        headingJumps: levels.filter((n, i) => i && n > levels[i - 1] + 1),
        missingAlt: [...doc.images].filter((i) => !i.hasAttribute('alt')).length,
        schema: [...doc.querySelectorAll('script[type="application/ld+json"]')].map(
          (s) => JSON.parse(s.textContent)['@type'],
        ),
      };
    });
  }, pages);
  fs.writeFileSync(
    '../output/playwright/acquisition-seo-audit.json',
    JSON.stringify(audit, null, 2),
  );
  const failures = audit.filter(
    (r) =>
      r.status !== 200 ||
      !r.titleMatches ||
      !r.descriptionMatches ||
      r.h1.length !== 1 ||
      r.brokenLinks.length ||
      r.headingJumps.length ||
      r.missingAlt,
  );
  assert.deepEqual(failures, []);
  assert.equal(audit.find((p) => p.route === '/es').lang, 'es');
  assert.equal(new Set(audit.map((p) => p.title)).size, pages.length);
  console.log(
    `PASS: ${audit.length} production pages; exact metadata, unique titles, one H1, heading order, internal paths and anchors, alt attributes, Spanish language and schema inventory.`,
  );
} finally {
  await b.close();
}
