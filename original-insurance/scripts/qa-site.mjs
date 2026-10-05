import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';
import queryMiddleware from '../middleware.js';

const app = resolve(import.meta.dirname, '..');
const out = resolve(app, '../output/playwright');
mkdirSync(out, { recursive: true });
const config = JSON.parse(readFileSync(resolve(app, 'vercel.json')));
const pages = JSON.parse(readFileSync(resolve(app, 'src/data/pages.json')));
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const dist = resolve(app, 'dist');
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3003');
  const redirect = config.redirects.find((r) => r.source === url.pathname);
  if (redirect) {
    res.writeHead(308, { Location: redirect.destination + url.search });
    res.end();
    return;
  }
  const query = queryMiddleware({ url: url.href });
  if (query) {
    res.writeHead(query.status, { Location: query.headers.get('location') });
    res.end();
    return;
  }
  if (url.pathname === '/cdn-cgi/l/email-protection') {
    res.writeHead(410, { 'X-Robots-Tag': 'noindex, nofollow' });
    res.end('Gone');
    return;
  }
  let file = resolve(dist, '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(dist)) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  let status = 200;
  if (!existsSync(file)) {
    file = resolve(dist, '404.html');
    status = 404;
  }
  res.writeHead(status, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(3003, '127.0.0.1', r));
const base = 'http://127.0.0.1:3003';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route('**/*', (route) => {
  const u = new URL(route.request().url());
  return u.origin === base || u.protocol === 'data:' ? route.continue() : route.abort();
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const checks = [];
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560];
try {
  for (const item of pages) {
    const response = await page.goto(base + item.path, { waitUntil: 'load' });
    assert.equal(response.status(), 200, item.path);
    await page.evaluate(() => document.fonts.ready);
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((e) => e.href),
      h1: document.querySelectorAll('h1').length,
      main: document.querySelectorAll('main').length,
      noindex: document.querySelector('meta[name="robots"]')?.content.includes('noindex'),
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    }));
    assert.ok(meta.title && meta.description);
    assert.equal(meta.h1, 1, item.path + ' h1');
    assert.equal(meta.main, 1);
    assert.equal(meta.noindex, false);
    assert.deepEqual(meta.canonical, ['https://originalinsurance.net' + item.path]);
    for (const link of meta.links.filter((l) => l.startsWith('/') && !l.startsWith('//'))) {
      const target = link.split('#')[0] || item.path;
      assert.ok(
        target === '/quote' || pages.some((p) => p.path === target),
        item.path + ' broken link ' + link,
      );
    }
    const layout = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: width === 1024 ? 768 : 900 });
      const overflow = await page.evaluate(() => ({
        w: innerWidth,
        scroll: document.documentElement.scrollWidth,
        bad: [...document.querySelectorAll('main *,header *,footer *')]
          .filter((e) => e.getBoundingClientRect().right > innerWidth + 2)
          .slice(0, 5)
          .map((e) => e.tagName + '.' + e.className),
      }));
      assert.ok(
        overflow.scroll <= width + 2,
        item.path + ' ' + width + 'px overflow ' + JSON.stringify(overflow),
      );
      layout.push(width);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    // Measure contrast after entrance animations reach their final visual state.
    await page.waitForTimeout(2000);
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const violations = axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    }));
    checks.push({ path: item.path, widths: layout, violations });
    if (
      [
        '/',
        '/about',
        '/contact',
        '/services',
        '/locations',
        '/faq',
        '/privacy',
        '/auto-insurance-downey-ca',
        '/home-insurance-downey-ca',
        '/sr22-insurance-downey',
        '/no-license-auto-insurance-downey',
        '/commercial-auto-insurance-downey',
        '/insurance/norwalk',
      ].includes(item.path)
    ) {
      const slug = item.path === '/' ? 'home' : item.path.slice(1).replaceAll('/', '-');
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 650) {
            window.scrollTo({ top: y, behavior: 'instant' });
            await new Promise((r) => setTimeout(r, 25));
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.evaluate(async () => {
          await Promise.all(
            [...document.images]
              .filter((i) => i.closest('main,header,footer'))
              .map((i) =>
                i.complete
                  ? Promise.resolve()
                  : new Promise((resolve) => {
                      i.addEventListener('load', resolve, { once: true });
                      i.addEventListener('error', resolve, { once: true });
                      setTimeout(resolve, 5000);
                    }),
              ),
          );
        });
        await page.waitForTimeout(850);
        assert.deepEqual(
          await page
            .locator('main img')
            .evaluateAll((images) =>
              images.filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
            ),
          [],
          item.path + ' broken images',
        );
        await page.screenshot({ path: resolve(out, `after-${slug}-${width}.png`), fullPage: true });
      }
    }
    console.log(item.path + ' — 11 widths; ' + violations.length + ' accessibility findings');
  }
  // Routing is verified against the exact deployment config and middleware locally.
  for (const item of pages.filter((p) => p.path !== '/')) {
    const r = await fetch(base + item.path + '/', { redirect: 'manual' });
    assert.equal(r.status, 308);
    assert.equal(r.headers.get('location'), item.path);
  }
  for (const path of ['/faq?q=test', '/faq/?q=test']) {
    const r = await fetch(base + path);
    assert.equal(r.status, 200);
    assert.equal(new URL(r.url).pathname, '/faq');
    assert.equal(new URL(r.url).search, '');
  }
  const notFound = await page.goto(base + '/does-not-exist');
  assert.equal(notFound.status(), 404);
  assert.ok(
    await page
      .locator('meta[name="robots"]')
      .getAttribute('content')
      .then((v) => v.includes('noindex')),
  );
  assert.equal((await fetch(base + '/cdn-cgi/l/email-protection')).status, 410);
  // Keyboard menu, native dialog focus restoration, and no eager third-party iframe.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  assert.equal(await page.locator('#quote-dialog iframe').getAttribute('src'), null);
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#mobile-nav').evaluate((d) => d.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#mobile-nav').evaluate((d) => d.open), false);
  assert.equal(
    await page.locator('.menu-toggle').evaluate((e) => e === document.activeElement),
    true,
  );
  await page.locator('.nav-quote').click();
  assert.equal(await page.locator('#quote-dialog').evaluate((d) => d.open), true);
  assert.equal(
    await page.locator('#quote-dialog iframe').getAttribute('src'),
    'https://quotzal.com/f/original-insurance',
  );
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#quote-dialog').evaluate((d) => d.open), false);
  assert.equal(
    await page.locator('.nav-quote').evaluate((e) => e === document.activeElement),
    true,
  );
  await page.goto(base + '/quote');
  assert.equal(
    await page.locator('main iframe').getAttribute('src'),
    'https://quotzal.com/f/original-insurance',
  );
  assert.ok(
    (await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),
  );
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
  }
  await page.goto(base + '/faq');
  const faq = page.locator('.faq-list details').first();
  await faq.locator('summary').click();
  assert.equal(await faq.evaluate((d) => d.open), true);
  await page.goto(base);
  const review = page.locator('[data-review-gallery]');
  await review.locator('[data-review-next]').click();
  assert.equal(await review.locator('[data-review-count]').innerText(), '02 / 04');
  await review.locator('[data-review-prev]').click();
  assert.equal(await review.locator('[data-review-count]').innerText(), '01 / 04');
  // Form validation, mocked success/failure. No real customer messages are sent.
  await page.goto(base + '/contact');
  await page.locator('button[type="submit"]').click();
  assert.equal(await page.locator('#name').evaluate((e) => e.validity.valueMissing), true);
  await page.locator('#name').fill('QA Test');
  await page.locator('#email').fill('qa@example.com');
  await page.locator('#topic').selectOption('General question');
  await page.locator('#message').fill('Mocked browser test, never sent.');
  let requestCount = 0;
  await page.route('https://api.web3forms.com/submit', async (route) => {
    requestCount++;
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ success: false }),
    });
  });
  await page.locator('button[type="submit"]').click();
  await page.locator('#form-status[data-state="error"]').waitFor();
  assert.equal(await page.locator('#message').inputValue(), 'Mocked browser test, never sent.');
  await page.unroute('https://api.web3forms.com/submit');
  await page.route('https://api.web3forms.com/submit', async (route) => {
    requestCount++;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
  await page.locator('button[type="submit"]').click();
  await page.locator('#form-status[data-state="success"]').waitFor();
  assert.equal(await page.locator('#name').inputValue(), '');
  assert.equal(requestCount, 2);
  // Reduced motion, 200%-equivalent layout, and no-JavaScript navigation/content.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    'auto',
  );
  await page.setViewportSize({ width: 640, height: 400 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base + '/auto-insurance-downey-ca');
  assert.equal(await staticPage.locator('h1').count(), 1);
  assert.ok(
    await staticPage
      .locator('main')
      .innerText()
      .then((t) => t.length > 1000),
  );
  await nojs.close();
  assert.equal(errors.length, 0, 'Browser errors: ' + errors.join('; '));
  writeFileSync(
    resolve(out, 'qa-results.json'),
    JSON.stringify(
      {
        pages: checks,
        errors,
        interactions: 'passed',
        routing: 'passed',
        noJavaScript: 'passed',
        form: 'mocked success and failure passed',
      },
      null,
      2,
    ),
  );
  const findings = checks.reduce((sum, c) => sum + c.violations.length, 0);
  console.log(
    `Completed 25 routes × 11 widths. ${findings} accessibility findings. Interaction, routing, reduced-motion, no-JS and mocked form checks passed.`,
  );
  if (findings) process.exitCode = 1;
} catch (error) {
  writeFileSync(
    resolve(out, 'qa-results.json'),
    JSON.stringify({ pages: checks, errors, failure: String(error) }, null, 2),
  );
  throw error;
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
