import type { Config, Context } from '@netlify/edge-functions';

// Netlify's own edge-network rate limiting — properly distributed across
// every edge location (unlike an in-memory counter in a single function
// instance), so a sustained password-guessing attempt gets a 429 instead
// of unlimited attempts. `path` is already bound via netlify.toml's
// [[edge_functions]] block; this only adds the rate-limit behavior.
export const config: Config = {
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: 'ip',
    windowSize: 300,
    windowLimit: 20,
  },
};

// Built from inspecting the compiled production Tina bundle
// (public/admin/assets/*.js — see README's Security section for what each
// directive is for). Applied conditionally below, never during local dev:
// `npm run dev` serves a completely different Vite dev-mode HTML shell
// (inline React Refresh scripts + a script loaded from localhost:4001 for
// hot-module-reload) that this policy was never meant to cover — enforcing
// it locally would just be permanently broken noise, not a real gap, since
// the site never actually ships that way.
const PRODUCTION_CSP =
  "default-src 'self'; script-src 'self' 'sha256-v47lSjgy8bf0s1E6D9jx3JZw8bvkO/g+H0JyZDa1kFQ='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

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

  const response = await context.next();
  const hostname = new URL(request.url).hostname;
  const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';
  if (isLocalDev) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', PRODUCTION_CSP);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
