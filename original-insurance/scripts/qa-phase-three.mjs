/** Phase-three public journeys and responsive evidence. Local only; no submissions/settings changes. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = 'http://127.0.0.1:3002';
const out = process.env.OIS_SCREENSHOT_DIR || 'output/playwright/phase-three';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const rows = [];
try {
  for (const [guide, type] of [
    ['/auto-insurance-downey-ca', 'auto'],
    ['/home-insurance-downey-ca', 'home'],
    ['/commercial-auto-insurance-downey', 'commercial'],
  ]) {
    await page.goto(base + '/insurance/norwalk');
    await page.locator(`.city-service-links a[href^="${guide}"]`).click();
    assert.equal(new URL(page.url()).searchParams.get('city'), 'norwalk');
    await page.locator('.page-hero [data-quote]').click();
    assert.equal(new URL(page.url()).searchParams.get('city'), 'norwalk');
    await page.locator('[data-change-coverage]').waitFor();
    assert.equal(await page.locator('input[name=coverage]:checked').inputValue(), type);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator('#contact-0-name').waitFor();
    assert.equal(
      await page.locator('#contact-0-zip').inputValue(),
      '',
      'Referral must not infer residence',
    );
  }
  await page.goto(base + '/es?city=lynwood');
  await page.locator('header [data-quote]').click();
  assert.equal(new URL(page.url()).searchParams.get('lang'), 'es');
  assert.equal(new URL(page.url()).searchParams.get('city'), 'lynwood');
  await page.locator('.language-assistance').waitFor();
  await page.goto(base + '/auto-insurance-downey-ca?city=not-a-city&lang=private');
  assert.ok(
    !(await page.locator('.page-hero [data-quote]').getAttribute('href')).includes('private'),
  );
  assert.ok(
    !(await page.locator('.page-hero [data-quote]').getAttribute('href')).includes('not-a-city'),
  );
  await page.goto(base + '/quote?type=auto');
  await page.getByRole('button', { name: 'Change coverage', exact: true }).click();
  await page.getByRole('radio', { name: /Home/ }).check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('#contact-0-name').waitFor();
  await page.screenshot({ path: out + '/quote-deeper-390.png', fullPage: true });
  const routes = [
    '/',
    '/services',
    '/auto-insurance-downey-ca',
    '/home-insurance-downey-ca',
    '/commercial-auto-insurance-downey',
    '/sr22-insurance-downey',
    '/no-license-auto-insurance-downey',
    '/insurance-markets',
    '/es',
    '/about',
    '/contact',
    '/locations',
    '/faq',
    '/insurance/downey',
    '/insurance/norwalk',
    '/insurance/commerce',
    '/quote?type=auto',
    '/admin',
    '/privacy',
    '/accessibility',
    '/404',
  ];
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(base + route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.documentElement.scrollHeight; y += 800) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 25));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);
      const size = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        width: document.documentElement.scrollWidth,
      }));
      assert.ok(size.width <= width + 1, `${route} overflow at ${width}`);
      if (width === 390) {
        const report = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        assert.deepEqual(
          report.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
          [],
          `${route} accessibility`,
        );
      }
      const name =
        route === '/'
          ? 'home'
          : route.replaceAll('/', '-').replaceAll('?', '-').replaceAll('=', '-').replace(/^-/, '');
      // Full-page evidence must include offscreen lazy images, not empty placeholders.
      await page.locator('img').evaluateAll(async (images) => {
        for (const image of images) image.loading = 'eager';
        await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
      });
      assert.equal(
        await page
          .locator('img')
          .evaluateAll(
            (images) =>
              images.filter((image) => !image.complete || image.naturalWidth === 0).length,
          ),
        0,
        `${route}: broken image`,
      );
      await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
      rows.push({ route, viewport: width, ...size });
      console.log('PASS', width, route, size.height);
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base + '/');
  assert.equal(
    await page.locator('h1').evaluate((el) => getComputedStyle(el).animationName),
    'none',
  );
  for (const width of [320, 360, 375, 430, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/services', '/es', '/locations', '/quote?type=commercial']) {
      await page.goto(base + route);
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${route} overflow ${width}`,
      );
    }
  }
  assert.deepEqual(errors, []);
  writeFileSync(out + '/measurements.json', JSON.stringify(rows, null, 2));
  console.log(
    'PASS: Phase-three context continuity, editable preset, 63 screenshots, 21 axe scans, eight widths, reduced motion, no page errors.',
  );
} finally {
  await browser.close();
}
