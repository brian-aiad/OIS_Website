// Serve the exact production handler inside Astro's local Vite server.
import { loadEnv } from 'vite';
export function intakeDev() {
  return {
    name: 'ois-intake-dev',
    configureServer(server) {
      Object.assign(process.env, loadEnv('development', process.cwd(), ''));
      server.middlewares.use('/api/intake', async (req, res) => {
        try {
          const { handleIntake } = await server.ssrLoadModule('/src/server/intake.ts');
          const request = new Request(
            `http://${req.headers.host}/api/intake${req.url === '/' ? '' : req.url}`,
            {
              method: req.method,
              headers: req.headers,
              ...(req.method !== 'GET' && req.method !== 'HEAD'
                ? { body: req, duplex: 'half' }
                : {}),
            },
          );
          const response = await handleIntake(request);
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.writeHead(503);
          res.end(JSON.stringify({ error: 'Local intake service could not start.' }));
        }
      });
    },
  };
}
