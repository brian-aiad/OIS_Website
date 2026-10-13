import { randomBytes, scryptSync } from 'node:crypto';
import { writeFileSync, existsSync } from 'node:fs';
if (existsSync('.env.local'))
  throw new Error('.env.local already exists; preserve your existing configuration.');
const password = randomBytes(18).toString('base64url');
const salt = randomBytes(16).toString('hex');
const hash = salt + ':' + scryptSync(password, salt, 64).toString('hex');
writeFileSync(
  '.env.local',
  `INTAKE_LOCAL_MODE=true\nINTAKE_ADMIN_PASSWORD_HASH=${hash}\nINTAKE_SESSION_SECRET=${randomBytes(32).toString('hex')}\n`,
  { mode: 0o600 },
);
writeFileSync('.intake-local-password', password + '\n', { mode: 0o600 });
console.log(
  'Local intake configured. Admin password saved in .intake-local-password. Emails will be captured locally, never sent.',
);
