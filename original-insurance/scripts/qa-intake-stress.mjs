/** Local-only workflow stress checks. Uses synthetic data; restores settings. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'vite';
import { readFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
const base = 'http://127.0.0.1:3002',
  out = resolve('../output/playwright');
mkdirSync(out, { recursive: true });
const initial = await (await fetch(base + '/api/intake?action=config')).json();
assert.equal(initial.local, true);
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const { coverages, defaults, configuredCoverage } =
  await vite.ssrLoadModule('/src/intake/schema.ts');
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  permissions: ['clipboard-read', 'clipboard-write'],
  extraHTTPHeaders: { 'x-real-ip': 'stress-' + Date.now() },
});
const page = await ctx.newPage();
page.on('dialog', (d) => d.accept());
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const post = (action, data) =>
  ctx.request.post(base + '/api/intake?action=' + action, { data, headers: { Origin: base } });
let auth = false,
  checks = 0;
async function layout(label) {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      label + ' overflow ' + width,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
}
async function axe(label) {
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(
    r.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    [],
    label,
  );
  checks++;
}
const next = () => page.getByRole('button', { name: 'Continue', exact: true }).click();
async function fillSection(section, index = 0) {
  for (const f of section.fields) {
    const el = page.locator(`#${section.id}-${index}-${f.id}`);
    if (!(await el.count())) continue;
    if (f.kind === 'vin') continue;
    if (f.kind === 'checkbox') {
      await el.check();
      continue;
    }
    if (f.kind === 'select' || f.kind === 'driver') {
      await el.selectOption(f.kind === 'driver' ? '0' : f.options[0]);
      continue;
    }
    const value =
      f.kind === 'email'
        ? 'synthetic@example.com'
        : f.kind === 'tel'
          ? '3105550100'
          : f.kind === 'zip'
            ? '90240'
            : f.kind === 'date'
              ? f.id === 'dob'
                ? '1985-06-15'
                : '2027-01-01'
              : f.kind === 'number'
                ? f.id === 'year'
                  ? '2024'
                  : String(Math.max(1, f.min || 0))
                : f.id === 'name'
                  ? 'Synthetic Customer ' + index
                  : f.id === 'make'
                    ? 'Toyota'
                    : f.id === 'model'
                      ? 'Camry'
                      : 'Synthetic answer';
    await el.fill(value);
  }
}
try {
  await page.goto(base + '/admin');
  await page
    .getByLabel('Admin password')
    .fill(readFileSync('.intake-local-password', 'utf8').trim());
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.locator('.studio').waitFor();
  auth = true;
  // Start from a predictable catalog, without destroying pre-test preferences.
  const fresh = defaults();
  fresh.version = initial.config.version;
  assert.equal((await post('save', { config: fresh })).status(), 200);
  await page.reload();
  await page.locator('.studio').waitFor();
  await page.getByRole('button', { name: 'Edit question: Full name', exact: true }).click();
  await page.getByLabel('Question wording').fill('Your full legal name');
  await page.getByLabel('Help text').fill('Use the name on your policy.');
  await axe('Standard wording dialog');
  await layout('Wording dialog');
  await page.getByRole('button', { name: 'Apply to draft' }).click();
  for (const [kind, label] of [
    ['text', 'Where did you hear about us?'],
    ['textarea', 'Extra context'],
    ['number', 'Household size'],
    ['date', 'Preferred appointment'],
    ['select', 'Parking location'],
    ['checkbox', 'Details confirmed'],
  ]) {
    await page.getByRole('button', { name: '+ Add question', exact: true }).click();
    await page.getByLabel('Question wording').fill(label);
    await page.getByLabel('Help text').fill('Synthetic question for testing.');
    await page.getByLabel('Answer type').selectOption(kind);
    if (kind === 'select')
      await page.getByLabel('Dropdown choices').fill('Garage\nDriveway\nStreet');
    await page.getByLabel('Require an answer').check();
    await page.getByRole('button', { name: 'Add to draft', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Remove question: Extra context', exact: true }).click();
  await page.locator('[data-undo-question]').click();
  assert.equal(
    await page.getByRole('button', { name: 'Edit question: Extra context', exact: true }).count(),
    1,
  );
  await page.getByRole('button', { name: 'Move Parking location up', exact: true }).click();
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await page.getByText('Changes saved. Your quote form is up to date.').waitFor();
  await page.reload();
  await page.locator('.studio').waitFor();
  assert.equal(
    await page
      .getByRole('button', { name: 'Edit question: Your full legal name', exact: true })
      .count(),
    1,
  );
  await page.locator('#share-type').selectOption('auto');
  await page.locator('[data-copy]').click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    base + '/quote?type=auto',
  );
  await page.locator('.invitation summary').click();
  await page.locator('[data-copy-message]').click();
  assert.ok((await page.evaluate(() => navigator.clipboard.readText())).includes('?type=auto'));
  await page.locator('[data-mobile-view="preview"]').click();
  assert.equal(await page.locator('#field-preview').isVisible(), true);
  await axe('Mobile preview');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: resolve(out, 'ois-admin-mobile-preview.png'), fullPage: true });
  await page.locator('[data-mobile-view="edit"]').click();
  for (const c of coverages) {
    await page.locator(`[data-type="${c.id}"]`).click();
    for (let i = 0; i < c.sections.length; i++) {
      await page.locator(`[data-section="${i}"]`).click();
      await layout('Admin ' + c.id + '/' + c.sections[i].id);
      await axe('Admin ' + c.id + '/' + c.sections[i].id);
    }
  }
  await page.locator('[data-type="auto"]').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: resolve(out, 'ois-admin-custom-mobile.png'), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: resolve(out, 'ois-admin-custom-desktop.png'), fullPage: true });
  const config = (await (await fetch(base + '/api/intake?action=config')).json()).config;
  let vinMode = 'ok';
  const vehicle = { vin: '1HGCM82633A004352', year: '2003', make: 'HONDA', model: 'Accord' };
  await page.route('**/api/intake?action=decode-vin', async (route) => {
    if (vinMode === 'late') await new Promise((r) => setTimeout(r, 400));
    await route.fulfill({
      status: vinMode === 'fail' ? 503 : 200,
      contentType: 'application/json',
      body: JSON.stringify(
        vinMode === 'fail'
          ? { error: 'Lookup unavailable. Enter the details yourself.' }
          : { vehicle, complete: true },
      ),
    });
  });
  for (const baseType of coverages) {
    const c = configuredCoverage(config, baseType);
    await page.goto(base + '/quote?type=' + c.id);
    await page.getByRole('heading', { name: 'What would you like to protect?' }).waitFor();
    await next();
    await page.locator('#contact-0-name').waitFor();
    for (const section of c.sections) {
      await fillSection(section);
      if (c.id === 'auto' && section.id === 'drivers') {
        await page.locator('[data-self]').click();
        assert.equal(await page.locator('#drivers-0-name').inputValue(), 'Synthetic Customer 0');
        for (let i = 1; i < 10; i++) {
          await page.locator('[data-add]').click();
          await page.locator(`#drivers-${i}-name`).fill('Synthetic Driver ' + i);
        }
        assert.equal(await page.locator('[data-add]').count(), 0);
        await page.locator('[data-remove="9"]').click();
        await page.locator('[data-undo]').click();
        assert.equal(await page.locator('.repeat-card').count(), 10);
      }
      if (c.id === 'auto' && section.id === 'vehicles') {
        await page.locator('#vehicles-0-vin').fill('1hgcm82633a004352');
        await page.locator('[data-decode="0"]').click();
        await page.locator('[data-apply-vin="0"]').waitFor();
        assert.equal(await page.locator('#vehicles-0-make').inputValue(), 'Toyota');
        await page.locator('[data-apply-vin="0"]').click();
        assert.equal(await page.locator('#vehicles-0-make').inputValue(), 'HONDA');
        vinMode = 'fail';
        await page.locator('[data-decode="0"]').click();
        await page.getByText('Lookup unavailable. Enter the details yourself.').waitFor();
        assert.equal(await page.locator('#vehicles-0-make').inputValue(), 'HONDA');
        vinMode = 'late';
        await page.locator('[data-decode="0"]').click();
        await page.locator('#vehicles-0-vin').fill('2HGCM82633A004352');
        await page.locator('#vehicles-0-make').fill('Manual make');
        await page.waitForTimeout(500);
        assert.equal(await page.locator('#vehicles-0-make').inputValue(), 'Manual make');
        await page.locator('#vehicles-0-vin').fill('');
        vinMode = 'ok';
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: resolve(out, 'ois-vin-mobile.png'), fullPage: true });
        for (let i = 1; i < 10; i++) {
          await page.locator('[data-add]').click();
          await fillSection(section, i);
        }
        assert.equal(await page.locator('[data-add]').count(), 0);
        await page.locator('[data-remove="9"]').click();
        await page.locator('[data-undo]').click();
        assert.equal(await page.locator('.repeat-card').count(), 10);
      }
      await layout('Quote ' + c.id + '/' + section.id);
      await axe('Quote ' + c.id + '/' + section.id);
      await next();
    }
    await page.getByRole('heading', { name: 'Everything look right?' }).waitFor();
    await axe('Review ' + c.id);
    await page.locator('input[name="consent"]').check();
    let payload;
    await page.route('**/api/intake?action=submit', async (route) => {
      payload = route.request().postDataJSON();
      await route.continue();
    });
    await page.getByRole('button', { name: 'Send quote request' }).click();
    await page.getByRole('heading', { name: 'Your preview is ready.' }).waitFor();
    const mail = JSON.parse(readFileSync('.intake-local/mail/' + payload.id + '.json', 'utf8'));
    assert.equal(mail.testOnly, true);
    if (c.id === 'auto') {
      assert.ok(mail.text.includes('Your full legal name: Synthetic Customer'));
      assert.ok(mail.text.includes('Parking location: Garage'));
      assert.ok(mail.text.includes('Details confirmed: Yes'));
      assert.ok(mail.subject.includes('10 drivers · 10 vehicles'));
    }
    await page.unroute('**/api/intake?action=submit');
    console.log('PASS customer flow: ' + c.id);
  }
  assert.deepEqual(errors, []);
  console.log(
    `PASS: custom editing, ordering, remove/undo, saved wording, all answer types, email contents, share links/clipboard, mobile preview, 10 drivers/vehicles, VIN conflict/failure/stale response, all 8 customer flows; ${checks} axe scans and four-width layouts.`,
  );
} finally {
  if (auth) {
    const current = (await (await fetch(base + '/api/intake?action=config')).json()).config;
    assert.equal(
      (await post('save', { config: { ...initial.config, version: current.version } })).status(),
      200,
    );
  }
  await browser.close();
  await vite.close();
}
