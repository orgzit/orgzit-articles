// Wires up the built-in search box on the "Support Articles" collection
// list in /admin. Tina's own search backends require either a TinaCloud
// project (TinaCMSSearchClient) or tinacms dev's own localhost:4001 index
// server (LocalSearchClient) — neither applies to this self-hosted setup,
// so without this, clicking that search box would just error. This talks to
// our own GET /api/tina/search endpoint instead (see netlify/functions/tina.ts),
// which does a live text match over each article rather than maintaining a
// separate search index — there's nothing to keep in sync, so put/del are
// no-ops.
import type { SearchClient, SearchQueryResponse } from '@tinacms/search';

const STORAGE_KEY = 'orgzit-admin-token';

function getStoredPassword(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

const orgzitSearchClient: SearchClient = {
  async query(query, options) {
    const params = new URLSearchParams({ q: query });
    if (options?.limit) params.set('limit', String(options.limit));

    const res = await fetch(`/api/tina/search?${params.toString()}`, {
      headers: { Authorization: `Bearer ${getStoredPassword()}` },
    });
    if (!res.ok) throw new Error(`Search failed: ${await res.text()}`);
    return res.json() as Promise<SearchQueryResponse>;
  },
  async put() {
    // No persistent index — every query re-reads article content live.
  },
  async del() {
    // No persistent index to clean up.
  },
  supportsClientSideIndexing() {
    return false;
  },
  getDefaultLimit() {
    return 15;
  },
};

export default orgzitSearchClient;
