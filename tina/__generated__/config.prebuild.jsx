// tina/config.ts
import { defineConfig } from "tinacms";
var STORAGE_KEY = "orgzit-admin-token";
function getStoredPassword() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}
var sharedPasswordAuthProvider = {
  async getToken() {
    const password = getStoredPassword();
    return password ? { id_token: password } : null;
  },
  async logout() {
    window.localStorage.removeItem(STORAGE_KEY);
  },
  async getUser() {
    return getStoredPassword() ? { name: "Admin" } : null;
  },
  async authorize() {
    return getStoredPassword() ? { name: "Admin" } : null;
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
    const password = props?.password ?? "";
    window.localStorage.setItem(STORAGE_KEY, password);
    return { name: "Admin" };
  },
  async fetchWithToken(input, init) {
    const password = getStoredPassword();
    return fetch(input, {
      ...init,
      headers: { ...init?.headers || {}, Authorization: `Bearer ${password}` }
    });
  },
  getLoginStrategy() {
    return "UsernamePassword";
  },
  getLoginScreen() {
    return null;
  },
  getSessionProvider() {
    return ({ children }) => children;
  }
};
var config_default = defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: sharedPasswordAuthProvider,
  branch: process.env.GITHUB_BRANCH || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // No media.tina block — that's TinaCloud's media manager, which isn't
  // available self-hosted. Author avatars already exist for every article;
  // the Author Avatar field below just takes a plain path/URL instead of a
  // drag-and-drop upload UI.
  schema: {
    collections: [
      {
        name: "article",
        label: "Support Articles",
        path: "src/content/articles",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "How Tos",
              "Overview Guide",
              "Features",
              "Uncategorized",
              "Invoicing and Order Management",
              "Lead Management",
              "Project PnL and Expense Management",
              "Customer Service Helpdesk",
              "Indian Invoicing",
              "Tips & Tricks"
            ]
          },
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          { type: "string", name: "author", label: "Author" },
          // 'string', not 'image' — the 'image' type opens TinaCloud's media
          // picker, which isn't available self-hosted (no media.tina config
          // above). This is just a plain path/URL to an existing file, e.g.
          // /images/authors/2356035.png.
          { type: "string", name: "authorAvatar", label: "Author Avatar (path or URL)" },
          // Plain string, not 'datetime' — our content schema expects a quoted
          // date-only string ("2020-08-29"). Tina's datetime type writes an
          // unquoted ISO timestamp, which YAML parses as an object and breaks
          // Astro's z.string() schema.
          { type: "string", name: "date", label: "Date (YYYY-MM-DD)" },
          { type: "boolean", name: "featured", label: "Featured on homepage" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
