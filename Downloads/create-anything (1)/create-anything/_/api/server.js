import { Hono } from 'hono';
import { serveStatic } from 'hono/vercel';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your built server handler
import server from '../apps/web/build/server.js';

const app = new Hono();

// Serve static files from /build/client
app.use(
  '/*',
  serveStatic({
    root: '../apps/web/build/client'
  })
);

// Handle ALL routes with your SSR server handler
app.all('/*', async (c) => {
  return server.fetch(c.req.raw);
});

export default app;
