/** Integration checks against a running LOCAL preview. Never sends real emails. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const base = process.env.INTAKE_TEST_URL || 'http://127.0.0.1:3002';
assert.ok(
  ['localhost', '127.0.0.1'].includes(new URL(base).hostname),
  'Only local tests are allowed.',
);
const app = resolve(import.meta.dirname, '..');
const out = resolve(app, '../output/playwright');
mkdirSync(out, { recursive: true });
const initial = await (await fetch(base + '/api/intake?action=config')).json();
assert.equal(initial.local, true, 'Refuse to test real email delivery.');
for (const privatePath of [
  '/.intake-local-password',
  '/.intake-local/settings.json',
  '/@fs' + resolve(app, '.intake-local-password'),
]) {
  assert.equal(
    (await fetch(base + privatePath)).status,
    403,
    'Local test data must not be served by Vite',
  );
}
const original = initial.config;
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  extraHTTPHeaders: { 'x-real-ip': `qa-${Date.now()}` },
});
const page = await ctx.newPage();
page.on('dialog', (d) => d.accept());
const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
let loggedIn = false;
async function request(action, data, options = {}) {
  return ctx.request.post(base + '/api/intake?action=' + action, {
    data,
    headers: { Origin: base, ...options },
    failOnStatusCode: false,
  });
}
async function axe(label) {
  const report = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    report.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    [],
    label + ' accessibility',
  );
}
async function widths(label) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `${label} overflow at ${width}`,
    );
  }
}
try {
  assert.equal((await request('save', { config: original })).status(), 401);
  assert.equal((await request('login', { password: 'wrong-password' })).status(), 401);
  assert.equal(
    (
      await request('login', { password: 'wrong-password' }, { Origin: 'https://evil.example' })
    ).status(),
    403,
  );
  await page.goto(base + '/admin');
  await page.getByRole('heading', { name: 'Welcome back.' }).waitFor();
  await axe('Login');
  await widths('Login');
  await page.screenshot({ path: resolve(out, 'ois-admin-login.png'), fullPage: true });
  await page
    .getByLabel('Admin password')
    .fill(readFileSync(resolve(app, '.intake-local-password'), 'utf8').trim());
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('heading', { name: 'Quote form settings' }).waitFor();
  loggedIn = true;
  const cookie = (await ctx.cookies()).find((c) => c.name === 'ois_admin');
  assert.equal(cookie.httpOnly, true);
  assert.equal(cookie.sameSite, 'Strict');
  await axe('Admin');
  await widths('Admin');
  await page.screenshot({ path: resolve(out, 'ois-admin-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: resolve(out, 'ois-admin-mobile.png'), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.getByRole('checkbox', { name: 'Show Preferred language', exact: true }).uncheck();
  assert.equal(
    await page.locator('#field-preview').getByText('Preferred language', { exact: true }).count(),
    0,
  );
  assert.equal(await page.locator('[data-save-status]').innerText(), 'Unsaved changes');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await page.getByText('Changes saved. Your quote form is up to date.').waitFor();
  assert.equal((await request('save', { config: original })).status(), 409, 'Reject stale save');
  const latest = (await (await fetch(base + '/api/intake?action=config')).json()).config;
  assert.equal(latest.fields.auto['contact.language'].show, false);
  await page.reload();
  await page.getByRole('heading', { name: 'Quote form settings' }).waitFor();
  assert.equal(
    await page.getByRole('checkbox', { name: 'Show Preferred language', exact: true }).isChecked(),
    false,
  );
  // Last enabled type and protected essential fields cannot be disabled, even through the API.
  assert.equal((await request('save', { config: { ...latest, enabled: [] } })).status(), 400);
  const broken = structuredClone(latest);
  broken.fields.auto['contact.name'].show = false;
  assert.equal((await request('save', { config: broken })).status(), 400);
  // Native multi-driver, multi-vehicle flow, with a failed delivery and retry.
  await page.goto(base + '/quote');
  await page.getByRole('heading', { name: 'What would you like to protect?' }).waitFor();
  await axe('Quote coverage');
  await widths('Quote coverage');
  await page.screenshot({ path: resolve(out, 'ois-quote-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: resolve(out, 'ois-quote-mobile.png'), fullPage: true });
  await page.getByRole('radio', { name: /^Personal auto/ }).check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  assert.equal(await page.locator('#contact-0-name').getAttribute('aria-invalid'), 'true');
  assert.equal(
    await page.getByLabel('Preferred language').count(),
    0,
    'Saved visibility affects customer form',
  );
  await page.locator('#contact-0-name').fill('OIS Synthetic Test');
  await page.locator('#contact-0-email').fill('ois-test@example.com');
  await page.locator('#contact-0-phone').fill('3105550100');
  await page.locator('#contact-0-zip').fill('90240');
  await axe('Contact form');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('#drivers-0-name').fill('Test Driver One');
  await page.getByRole('button', { name: 'Add another driver' }).click();
  await page.locator('#drivers-1-name').fill('Test Driver Two');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  for (let i = 0; i < 2; i++) {
    if (i) await page.getByRole('button', { name: 'Add another vehicle' }).click();
    await page.locator(`#vehicles-${i}-year`).fill('2022');
    await page.locator(`#vehicles-${i}-make`).fill('Toyota');
    await page.locator(`#vehicles-${i}-model`).fill(i ? 'RAV4' : 'Camry');
    await page.locator(`#vehicles-${i}-driver`).selectOption(String(i));
  }
  await axe('Vehicles');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('#policy-0-insured').selectOption('Yes');
  await page.locator('#policy-0-carrier').fill('Example Carrier');
  await page.locator('#policy-0-insured').selectOption('No');
  assert.equal(
    await page.locator('#policy-0-carrier').count(),
    0,
    'Conditional policy fields hide',
  );
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  assert.ok(
    (await page.locator('.review-section').allTextContents()).join(' ').includes('Test Driver Two'),
  );
  assert.equal(await page.getByText('Example Carrier', { exact: true }).count(), 0);
  await page.getByRole('button', { name: 'Send quote request' }).click();
  assert.ok((await page.locator('[data-error]').innerText()).includes('agree'));
  await page.getByRole('checkbox').check();
  await axe('Review');
  await page.screenshot({ path: resolve(out, 'ois-quote-review-mobile.png'), fullPage: true });
  let attempts = 0,
    captured;
  await page.route('**/api/intake?action=submit', async (route) => {
    attempts++;
    captured = route.request().postDataJSON();
    if (attempts === 1)
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Test delivery failure. Please try again.' }),
      });
    else await route.continue();
  });
  await page.getByRole('button', { name: 'Send quote request' }).click();
  await page.getByText('Test delivery failure. Please try again.').waitFor();
  const firstId = captured.id;
  await page.getByRole('button', { name: 'Send quote request' }).click();
  await page.getByRole('heading', { name: 'Your preview is ready.' }).waitFor();
  assert.equal(captured.id, firstId, 'Retry preserves idempotency key');
  const mail = JSON.parse(
    readFileSync(resolve(app, '.intake-local/mail', captured.id + '.json'), 'utf8'),
  );
  assert.equal(mail.testOnly, true);
  assert.equal(mail.reply_to, 'ois-test@example.com');
  assert.ok(mail.text.includes('VEHICLES 2'));
  assert.ok(mail.text.includes('Primary driver: Test Driver Two'));
  assert.ok(!mail.text.includes('Example Carrier'), 'Hidden stale values never reach email');
  assert.equal(mail.to[0], 'contact@originalinsurance.net');
  await axe('Success');
  // Each supported type accepts a minimal valid payload, with bounded arrays and real validation.
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { coverages, toggle } = await vite.ssrLoadModule('/src/intake/schema.ts');
    const currentConfig = (await (await fetch(base + '/api/intake?action=config')).json()).config;
    for (const coverage of coverages) {
      const answers = {};
      for (const section of coverage.sections) {
        const row = {};
        for (const f of section.fields) {
          if (!toggle(currentConfig, coverage.id, section, f).required) continue;
          row[f.id] =
            f.options?.[0] ||
            { email: 'synthetic@example.com', phone: '3105550100', zip: '90240', year: '2020' }[
              f.id
            ] ||
            'Synthetic test';
        }
        answers[section.id] = [row];
      }
      const payload = {
        type: coverage.id,
        version: currentConfig.version,
        answers,
        id: crypto.randomUUID(),
        consent: true,
      };
      const response = await request('submit', payload, {
        'x-real-ip': `coverage-${coverage.id}-${Date.now()}`,
      });
      assert.equal(response.status(), 200, `${coverage.id}: ${await response.text()}`);
    }
    const invalid = {
      ...captured,
      version: currentConfig.version,
      id: crypto.randomUUID(),
      answers: structuredClone(captured.answers),
    };
    invalid.answers.contact[0].email = 'not-an-email';
    assert.equal((await request('submit', invalid)).status(), 400);
    assert.equal((await request('submit', { ...captured, version: 0 })).status(), 409);
    assert.equal((await request('submit', { ...captured, consent: false })).status(), 400);
    assert.equal((await request('submit', { ...captured, website: 'spam.example' })).status(), 400);
    const tooMany = structuredClone(captured);
    tooMany.answers.drivers = Array.from({ length: 11 }, () => ({ name: 'Test' }));
    assert.equal((await request('submit', tooMany)).status(), 400);
    const forged = await browser.newContext({
      extraHTTPHeaders: { Cookie: 'ois_admin=9999999999999.fake.fake' },
    });
    assert.equal(
      (
        await forged.request.post(base + '/api/intake?action=save', {
          data: { config: currentConfig },
          headers: { Origin: base },
        })
      ).status(),
      401,
    );
    await forged.close();
    for (let i = 0; i < 9; i++) {
      const r = await request(
        'login',
        { password: 'wrong-password' },
        { 'x-real-ip': 'rate-test-' + firstId },
      );
      assert.equal(r.status(), i < 8 ? 401 : 429);
    }
  } finally {
    await vite.close();
  }
  assert.deepEqual(errors, [], 'No browser exceptions');
  console.log(
    'PASS: auth, CSRF, rate limits, protected settings, stale-save conflicts, persistence, preview, responsive layouts, accessibility, 8 coverage submissions, multiple drivers/vehicles, conditional fields, validation, retry, and captured email contents.',
  );
  console.log(`Screenshots: ${out}`);
} finally {
  if (loggedIn) {
    const current = (await (await fetch(base + '/api/intake?action=config')).json()).config;
    const restored = await request('save', { config: { ...original, version: current.version } });
    assert.equal(restored.status(), 200, 'Restore pre-test form settings');
    await request('logout', {});
  }
  await browser.close();
}
