import type React from 'react';
import { defineConfig } from 'tinacms';
import type { AuthProvider } from '@tinacms/schema-tools';
import mediaUsageScreenPlugin from './media-usage-screen';
import orgzitSearchClient from './search-client';

// Self-hosted — no TinaCloud clientId/token. The admin UI talks to our own
// GraphQL endpoint (netlify/functions/tina.ts via the redirect in
// netlify.toml), authenticated with a single shared password rather than
// TinaCloud/AuthJS accounts. Storing the password client-side in
// localStorage is fine here — it's the shared editor password, not a
// per-user secret, and it never leaves the browser except in the
// Authorization header sent to our own backend.
const STORAGE_KEY = 'orgzit-admin-token';

function getStoredPassword(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

const sharedPasswordAuthProvider: AuthProvider = {
  async getToken() {
    const password = getStoredPassword();
    return password ? { id_token: password } : null;
  },
  async logout() {
    window.localStorage.removeItem(STORAGE_KEY);
  },
  async getUser() {
    return getStoredPassword() ? { name: 'Admin' } : null;
  },
  async authorize() {
    return getStoredPassword() ? { name: 'Admin' } : null;
  },
  async isAuthorized() {
    return !!getStoredPassword();
  },
  async isAuthenticated() {
    return !!getStoredPassword();
  },
  // Matches Tina's built-in UsernamePassword login form, which submits
  // { username, password } — username is unused since this is one shared
  // password, not per-user accounts.
  async authenticate(props) {
    const password = props?.password ?? '';
    window.localStorage.setItem(STORAGE_KEY, password);
    return { name: 'Admin' };
  },
  async fetchWithToken(input, init) {
    const password = getStoredPassword();
    return fetch(input, {
      ...init,
      headers: { ...(init?.headers || {}), Authorization: `Bearer ${password}` },
    });
  },
  getLoginStrategy() {
    return 'UsernamePassword';
  },
  getLoginScreen() {
    return null;
  },
  getSessionProvider() {
    return ({ children }: { children?: React.ReactNode }) => children;
  },
};

export default defineConfig({
  contentApiUrlOverride: '/api/tina/gql',
  authProvider: sharedPasswordAuthProvider,
  branch: process.env.GITHUB_BRANCH || 'main',
  // Powers the search box already built into the "Support Articles"
  // collection list — without this it's present in the UI but broken,
  // since it otherwise expects a TinaCloud search index. Cast needed because
  // defineConfig()'s exported type only forwards 4 of Config's 5 generics —
  // it always resolves the SearchClient generic to `undefined`, even though
  // the runtime `search.searchClient` option is fully supported.
  search: {
    searchClient: orgzitSearchClient,
  } as unknown as undefined,
  // Tina's own built-in media-usage dashboard only auto-registers when
  // isLocalClient is true, which never applies to this self-hosted setup —
  // this registers our own equivalent screen in its place, right below
  // "Media Manager" in the admin sidebar (same default "Site" nav category,
  // added right after MediaManagerScreenPlugin's own registration).
  cmsCallback: (cms) => {
    cms.plugins.add(mediaUsageScreenPlugin);
    return cms;
  },
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  // Custom media store (tina/media-store.ts) — uploads go through our own
  // backend to GitHub, not a third-party service. Not media.tina (that's
  // TinaCloud's own media manager, unavailable self-hosted).
  media: {
    loadCustomStore: async () => (await import('./media-store')).default,
  },
  schema: {
    collections: [
      {
        name: 'article',
        label: 'Support Articles',
        path: 'src/content/articles',
        format: 'md',
        // Articles are flat, addressed by their own slug field — folders were
        // never part of the design. Tina lets you create a folder here but
        // gives no way to delete one afterward (confirmed: no delete action
        // exists anywhere in its folder UI), so disabling creation avoids a
        // dead end rather than trying to work around it.
        ui: {
          allowedActions: {
            createFolder: false,
            createNestedFolder: false,
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: [
              'How Tos',
              'Overview Guide',
              'Features',
              'Uncategorized',
              'Invoicing and Order Management',
              'Lead Management',
              'Project PnL and Expense Management',
              'Customer Service Helpdesk',
              'Indian Invoicing',
              'Tips & Tricks',
            ],
          },
          { type: 'string', name: 'summary', label: 'Summary', ui: { component: 'textarea' } },
          { type: 'string', name: 'author', label: 'Author' },
          { type: 'image', name: 'authorAvatar', label: 'Author Avatar' },
          // Plain string, not 'datetime' — our content schema expects a quoted
          // date-only string ("2020-08-29"). Tina's datetime type writes an
          // unquoted ISO timestamp, which YAML parses as an object and breaks
          // Astro's z.string() schema.
          { type: 'string', name: 'date', label: 'Date (YYYY-MM-DD)' },
          { type: 'boolean', name: 'featured', label: 'Featured on homepage' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
    ],
  },
});
