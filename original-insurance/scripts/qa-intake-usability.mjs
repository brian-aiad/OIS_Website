/** Local-only regression checks for editor and customer navigation refinements. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const base = 'http://127.0.0.1:3002';
const initial = await (await fetch(base + '/api/intake?action=config')).json();
assert.equal(initial.local, true);
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  extraHTTPHeaders: { 'x-real-ip': 'ux-' + Date.now() },
});
const page = await context.newPage();
page.on('dialog', (d) => d.accept());
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
let auth = false;
const post = (action, data) =>
  context.request.post(base + '/api/intake?action=' + action, { data, headers: { Origin: base } });
const next = () => page.getByRole('button', { name: 'Continue', exact: true }).click();
try {
  await page.goto(base + '/admin');
  await page
    .getByLabel('Admin password')
    .fill(readFileSync('.intake-local-password', 'utf8').trim());
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.locator('.studio').waitFor();
  auth = true;
  assert.equal(await page.locator('[data-share]').getAttribute('open'), null);
  assert.equal(await page.locator('[data-add-question]').first().isVisible(), true);
  await page.getByRole('button', { name: '+ Add custom question', exact: true }).click();
  await page.getByLabel('Question wording').fill('Usability test question');
  await page.getByLabel('Form step', { exact: true }).selectOption('drivers');
  await page.getByRole('button', { name: 'Add to draft', exact: true }).click();
  assert.equal(await page.locator('#tab-drivers').getAttribute('aria-selected'), 'true');
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),
    'Edit question: Usability test question',
  );
  await page
    .getByRole('button', { name: 'Edit question: Usability test question', exact: true })
    .click();
  await page.getByLabel('Form step', { exact: true }).selectOption('policy');
  await page.getByRole('button', { name: 'Apply to draft', exact: true }).click();
  assert.equal(await page.locator('#tab-policy').getAttribute('aria-selected'), 'true');
  await page.locator('[data-mobile-view="preview"]').click();
  await page.locator('#preview-step').selectOption('0');
  assert.equal(await page.locator('#field-preview h3').innerText(), 'About you');
  await page.locator('#preview-step').selectOption('3');
  assert.equal(await page.locator('.conditional-preview').count(), 2);
  await page.locator('[data-mobile-view="edit"]').click();
  await page.locator('[data-discard]').click();
  assert.equal(
    await page
      .getByRole('button', { name: 'Edit question: Usability test question', exact: true })
      .count(),
    0,
  );
  await page.locator('[data-share] > summary').click();
  await page.locator('#share-type').selectOption('home');
  assert.equal(await page.locator('[data-share]').getAttribute('open'), '');
  await page.locator('[data-share] > summary').click();
  // A second session cannot silently overwrite the first session's draft.
  await page.locator('[data-section="0"]').click();
  await page.getByRole('checkbox', { name: 'Show Best time to reach you', exact: true }).uncheck();
  const current = (await (await fetch(base + '/api/intake?action=config')).json()).config;
  assert.equal((await post('save', { config: current })).status(), 200);
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await page.locator('.conflict-notice').waitFor();
  assert.equal(
    await page
      .getByRole('checkbox', { name: 'Show Best time to reach you', exact: true })
      .isChecked(),
    false,
  );
  await page.getByRole('button', { name: 'Load latest saved form' }).click();
  await page.getByText('Latest saved form loaded.').waitFor();
  assert.equal(
    await page
      .getByRole('checkbox', { name: 'Show Best time to reach you', exact: true })
      .isChecked(),
    true,
  );
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(axe.violations, []);
  await page.goto(base + '/quote?type=auto');
  await page.getByRole('heading', { name: 'What would you like to protect?' }).waitFor();
  await next();
  for (const [id, value] of Object.entries({
    name: 'Synthetic UX',
    email: 'ux@example.com',
    phone: '3105550100',
    zip: '90240',
  }))
    await page.locator('#contact-0-' + id).fill(value);
  await next();
  await page.locator('#drivers-0-name').fill('Synthetic Driver');
  await next();
  for (const [id, value] of Object.entries({ year: '2024', make: 'Toyota', model: 'Camry' }))
    await page.locator('#vehicles-0-' + id).fill(value);
  await next();
  await next();
  await page.getByRole('heading', { name: 'Everything look right?' }).waitFor();
  await page.locator('[data-edit="1"]').click();
  await page.locator('#contact-0-email').fill('invalid');
  await page.getByRole('button', { name: 'Back to review', exact: true }).click();
  assert.equal(await page.locator('#contact-0-email').getAttribute('aria-invalid'), 'true');
  await page.locator('#contact-0-email').fill('corrected@example.com');
  await page.getByRole('button', { name: 'Back to review', exact: true }).click();
  await page.getByRole('heading', { name: 'Everything look right?' }).waitFor();
  assert.ok(
    (await page.locator('.review-section').allTextContents())
      .join(' ')
      .includes('corrected@example.com'),
  );
  await page.getByRole('button', { name: 'Go back to Vehicles', exact: true }).click();
  assert.equal(await page.locator('#vehicles-0-make').inputValue(), 'Toyota');
  await page.locator('#vehicles-0-model').fill('RAV4');
  await page.getByRole('button', { name: 'Back to review', exact: true }).click();
  await page.getByRole('heading', { name: 'Everything look right?' }).waitFor();
  assert.ok((await page.locator('.review-section').allTextContents()).join(' ').includes('RAV4'));
  await page.locator('[data-edit="2"]').click();
  await page.locator('[data-add]').click();
  await page.locator('#drivers-1-name').fill('Second Driver');
  await page.locator('[data-row="0"] summary').click();
  await page.locator('#drivers-0-name').fill('');
  await page.locator('[data-row="0"] summary').click();
  await page.getByRole('button', { name: 'Back to review', exact: true }).click();
  assert.equal(await page.locator('[data-row="0"]').getAttribute('open'), '');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'drivers-0-name');
  await page.locator('#drivers-0-name').fill('Corrected Driver');
  await page.getByRole('button', { name: 'Back to review', exact: true }).click();
  await page.getByRole('heading', { name: 'Everything look right?' }).waitFor();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: compact sharing persistence, custom question placement/moving/focus, preview navigation, discard, save conflict recovery, review correction validation/direct return, progress links, preserved answers, collapsed invalid driver focus.',
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
}
