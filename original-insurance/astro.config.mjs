import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://originalinsurance.net',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  server: { host: '127.0.0.1', port: 3002 },
  vite: { server: { strictPort: true } },
  devToolbar: { enabled: false },
});
