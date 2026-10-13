/** Real local journeys; synthetic data only, no live inbox or analytics requests. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'vite';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:3002';
const initial = await (await fetch(base + '/api/intake?action=config')).json();
assert.equal(initial.local, true, 'Only local captured email mode is allowed.');
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { coverages, visibleSections } = await vite.ssrLoadModule('/src/intake/schema.ts');
const { cleanContext, quoteHref } = await vite.ssrLoadModule('/src/intake/context.ts');
assert.deepEqual(
  cleanContext({ need: 'evil', city: 'email@example.com', language: 'Spanish', name: 'Private' }),
  {},
);
assert.deepEqual(cleanContext({ need: 'sr22', city: 'downey', language: 'es', name: 'Private' }), {
  need: 'sr22',
  city: 'downey',
  language: 'es',
});
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  extraHTTPHeaders: { 'x-real-ip': 'acquisition-' + Date.now() },
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('dialog', (d) => d.accept());
await page.addInitScript(() => {
  window.__events = [];
  window.addEventListener('ois:conversion', (e) => window.__events.push(e.detail));
});
const out = '../output/playwright/acquisition-journeys';
mkdirSync(out, { recursive: true });
let scans = 0;
async function axe(label) {
  const a = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  assert.deepEqual(
    a.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    [],
    label,
  );
  scans++;
}
const next = () => page.getByRole('button', { name: 'Continue', exact: true }).click();
async function selected(type) {
  await page.locator(`input[name=coverage][value="${type}"]`).waitFor({ state: 'attached' });
  assert.equal(await page.locator(`input[name=coverage][value="${type}"]`).isChecked(), true);
}
async function fill(section) {
  for (const f of section.fields) {
    const el = page.locator(`#${section.id}-0-${f.id}`);
    if (!(await el.count()) || !(await el.isVisible()) || f.kind === 'vin') continue;
    if (f.kind === 'checkbox') {
      await el.check();
      continue;
    }
    if (f.kind === 'select' || f.kind === 'driver') {
      await el.selectOption(
        f.id === 'language'
          ? 'Spanish'
          : f.id === 'sr22'
            ? 'Yes'
            : f.kind === 'driver'
              ? '0'
              : f.options[0],
      );
      continue;
    }
    const value =
      f.kind === 'email'
        ? 'synthetic-acquisition@example.com'
        : f.kind === 'tel'
          ? '3105550100'
          : f.kind === 'zip'
            ? '90240'
            : f.kind === 'date'
              ? f.id === 'dob'
                ? '1988-06-12'
                : '2027-01-01'
              : f.kind === 'number'
                ? f.id === 'year'
                  ? '2024'
                  : String(Math.max(1, f.min || 0))
                : f.id === 'name'
                  ? 'Synthetic Acquisition'
                  : f.id === 'make'
                    ? 'Toyota'
                    : f.id === 'model'
                      ? 'Camry'
                      : 'Synthetic answer';
    await el.fill(value);
  }
}
try {
  // A: coverage discovery -> auto -> an editable selected quote.
  await page.goto(base + '/');
  await page.locator('[data-coverage-panel="0"] .text-link').click();
  assert.ok(page.url().includes('/auto-insurance-downey-ca'));
  await page.locator('.page-hero [data-quote]').click();
  await selected('auto');
  await axe('Auto intent');
  await page.getByRole('button', { name: 'Change coverage', exact: true }).click();
  await page.getByRole('radio', { name: /Home/ }).check();
  await selected('home');
  // All service CTA placements agree, including fixed mobile action.
  for (const path of [
    '/auto-insurance-downey-ca',
    '/home-insurance-downey-ca',
    '/commercial-auto-insurance-downey',
    '/sr22-insurance-downey',
    '/no-license-auto-insurance-downey',
  ]) {
    await page.goto(base + path);
    const links = await page
      .locator('[data-quote]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    assert.ok(links.length >= 3);
    assert.ok(
      links.every((href) => href === quoteHref(path)),
      path + ' context at every placement',
    );
  }
  // B: removable SR22 prefill, full local request and email context.
  await page.goto(base + '/quote?type=auto&need=sr22&city=downey&lang=es');
  await selected('auto');
  assert.match(await page.locator('.quote-intent').innerText(), /SR-22/);
  await next();
  for (const section of visibleSections(
    initial.config,
    coverages.find((c) => c.id === 'auto'),
  )) {
    await fill(section);
    await next();
  }
  await axe('SR22 review');
  await page.getByLabel(/I agree/).check();
  const responsePromise = page.waitForResponse(
    (r) => r.url().includes('action=submit') && r.request().method() === 'POST',
  );
  await page.getByRole('button', { name: 'Send quote request', exact: false }).click();
  const response = await responsePromise;
  assert.equal(response.status(), 200);
  const result = await response.json();
  await page.locator('.success-card').waitFor();
  const mailPath = readdirSync('.intake-local/mail').find((name) =>
    name.includes(result.reference),
  );
  assert.ok(mailPath);
  const mail = readFileSync('.intake-local/mail/' + mailPath, 'utf8');
  assert.match(mail, /SR-22/);
  assert.match(mail, /Spanish/);
  assert.match(mail, /Service-area page/);
  assert.match(mail, /downey/);
  const events = await page.evaluate(() => window.__events);
  assert.ok(events.some((e) => e.name === 'quote_submit'));
  assert.ok(events.some((e) => e.name === 'quote_step_completed'));
  assert.ok(!JSON.stringify(events).includes('Synthetic'));
  assert.ok(!JSON.stringify(events).includes('sr22'));
  // C: Spanish context and honest workflow labels.
  await page.goto(base + '/home-insurance-downey-ca');
  await page.locator('.utility-bar [data-spanish]').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'es');
  assert.match(await page.locator('.spanish-context').innerText(), /casa/);
  assert.equal(
    await page.locator('[data-return-english]').getAttribute('href'),
    '/home-insurance-downey-ca',
  );
  await axe('Spanish hub');
  await page.locator('.assistance-options a[href*="type=home"]').click();
  await selected('home');
  assert.match(await page.locator('.language-assistance').innerText(), /inglés/);
  await next();
  assert.equal(await page.locator('#contact-0-language').inputValue(), 'Spanish');
  // D: business vehicle flow; business market names do not imply auto appetite.
  await page.goto(base + '/commercial-auto-insurance-downey');
  await page.locator('.commercial-market-note a').click();
  assert.ok(page.url().includes('/insurance-markets'));
  await page.getByRole('button', { name: 'Commercial', exact: true }).click();
  assert.equal(await page.locator('[data-market-group]:visible').count(), 1);
  assert.equal(await page.getByRole('img', { name: 'Chubb', exact: true }).count(), 1);
  await axe('Market filter');
  // E / F: existing policy help and office visit essentials.
  await page.goto(base + '/contact');
  assert.match(await page.locator('.policy-support').innerText(), /Already a customer/);
  await page.locator('#topic').selectOption('Proof of insurance or documents');
  await axe('Existing customer');
  await page.goto(base + '/locations');
  assert.match(await page.locator('.visit-at-a-glance').innerText(), /9907-B/);
  assert.match(await page.locator('.visit-at-a-glance a').first().getAttribute('href'), /9907/);
  assert.ok(
    (await page.locator('.visit-at-a-glance').boundingBox()).y <
      (await page.locator('.page-hero-image').boundingBox()).y,
  );
  await axe('Office directions');
  // G: source city is page context, not an inferred customer address.
  await page.goto(base + '/insurance/norwalk');
  assert.match(await page.locator('.city-ribbon').innerText(), /from our Downey office/);
  await axe('City and interactive map');
  await page.locator('.page-hero [data-quote]').click();
  await selected('auto');
  assert.equal(new URL(page.url()).searchParams.get('city'), 'norwalk');
  // Unknown-path progress, cleanup of removable prefill, and URL privacy.
  await page.goto(base + '/quote?name=PrivacyCanary&vin=1HGCM82633A004352');
  await page.locator('.coverage-grid').waitFor();
  assert.match(await page.locator('.form-meta').innerText(), /Getting started/);
  assert.equal(await page.locator('.step-number').count(), 0);
  assert.ok(
    !(await page.evaluate(() => JSON.stringify(window.dataLayer).includes('PrivacyCanary'))),
  );
  assert.ok(
    !(await page.evaluate(() => JSON.stringify(window.dataLayer).includes('1HGCM82633A004352'))),
  );
  await page.goto(base + '/quote?type=auto&need=sr22');
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await next();
  await fill(visibleSections(initial.config, coverages[0])[0]);
  await next();
  const sr = page.locator('#drivers-0-sr22');
  if (await sr.count()) assert.notEqual(await sr.inputValue(), 'Yes');
  await page.goto(base + '/faq');
  await page.getByLabel('Find an answer').fill('impossible search phrase');
  assert.match(await page.locator('#faq-search-status').innerText(), /No matching/);
  await page.getByLabel('Find an answer').fill('SR');
  assert.ok((await page.locator('.faq-list details:visible').count()) > 0);
  await axe('FAQ filtered');
  await page.goto(base + '/auto-insurance-downey-ca#guide-2');
  assert.equal(await page.locator('#guide-2').evaluate((el) => el.open), true);
  await axe('Expanded coverage guide');
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(base + '/quote');
  await page.locator('.coverage-grid').waitFor();
  await axe('320px quote selector');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: out + '/quote-320.png', fullPage: true });
  assert.deepEqual(errors, []);
  writeFileSync(
    out + '/results.json',
    JSON.stringify(
      {
        flows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        axeScans: scans,
        syntheticEmailReference: result.reference,
        events: events.map((e) => e.name),
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: journeys A–G, every contextual service CTA, removable prefill, Spanish assistance, local email context, safe analytics, FAQ, map, expanded guide and 320px quote. ${scans} axe scans.`,
  );
} finally {
  await browser.close();
  await vite.close();
}
