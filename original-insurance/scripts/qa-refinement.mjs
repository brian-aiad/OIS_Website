/** Local refinement regression: complete market lists, context, keyboard and responsive ownership. */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = 'http://127.0.0.1:3002';
const out = 'output/playwright/refinement';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const rows = [];
try {
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/insurance-markets', '/about']) {
      await page.goto(base + route);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${route}: overflow at ${width}`,
      );
      rows.push({
        route,
        width,
        height: await page.evaluate(() => document.documentElement.scrollHeight),
        footer: await page
          .locator('footer')
          .evaluate((el) => Math.round(el.getBoundingClientRect().height)),
      });
    }
  }
  await page.goto(base + '/?city=norwalk&lang=es');
  const section = page.locator('[data-markets]');
  for (const [category, count, type] of [
    ['auto', 8, 'auto'],
    ['property', 9, 'home'],
    ['commercial', 7, 'other'],
  ]) {
    const button = section.locator(`[data-market="${category}"]`);
    await button.focus();
    await page.keyboard.press('Enter');
    await assert.equal(await button.getAttribute('aria-pressed'), 'true');
    const group = section.locator(`[data-market-group="${category}"]`);
    assert.equal(await group.locator('.carrier-logo').count(), count);
    const href = new URL(await group.locator('.market-quote').getAttribute('href'), base);
    assert.equal(href.searchParams.get('type'), type);
    assert.equal(href.searchParams.get('city'), 'norwalk');
    assert.equal(href.searchParams.get('lang'), 'es');
  }
  await section.locator('[data-market="all"]').click();
  assert.equal(await section.locator('[data-market-group]:visible').count(), 3);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/insurance-markets', '/about', '/es']) {
      await page.goto(base + route);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(1100);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      assert.deepEqual(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        [],
        `${route} axe ${width}`,
      );
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
      await page.screenshot({
        path: `${out}/final-${route.replaceAll('/', '') || 'home'}-${width}.png`,
        fullPage: true,
      });
    }
  }
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(base + '/');
  assert.equal(await nojs.locator('.carrier-logo:visible').count(), 24);
  assert.equal(await nojs.locator('.market-quote:visible').count(), 3);
  await nojs.close();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base + '/insurance-markets');
  assert.equal(
    await page
      .locator('.carrier-line')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
    'none',
  );
  assert.deepEqual(errors, []);
  writeFileSync(`${out}/measurements.json`, JSON.stringify(rows, null, 2));
  console.log(
    'PASS: 30 layouts, 12 axe scans, 24 carriers, all category quote contexts, keyboard filters, no-JS, reduced motion, no page errors.',
  );
} finally {
  await browser.close();
}
