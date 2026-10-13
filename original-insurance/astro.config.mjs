import { defineConfig } from 'astro/config';
import { intakeDev } from './scripts/intake-dev.mjs';

export default defineConfig({
  site: 'https://originalinsurance.net',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  server: { host: '127.0.0.1', port: 3002 },
  vite: {
    plugins: [intakeDev()],
    server: {
      strictPort: true,
      fs: {
        deny: [
          '.env',
          '.env.*',
          '*.{crt,pem}',
          '**/.git/**',
          '**/.intake-local/**',
          '**/.intake-local-password',
        ],
      },
    },
  },
  devToolbar: { enabled: false },
});
