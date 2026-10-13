/** Exercise the actual production handler without external accounts or network calls. */
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { randomBytes, scryptSync } from 'node:crypto';
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const originalFetch = globalThis.fetch;
const oldEnv = { ...process.env };
try {
  const { handleIntake } = await vite.ssrLoadModule('/src/server/intake.ts');
  const {
    defaults,
    validateAnswers,
    validateConfig,
    hydrateConfig,
    configuredCoverage,
    coverages,
  } = await vite.ssrLoadModule('/src/intake/schema.ts');
  const salt = randomBytes(16).toString('hex');
  Object.assign(process.env, {
    VERCEL: '1',
    INTAKE_LOCAL_MODE: 'true',
    INTAKE_ORIGIN: 'https://originalinsurance.net',
    INTAKE_SESSION_SECRET: randomBytes(32).toString('hex'),
    INTAKE_ADMIN_PASSWORD_HASH:
      salt + ':' + scryptSync('synthetic-test-password', salt, 64).toString('hex'),
    UPSTASH_REDIS_REST_URL: 'https://redis.invalid',
    UPSTASH_REDIS_REST_TOKEN: 'test',
    RESEND_API_KEY: 'test',
    INTAKE_EMAIL_FROM: 'Original Insurance <quotes@originalinsurance.net>',
  });
  let config = defaults(),
    failEmail = false,
    failStorage = false,
    submittedEmail,
    idempotency;
  let vinResult = { ErrorCode: '0', ModelYear: '2003', Make: 'HONDA', Model: 'Accord' },
    vinFailure = '',
    vinCalls = 0;
  globalThis.fetch = async (url, options) => {
    if (String(url).startsWith('https://vpic.nhtsa.dot.gov/')) {
      vinCalls++;
      assert.equal(
        String(url),
        'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/1HGCM82633A004352?format=json',
      );
      assert.equal(options.body, undefined, 'Only VIN is transmitted');
      if (vinFailure === 'network') throw Error('network');
      if (vinFailure === 'json') return new Response('bad json');
      if (vinFailure === 'busy') return new Response('', { status: 429 });
      return Response.json({ Results: vinResult ? [vinResult] : [] });
    }
    if (url === 'https://redis.invalid') {
      if (failStorage) return Response.json({ error: 'unavailable' }, { status: 503 });
      const cmd = JSON.parse(options.body);
      if (cmd[0] === 'GET') return Response.json({ result: JSON.stringify(config) });
      if (cmd[0] === 'EVAL' && cmd[3] === 'ois:intake:settings') {
        if (config.version !== cmd[4]) return Response.json({ result: 0 });
        config = JSON.parse(cmd[5]);
        return Response.json({ result: 1 });
      }
      if (cmd[0] === 'EVAL') return Response.json({ result: 1 });
      throw Error('Unexpected Redis command');
    }
    if (url === 'https://api.resend.com/emails') {
      submittedEmail = JSON.parse(options.body);
      idempotency = options.headers['Idempotency-Key'];
      return Response.json(failEmail ? { error: 'unavailable' } : { id: 'test-email-id' }, {
        status: failEmail ? 503 : 200,
      });
    }
    throw Error('Unexpected network call: ' + url);
  };
  const call = (action, data, cookie = '', extra = {}) =>
    handleIntake(
      new Request('https://originalinsurance.net/api/intake?action=' + action, {
        method: data === undefined ? 'GET' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://originalinsurance.net',
          Cookie: cookie,
          ...extra,
        },
        body: data === undefined ? undefined : JSON.stringify(data),
      }),
    );
  assert.equal(
    (await (await call('config')).json()).local,
    false,
    'Local mode is forcibly disabled on Vercel',
  );
  assert.equal((await call('decode-vin', { vin: 'INVALID' })).status, 400);
  assert.equal(vinCalls, 0);
  const decoded = await (await call('decode-vin', { vin: '1hgcm82633a004352' })).json();
  assert.equal(decoded.vehicle.model, 'Accord');
  assert.equal(decoded.complete, true);
  vinResult.Model = '';
  assert.equal(
    (await (await call('decode-vin', { vin: '1HGCM82633A004352' })).json()).complete,
    false,
  );
  vinResult.ErrorCode = '1';
  assert.equal((await call('decode-vin', { vin: '1HGCM82633A004352' })).status, 422);
  vinResult = null;
  assert.equal((await call('decode-vin', { vin: '1HGCM82633A004352' })).status, 422);
  for (const failure of ['network', 'json', 'busy']) {
    vinFailure = failure;
    assert.equal((await call('decode-vin', { vin: '1HGCM82633A004352' })).status, 503);
  }
  const legacy = defaults();
  delete legacy.wording;
  delete legacy.custom;
  delete legacy.fields.auto['contact.method'];
  assert.equal(hydrateConfig(legacy).fields.auto['contact.method'].show, true);
  const login = await call('login', { password: 'synthetic-test-password' });
  assert.equal(login.status, 200);
  const cookie = login.headers.get('set-cookie');
  assert.ok(cookie.includes('Secure'));
  assert.ok(cookie.includes('HttpOnly'));
  assert.ok(cookie.includes('SameSite=Strict'));
  const token = cookie.split(';')[0];
  assert.equal((await (await call('session', undefined, token)).json()).authenticated, true);
  const draft = structuredClone(config);
  draft.fields.auto['vehicles.vin'] = { show: false, required: false };
  assert.equal((await call('save', { config: draft }, token)).status, 200);
  assert.equal((await call('save', { config: draft }, token)).status, 409);
  assert.equal(
    (await call('save', { config }, token, { Origin: 'https://evil.example' })).status,
    403,
  );
  const payload = {
    type: 'auto',
    version: config.version,
    id: crypto.randomUUID(),
    consent: true,
    answers: {
      contact: [
        {
          name: '<script>synthetic</script>',
          email: 'test@example.com',
          phone: '3105550100',
          zip: '90240',
        },
      ],
      drivers: [{ name: 'Test Driver' }],
      vehicles: [
        { year: '2024', make: 'Toyota', model: 'Camry', vin: 'HIDDEN VALUE', driver: '0' },
      ],
      policy: [{ insured: 'No', carrier: 'STALE CARRIER', notes: '<img src=x onerror=alert(1)>' }],
    },
  };
  assert.equal((await call('submit', payload)).status, 200);
  assert.equal(submittedEmail.reply_to, 'test@example.com');
  assert.equal(submittedEmail.to[0], 'contact@originalinsurance.net');
  assert.ok(!submittedEmail.text.includes('HIDDEN VALUE'));
  assert.ok(!submittedEmail.text.includes('STALE CARRIER'));
  assert.ok(!submittedEmail.html.includes('<script>'));
  assert.ok(!submittedEmail.html.includes('<img '));
  assert.ok(submittedEmail.html.includes('&lt;script&gt;'));
  assert.equal(idempotency, 'ois-quote-' + payload.id);
  failEmail = true;
  assert.equal(
    (await call('submit', payload)).status,
    502,
    'Provider failure cannot become customer success',
  );
  failEmail = false;
  assert.equal((await call('submit', payload)).status, 200);
  assert.equal(idempotency, 'ois-quote-' + payload.id, 'Retry uses same idempotency key');
  assert.equal((await call('submit', { ...payload, huge: 'x'.repeat(1100000) })).status, 413);
  failStorage = true;
  assert.equal((await call('config')).status, 503, 'No permissive defaults on storage outage');
  assert.equal((await call('submit', payload)).status, 503);
  failStorage = false;
  delete process.env.RESEND_API_KEY;
  assert.equal(
    (await call('submit', payload)).status,
    503,
    'Missing email credentials fail closed',
  );
  // Optional/required and conditional rules remain correct independently of browser constraints.
  const strict = defaults();
  strict.fields.auto['vehicles.vin'].show = false;
  strict.fields.auto['policy.carrier'].required = true;
  assert.doesNotThrow(() => validateAnswers(payload.answers, strict, coverages[0]));
  const invalid = structuredClone(payload.answers);
  invalid.policy[0].insured = 'Yes';
  delete invalid.policy[0].carrier;
  assert.throws(() => validateAnswers(invalid, strict, coverages[0]), /insurance company/);
  strict.fields.auto['vehicles.vin'].show = false;
  const birth = structuredClone(payload.answers);
  birth.drivers[0].dob = '2025-02-31';
  assert.throws(() => validateAnswers(birth, strict, coverages[0]), /valid date/);
  const badDriver = structuredClone(payload.answers);
  badDriver.vehicles[0].driver = '99';
  assert.throws(() => validateAnswers(badDriver, strict, coverages[0]), /primary driver/);
  // Custom questions: all answer types, labels, boundaries, stripping, and email serialization.
  const extended = defaults();
  extended.wording.auto['contact.name'] = { label: 'Your legal name', hint: 'As on your policy.' };
  const kinds = ['text', 'textarea', 'number', 'date', 'select', 'checkbox'];
  extended.custom.auto = kinds.map((kind, i) => ({
    id: 'custom_' + i.toString(16).padStart(16, '0'),
    section: 'contact',
    kind,
    label: 'Custom ' + kind,
    hint: 'Helpful context',
    show: true,
    required: true,
    ...(kind === 'select' ? { options: ['First', 'Second'] } : {}),
  }));
  const checked = validateConfig(extended);
  const customAnswers = structuredClone(payload.answers);
  delete customAnswers.vehicles[0].vin;
  const values = ['Synthetic', 'Long answer', '5', '2026-10-12', 'Second', 'Yes'];
  extended.custom.auto.forEach((q, i) => (customAnswers.contact[0][q.id] = values[i]));
  const clean = validateAnswers(customAnswers, checked, coverages[0]);
  const { quoteEmail } = await vite.ssrLoadModule('/src/server/email.ts');
  const customEmail = quoteEmail(
    configuredCoverage(checked, coverages[0]),
    clean,
    crypto.randomUUID(),
  );
  assert.ok(customEmail.text.includes('Your legal name:'));
  for (let i = 0; i < kinds.length; i++)
    assert.ok(customEmail.text.includes('Custom ' + kinds[i] + ': ' + values[i]));
  for (let i = 0; i < kinds.length; i++) {
    const bad = structuredClone(customAnswers);
    delete bad.contact[0][extended.custom.auto[i].id];
    assert.throws(() => validateAnswers(bad, checked, coverages[0]));
  }
  const badCheck = structuredClone(customAnswers);
  badCheck.contact[0][extended.custom.auto[5].id] = 'No';
  assert.throws(() => validateAnswers(badCheck, checked, coverages[0]));
  const hidden = structuredClone(checked);
  hidden.custom.auto[0].show = false;
  hidden.custom.auto[0].required = false;
  assert.equal(
    validateAnswers(customAnswers, hidden, coverages[0]).contact[0][hidden.custom.auto[0].id],
    undefined,
  );
  for (const mutation of [
    (c) => (c.custom.auto[0].id = '__proto__'),
    (c) => (c.custom.auto[0].label = '<script>'),
    (c) => (c.custom.auto[0].kind = 'html'),
    (c) => (c.custom.auto[4].options = ['duplicate', 'duplicate']),
    (c) => (c.wording.auto['contact.name'].label = ''),
    (c) => c.custom.auto.push(c.custom.auto[0]),
  ]) {
    const bad = structuredClone(checked);
    mutation(bad);
    assert.throws(() => validateConfig(bad));
  }
  const duplicate = structuredClone(payload.answers);
  duplicate.vehicles[0].vin = '1HGCM82633A004352';
  duplicate.vehicles.push({ ...duplicate.vehicles[0] });
  assert.throws(() => validateAnswers(duplicate, defaults(), coverages[0]), /same VIN/);
  console.log(
    'PASS: VIN success, normalization, partial results, invalid VINs, provider failures; legacy settings migration; custom question validation, required answers, hidden stripping, edited wording, and email content.',
  );
  process.env.INTAKE_SESSION_SECRET = randomBytes(32).toString('hex');
  assert.equal((await (await call('session', undefined, token)).json()).authenticated, false);
  const logout = await call('logout', {});
  assert.ok(logout.headers.get('set-cookie').includes('Max-Age=0'));
  console.log(
    'PASS: production cookies, local-mode lockout, Redis settings/conflicts, CSRF, validation, hidden-field stripping, email escaping/routing, provider failure/retry, body bounds, storage outage, missing credentials, and session rotation. No network requests made.',
  );
} finally {
  globalThis.fetch = originalFetch;
  process.env = oldEnv;
  await vite.close();
}
