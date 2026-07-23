import type { Context } from '@netlify/edge-functions';

// Gates /admin/* with a single shared password (Basic Auth, browser-native
// prompt) — bound to this path via netlify.toml's [[edge_functions]] block,
// independent of Astro's own rendering entirely. This is deliberately
// separate from the API-level auth check in netlify/functions/tina.ts —
// gating this page does not gate that endpoint, and vice versa.
export default async (request: Request, context: Context) => {
  const auth = request.headers.get('authorization');
  const expected = 'Basic ' + btoa(`admin:${Netlify.env.get('ADMIN_PASSWORD')}`);

  if (auth !== expected) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Orgzit Admin"' },
    });
  }

  return context.next();
};
