import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const b = await chromium.launch();
const c = await b.newContext();
const p = await c.newPage();
p.on('dialog', (d) => d.accept());
const out = '../output/playwright/acquisition-final';
mkdirSync(out, { recursive: true });
const results = [];
try {
  for (const route of [
    '/',
    '/auto-insurance-downey-ca',
    '/locations',
    '/contact',
    '/es',
    '/quote',
  ]) {
    for (const viewport of [
      { width: 667, height: 375 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
    ]) {
      await p.setViewportSize(viewport);
      await p.goto('http://127.0.0.1:3002' + route);
      if (route === '/quote') await p.locator('.coverage-grid').waitFor();
      await p.waitForTimeout(200);
      assert.ok(
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        route + ' ' + JSON.stringify(viewport),
      );
      if (viewport.height === 375 && route != '/quote')
        assert.equal(
          await p.locator('.mobile-actions').evaluate((el) => getComputedStyle(el).position),
          'static',
        );
      results.push({ route, ...viewport, overflow: false });
    }
    await p.setViewportSize({ width: 1280, height: 900 });
    await p.goto('http://127.0.0.1:3002' + route);
    if (route === '/quote') await p.locator('.coverage-grid').waitFor();
    await p.setViewportSize({ width: 640, height: 450 });
    assert.ok(
      await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      route + ' 200% equivalent layout',
    );
    results.push({ route, zoom: '200% equivalent layout', overflow: false });
    await p.setViewportSize({ width: 390, height: 844 });
    await p.goto('http://127.0.0.1:3002' + route);
    if (route === '/quote') await p.locator('.coverage-grid').waitFor();
    await p.evaluate(() => {
      const changes = [
        ...document.querySelectorAll(
          'main h1,main h2,main h3,main p,main a,main button,main label,main input,main select,main summary,main strong,main small,main span',
        ),
      ].map((el) => [el, parseFloat(getComputedStyle(el).fontSize)]);
      for (const [el, size] of changes) el.style.fontSize = size * 1.5 + 'px';
    });
    const large = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      bad: [...document.querySelectorAll('main *')]
        .filter(
          (el) => el.getBoundingClientRect().right > innerWidth + 1 && !el.closest('.map-canvas'),
        )
        .slice(0, 8)
        .map((el) => el.tagName + '.' + el.className),
    }));
    assert.equal(large.overflow, false, route + ' large text ' + JSON.stringify(large));
    results.push({ route, text: '150%', overflow: false });
  }
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto('http://127.0.0.1:3002/admin');
  await p.getByRole('heading', { name: 'Welcome back.' }).waitFor();
  assert.deepEqual(
    (
      await new AxeBuilder({ page: p })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
    [],
  );
  await p.screenshot({ path: out + '/admin-login-390.png', fullPage: true });
  await p.getByLabel('Admin password').fill(readFileSync('.intake-local-password', 'utf8').trim());
  await p.getByRole('button', { name: 'Sign in', exact: true }).click();
  await p.locator('.studio').waitFor();
  await p.screenshot({ path: out + '/admin-studio-390.png', fullPage: true });
  writeFileSync(out + '/extra-responsive.json', JSON.stringify(results, null, 2));
  console.log(
    `PASS: ${results.length} landscape/tablet/200% layout/150% text checks, mobile admin login axe and studio capture.`,
  );
} finally {
  await b.close();
}
