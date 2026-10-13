import { quoteEmail } from './email';
import { agency } from '../intake/agency';
import { decodeVin, VinLookupError } from './vin';
import { createHmac, randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  coverages,
  defaults,
  isRecord,
  validateConfig,
  hydrateConfig,
  configuredCoverage,
  validateAnswers,
  type FormConfig,
  type Answers,
  type Coverage,
} from '../intake/schema';

const local = () =>
  process.env.INTAKE_LOCAL_MODE === 'true' &&
  !process.env.VERCEL &&
  process.env.NODE_ENV !== 'production';
const dir = () => resolve(process.env.INTAKE_LOCAL_DIR || '.intake-local');
const configKey = `${agency.id}:intake:settings`;
const cookieName = `${agency.id}_admin`;
const counters = new Map<string, { count: number; until: number }>();
let saving = Promise.resolve();
class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
function secret() {
  const value = process.env.INTAKE_SESSION_SECRET;
  if (!value || value.length < 32)
    throw new HttpError(503, 'Admin access has not been configured.');
  return value;
}
function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}
function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
function authenticated(req: Request) {
  const token = (req.headers.get('cookie') || '')
    .split('; ')
    .find((c) => c.startsWith(cookieName + '='))
    ?.slice(cookieName.length + 1);
  if (!token) return false;
  const [expires, nonce, mac, extra] = token.split('.');
  return (
    !extra &&
    !!nonce &&
    !!mac &&
    /^\d+$/.test(expires) &&
    +expires > Date.now() &&
    +expires < Date.now() + 9 * 3600000 &&
    equal(sign(`${expires}.${nonce}`), mac)
  );
}
function cookie(req: Request, clear = false) {
  const payload = `${Date.now() + 8 * 3600000}.${randomBytes(16).toString('hex')}`;
  return `${cookieName}=${clear ? '' : `${payload}.${sign(payload)}`}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${clear ? 0 : 28800}${new URL(req.url).protocol === 'https:' || !local() ? '; Secure' : ''}`;
}
async function redis(command: (string | number)[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL,
    token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token)
    throw new HttpError(
      503,
      `The quote service is not configured yet. Please call ${agency.phone}.`,
    );
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok)
    throw new HttpError(503, 'The quote service is temporarily unavailable. Please try again.');
  const data = await res.json();
  if (data.error)
    throw new HttpError(503, 'The quote service is temporarily unavailable. Please try again.');
  return data.result;
}
async function getConfig(): Promise<FormConfig> {
  let raw;
  if (local()) {
    try {
      raw = await readFile(resolve(dir(), 'settings.json'), 'utf8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    }
  } else raw = await redis(['GET', configKey]);
  if (!raw) return defaults();
  const parsed = JSON.parse(String(raw));
  return hydrateConfig(parsed);
}
async function saveConfig(config: FormConfig) {
  const version = config.version;
  config.version++;
  config.updatedAt = new Date().toISOString();
  if (local()) {
    const operation = saving.then(async () => {
      if ((await getConfig()).version !== version)
        throw new HttpError(
          409,
          'Someone saved newer settings. Reload before making more changes.',
        );
      await mkdir(dir(), { recursive: true });
      await writeFile(resolve(dir(), 'settings.tmp'), JSON.stringify(config), { mode: 0o600 });
      await rename(resolve(dir(), 'settings.tmp'), resolve(dir(), 'settings.json'));
    });
    saving = operation.catch(() => {});
    await operation;
  } else {
    const result = await redis([
      'EVAL',
      "local v=redis.call('GET',KEYS[1]); local current=1; if v then current=cjson.decode(v).version end; if current~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1",
      1,
      configKey,
      version,
      JSON.stringify(config),
    ]);
    if (result !== 1)
      throw new HttpError(409, 'Someone saved newer settings. Reload before making more changes.');
  }
  return config;
}
async function limit(req: Request, action: string, maximum: number) {
  // Vercel overwrites x-real-ip at its edge; do not trust an arbitrary forwarded chain.
  const ip = req.headers.get('x-real-ip') || 'local';
  const key = `${agency.id}:intake:limit:${action}:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
  let count: number;
  if (local()) {
    for (const [k, v] of counters) if (v.until < Date.now()) counters.delete(k);
    const value = counters.get(key) || { count: 0, until: Date.now() + 900000 };
    count = ++value.count;
    counters.set(key, value);
  } else
    count = Number(
      await redis([
        'EVAL',
        "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",
        1,
        key,
      ]),
    );
  if (count > maximum)
    throw new HttpError(429, `Too many attempts. Please wait 15 minutes, or call ${agency.phone}.`);
}
export function formatEmail(type: Coverage, answers: Answers, id: string) {
  return quoteEmail(type, answers, id).text;
}
async function send(type: Coverage, answers: Answers, id: string) {
  const formatted = quoteEmail(type, answers, id);
  const message = {
    from: process.env.INTAKE_EMAIL_FROM,
    to: [process.env.INTAKE_EMAIL_TO || agency.email],
    reply_to: answers.contact[0].email,
    ...formatted,
  };
  if (local()) {
    await mkdir(resolve(dir(), 'mail'), { recursive: true });
    await writeFile(
      resolve(dir(), 'mail', `${id}.json`),
      JSON.stringify({ ...message, from: 'local-preview', testOnly: true }, null, 2),
      { mode: 0o600 },
    );
    return;
  }
  if (!process.env.RESEND_API_KEY || !message.from)
    throw new HttpError(503, `Email delivery is not available yet. Please call ${agency.phone}.`);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `${agency.id}-quote-${id}`,
    },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok)
    throw new HttpError(
      502,
      `We couldn’t send your request. Your answers are still here. Please try again or call ${agency.phone}.`,
    );
}
async function readBody(req: Request, maxBytes = 65536): Promise<Record<string, unknown>> {
  if (!req.headers.get('content-type')?.startsWith('application/json'))
    throw new HttpError(415, 'Use a JSON request.');
  if (+(req.headers.get('content-length') || 0) > maxBytes)
    throw new HttpError(413, 'This request is too large.');
  const reader = req.body?.getReader();
  if (!reader) throw new HttpError(400, 'Missing request.');
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxBytes) {
      await reader.cancel();
      throw new HttpError(413, 'This request is too large.');
    }
    chunks.push(value);
  }
  try {
    const raw = JSON.parse(Buffer.concat(chunks).toString());
    if (isRecord(raw)) return raw;
  } catch {
    /* invalid JSON */
  }
  throw new HttpError(400, 'Invalid request.');
}
export async function handleIntake(req: Request): Promise<Response> {
  try {
    const action = new URL(req.url).searchParams.get('action') || 'config';
    if (req.method === 'GET') {
      if (action === 'config') return json({ config: await getConfig(), local: local() });
      if (action === 'session')
        return json({
          authenticated: authenticated(req),
          local: local(),
          recipient: authenticated(req) ? process.env.INTAKE_EMAIL_TO || agency.email : undefined,
        });
      throw new HttpError(404, 'Not found.');
    }
    if (req.method !== 'POST')
      return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET, POST' });
    const expected = local() ? new URL(req.url).origin : process.env.INTAKE_ORIGIN || agency.origin;
    if (req.headers.get('origin') !== expected)
      throw new HttpError(403, 'Reload this page and try again.');
    const body = await readBody(req, ['save', 'submit'].includes(action) ? 1048576 : 65536);
    if (action === 'decode-vin') {
      await limit(req, 'vin', 40);
      return json(await decodeVin(body.vin));
    }
    if (action === 'login') {
      await limit(req, 'login', 8);
      const hash = process.env.INTAKE_ADMIN_PASSWORD_HASH;
      if (!hash || !/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(hash))
        throw new HttpError(503, 'Admin access has not been configured.');
      const [salt, expectedHash] = hash.split(':');
      const password = typeof body.password === 'string' ? body.password : '';
      if (
        password.length > 256 ||
        !equal(scryptSync(password, salt, 64).toString('hex'), expectedHash)
      )
        throw new HttpError(401, 'That password isn’t correct. Try again.');
      return json({ ok: true }, 200, { 'Set-Cookie': cookie(req) });
    }
    if (action === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': cookie(req, true) });
    if (action === 'save') {
      if (!authenticated(req))
        throw new HttpError(
          401,
          'Your session expired. Sign in again; your changes are still here.',
        );
      let config;
      try {
        config = validateConfig(body.config);
      } catch (e) {
        throw new HttpError(400, (e as Error).message);
      }
      return json({ config: await saveConfig(config) });
    }
    if (action === 'submit') {
      await limit(req, 'submit', 12);
      if (body.website)
        throw new HttpError(400, 'We couldn’t accept this request. Please call our office.');
      if (body.consent !== true || typeof body.id !== 'string' || !/^[a-f0-9-]{36}$/.test(body.id))
        throw new HttpError(400, 'Please agree to be contacted about your request.');
      const config = await getConfig();
      if (body.version !== config.version)
        throw new HttpError(
          409,
          'The form has changed. Review the updated questions before sending.',
        );
      const type = coverages.find((c) => c.id === body.type && config.enabled.includes(c.id));
      if (!type) throw new HttpError(400, 'Choose an available insurance type.');
      let answers;
      try {
        answers = validateAnswers(body.answers, config, type);
      } catch (e) {
        throw new HttpError(400, (e as Error).message);
      }
      await send(configuredCoverage(config, type), answers, body.id);
      return json({ ok: true, reference: body.id, local: local() });
    }
    throw new HttpError(404, 'Not found.');
  } catch (e) {
    return json(
      {
        error:
          e instanceof HttpError || e instanceof VinLookupError
            ? e.message
            : `The service is temporarily unavailable. Please try again or call ${agency.phone}.`,
      },
      e instanceof HttpError || e instanceof VinLookupError ? e.status : 503,
    );
  }
}
