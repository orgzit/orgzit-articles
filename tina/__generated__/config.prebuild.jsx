var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// tina/media-store.ts
var media_store_exports = {};
__export(media_store_exports, {
  default: () => media_store_default
});
function getStoredPassword2() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY3);
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
var STORAGE_KEY3, GitHubMediaStore, media_store_default;
var init_media_store = __esm({
  "tina/media-store.ts"() {
    "use strict";
    STORAGE_KEY3 = "orgzit-admin-token";
    GitHubMediaStore = class {
      accept = "image/*";
      // GitHub's Contents API caps base64-encoded uploads at ~1MB per file.
      maxSize = 1024 * 1024;
      authHeaders() {
        return { Authorization: `Bearer ${getStoredPassword2()}` };
      }
      async persist(files) {
        const results = [];
        for (const { directory, file } of files) {
          const contentBase64 = await fileToBase64(file);
          const res = await fetch("/api/tina/media/upload", {
            method: "POST",
            headers: { ...this.authHeaders(), "Content-Type": "application/json" },
            body: JSON.stringify({ directory, filename: file.name, contentBase64 })
          });
          if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
          results.push(await res.json());
        }
        return results;
      }
      async delete(media) {
        const res = await fetch("/api/tina/media/delete", {
          method: "DELETE",
          headers: { ...this.authHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify({ directory: media.directory, filename: media.filename, type: media.type })
        });
        if (!res.ok) throw new Error(`Delete failed: ${await res.text()}`);
      }
      async list(options) {
        const directory = options?.directory ?? "";
        const params = new URLSearchParams({ directory });
        if (options?.thumbnailSizes) {
          params.set("thumbnailSizes", JSON.stringify(options.thumbnailSizes));
        }
        const res = await fetch(`/api/tina/media/list?${params.toString()}`, {
          headers: this.authHeaders()
        });
        if (!res.ok) throw new Error(`List failed: ${await res.text()}`);
        return res.json();
      }
      parse(media) {
        return media.src ?? "";
      }
    };
    media_store_default = GitHubMediaStore;
  }
});

// tina/config.ts
import { defineConfig } from "tinacms";

// tina/media-usage-screen.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useCMS } from "tinacms";
var STORAGE_KEY = "orgzit-admin-token";
function ImageIcon({ className }) {
  return React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className }, React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", stroke: "currentColor", strokeWidth: "2" }), React.createElement("circle", { cx: "8.5", cy: "8.5", r: "1.5", fill: "currentColor" }), React.createElement("path", { d: "M21 15l-5-5-9 9", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}
function StatCard({ label, value, tone }) {
  const toneClass = tone === "used" ? "text-emerald-600" : tone === "unused" ? "text-amber-600" : "text-blue-600";
  return React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-6" }, React.createElement("p", { className: "text-sm text-gray-500 font-medium" }, label), React.createElement("p", { className: `text-3xl font-bold ${toneClass}` }, value));
}
function DeleteFolderModal({
  folder,
  deleting,
  error,
  onCancel,
  onConfirm
}) {
  const usedFiles = folder.files.filter((f) => f.used);
  const unusedFiles = folder.files.filter((f) => !f.used);
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  return React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" }, React.createElement("div", { className: "bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden" }, React.createElement("div", { className: "px-5 py-4 border-b border-gray-200 flex items-center justify-between shrink-0" }, React.createElement("h3", { className: "font-semibold text-gray-800" }, "Delete folder ", React.createElement("span", { className: "font-mono" }, folder.folder), "?"), React.createElement("button", { type: "button", onClick: onCancel, className: "text-gray-400 hover:text-gray-600 text-lg leading-none" }, "\u2715")), React.createElement("div", { className: "px-5 py-4 overflow-auto grow" }, React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "This folder contains ", plural(folder.totalCount, "image"), ": ", plural(folder.usedCount, "image"), " currently in use, ", plural(folder.unusedCount, "image"), " unused."), usedFiles.length > 0 && React.createElement(React.Fragment, null, React.createElement("p", { className: "text-sm font-semibold text-amber-700 mb-2" }, "The following ", usedFiles.length === 1 ? "image is" : "images are", " still referenced in an article. Deleting this folder will remove ", usedFiles.length === 1 ? "it" : "them", " from that article as well:"), React.createElement("ul", { className: "space-y-2 mb-4" }, usedFiles.map((f) => React.createElement("li", { key: f.filename, className: "text-sm bg-amber-50 border border-amber-100 rounded-lg p-2.5" }, React.createElement("div", { className: "font-mono text-xs text-gray-700" }, f.filename), React.createElement("div", { className: "text-gray-500 mt-1 flex gap-1 flex-wrap" }, "Used in:", f.usedIn.map((name) => React.createElement("code", { key: name, className: "bg-white border border-gray-200 rounded px-1.5 py-0.5 text-xs" }, name)))))), unusedFiles.length > 0 && React.createElement("p", { className: "text-sm text-gray-500" }, "The remaining ", plural(unusedFiles.length, "image"), " in this folder are not referenced anywhere.")), usedFiles.length === 0 && React.createElement("p", { className: "text-sm text-emerald-700" }, "None of the ", plural(folder.totalCount, "image"), " in this folder ", folder.totalCount === 1 ? "is" : "are", " ", "referenced in any article. This folder can be safely deleted."), error && React.createElement("p", { className: "text-sm text-red-600 mt-3" }, error)), React.createElement("div", { className: "px-5 py-4 border-t border-gray-200 flex gap-3 justify-end shrink-0" }, React.createElement(
    "button",
    {
      type: "button",
      onClick: onCancel,
      disabled: deleting,
      className: "px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    },
    "Cancel"
  ), React.createElement(
    "button",
    {
      type: "button",
      onClick: onConfirm,
      disabled: deleting,
      className: "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
    },
    deleting ? "Deleting\u2026" : usedFiles.length > 0 ? "Delete anyway" : "Yes, delete folder"
  ))));
}
function FolderRow({ folder, onDeleted }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const cms = useCMS();
  const isRealFolder = folder.folder !== "(root)";
  const openConfirm = (e) => {
    e.stopPropagation();
    setDeleteError(null);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await cms.media.delete({ type: "dir", id: folder.folder, directory: "", filename: folder.folder });
      setConfirmOpen(false);
      onDeleted();
    } catch (err) {
      setDeleteError(`Could not delete "${folder.folder}": ${err instanceof Error ? err.message : "unknown error"}`);
    } finally {
      setDeleting(false);
    }
  };
  return React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-3 overflow-hidden" }, React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setOpen((o) => !o),
      className: "w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
    },
    React.createElement("span", { className: "font-semibold text-gray-800 flex items-center gap-2" }, React.createElement("span", { className: `inline-block transition-transform text-gray-400 ${open ? "rotate-90" : ""}` }, "\u25B6"), folder.folder),
    React.createElement("span", { className: "flex gap-2 text-xs flex-wrap items-center" }, React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold whitespace-nowrap" }, folder.totalCount, " total"), React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold whitespace-nowrap" }, folder.usedCount, " used"), React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold whitespace-nowrap" }, folder.unusedCount, " unused"), isRealFolder && React.createElement(
      "button",
      {
        type: "button",
        disabled: deleting,
        onClick: openConfirm,
        className: "px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold whitespace-nowrap hover:bg-red-100 disabled:opacity-50"
      },
      "Delete folder"
    ))
  ), confirmOpen && React.createElement(
    DeleteFolderModal,
    {
      folder,
      deleting,
      error: deleteError,
      onCancel: () => setConfirmOpen(false),
      onConfirm: handleConfirmDelete
    }
  ), open && React.createElement("table", { className: "w-full text-sm border-t border-gray-200" }, React.createElement("thead", null, React.createElement("tr", { className: "text-left text-xs uppercase text-gray-500" }, React.createElement("th", { className: "px-4 py-2" }, "File"), React.createElement("th", { className: "px-4 py-2" }, "Status"), React.createElement("th", { className: "px-4 py-2" }, "Used in"))), React.createElement("tbody", null, folder.files.map((f) => React.createElement("tr", { key: f.filename, className: "border-t border-gray-100" }, React.createElement("td", { className: "px-4 py-2 font-mono text-xs" }, f.filename), React.createElement("td", { className: "px-4 py-2" }, React.createElement(
    "span",
    {
      className: `px-2 py-0.5 rounded-full text-xs font-semibold ${f.used ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`
    },
    f.used ? "Used" : "Unused"
  )), React.createElement("td", { className: "px-4 py-2 text-gray-500" }, f.usedIn.length > 0 ? f.usedIn.map((name) => React.createElement("code", { key: name, className: "bg-gray-100 rounded px-1 py-0.5 text-xs mr-1" }, name)) : "\u2014"))))));
}
function MediaUsageDashboard() {
  const [state, setState] = useState("loading");
  const [report, setReport] = useState(null);
  const [query, setQuery] = useState("");
  const fetchReport = useCallback(() => {
    setState("loading");
    const password = window.localStorage.getItem(STORAGE_KEY);
    fetch("/api/tina/media/usage", {
      headers: { Authorization: `Bearer ${password ?? ""}` },
      cache: "no-store"
    }).then((res) => res.ok ? res.json() : Promise.reject(res)).then((data) => {
      setReport(data);
      setState("ok");
    }).catch(() => setState("error"));
  }, []);
  useEffect(() => {
    fetchReport();
  }, [fetchReport]);
  if (state === "loading" && !report) {
    return React.createElement("div", { className: "p-6 text-gray-500" }, "Loading media usage report\u2026");
  }
  if (state === "error" && !report) {
    return React.createElement("div", { className: "p-6 text-red-600" }, "Could not load the media usage report.");
  }
  if (!report) {
    return null;
  }
  const trimmedQuery = query.trim().toLowerCase();
  const filteredFolders = trimmedQuery ? report.folders.filter((f) => f.folder.toLowerCase().includes(trimmedQuery)) : report.folders;
  return React.createElement("div", { className: "p-6 overflow-auto h-full" }, React.createElement("div", { className: "grid grid-cols-3 gap-4 mb-6" }, React.createElement(StatCard, { label: "Total images", value: report.totalImages, tone: "total" }), React.createElement(StatCard, { label: "Used", value: report.usedImages, tone: "used" }), React.createElement(StatCard, { label: "Unused", value: report.unusedImages, tone: "unused" })), React.createElement("div", { className: "relative mb-4" }, React.createElement(
    "input",
    {
      type: "text",
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: "Search folder name\u2026",
      className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
    }
  ), query && React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setQuery(""),
      "aria-label": "Clear search",
      className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    },
    "\u2715"
  )), trimmedQuery && React.createElement("p", { className: "text-xs text-gray-500 mb-3" }, filteredFolders.length === 0 ? `No folders match "${query}".` : `${filteredFolders.length} of ${report.folders.length} folders match "${query}".`), filteredFolders.map((folder) => React.createElement(FolderRow, { key: folder.folder, folder, onDeleted: fetchReport })));
}
var mediaUsageScreenPlugin = {
  __type: "screen",
  name: "Media Usage",
  Icon: ImageIcon,
  layout: "fullscreen",
  Component: MediaUsageDashboard
};
var media_usage_screen_default = mediaUsageScreenPlugin;

// tina/search-client.ts
var STORAGE_KEY2 = "orgzit-admin-token";
function getStoredPassword() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY2);
}
var orgzitSearchClient = {
  async query(query, options) {
    const params = new URLSearchParams({ q: query });
    if (options?.limit) params.set("limit", String(options.limit));
    const res = await fetch(`/api/tina/search?${params.toString()}`, {
      headers: { Authorization: `Bearer ${getStoredPassword()}` }
    });
    if (!res.ok) throw new Error(`Search failed: ${await res.text()}`);
    return res.json();
  },
  async put() {
  },
  async del() {
  },
  supportsClientSideIndexing() {
    return false;
  },
  getDefaultLimit() {
    return 15;
  }
};
var search_client_default = orgzitSearchClient;

// tina/config.ts
var STORAGE_KEY4 = "orgzit-admin-token";
function getStoredPassword3() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY4);
}
var sharedPasswordAuthProvider = {
  async getToken() {
    const password = getStoredPassword3();
    return password ? { id_token: password } : null;
  },
  async logout() {
    window.localStorage.removeItem(STORAGE_KEY4);
  },
  async getUser() {
    return getStoredPassword3() ? { name: "Admin" } : null;
  },
  async authorize() {
    return getStoredPassword3() ? { name: "Admin" } : null;
  },
  async isAuthorized() {
    return !!getStoredPassword3();
  },
  async isAuthenticated() {
    return !!getStoredPassword3();
  },
  // Matches Tina's built-in UsernamePassword login form, which submits
  // { username, password } — username is unused since this is one shared
  // password, not per-user accounts.
  async authenticate(props) {
    const password = props?.password ?? "";
    window.localStorage.setItem(STORAGE_KEY4, password);
    return { name: "Admin" };
  },
  async fetchWithToken(input, init) {
    const password = getStoredPassword3();
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
  // Powers the search box already built into the "Support Articles"
  // collection list — without this it's present in the UI but broken,
  // since it otherwise expects a TinaCloud search index. Cast needed because
  // defineConfig()'s exported type only forwards 4 of Config's 5 generics —
  // it always resolves the SearchClient generic to `undefined`, even though
  // the runtime `search.searchClient` option is fully supported.
  search: {
    searchClient: search_client_default
  },
  // Tina's own built-in media-usage dashboard only auto-registers when
  // isLocalClient is true, which never applies to this self-hosted setup —
  // this registers our own equivalent screen in its place, right below
  // "Media Manager" in the admin sidebar (same default "Site" nav category,
  // added right after MediaManagerScreenPlugin's own registration).
  cmsCallback: (cms) => {
    cms.plugins.add(media_usage_screen_default);
    return cms;
  },
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Custom media store (tina/media-store.ts) — uploads go through our own
  // backend to GitHub, not a third-party service. Not media.tina (that's
  // TinaCloud's own media manager, unavailable self-hosted).
  media: {
    loadCustomStore: async () => (await Promise.resolve().then(() => (init_media_store(), media_store_exports))).default
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Support Articles",
        path: "src/content/articles",
        format: "md",
        // Articles are flat, addressed by their own slug field — folders were
        // never part of the design. Tina lets you create a folder here but
        // gives no way to delete one afterward (confirmed: no delete action
        // exists anywhere in its folder UI), so disabling creation avoids a
        // dead end rather than trying to work around it.
        ui: {
          allowedActions: {
            createFolder: false,
            createNestedFolder: false
          }
        },
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
          // required: true on every field below (matching title/slug/category
          // above) — src/content.config.ts's zod schema treats all of these
          // as mandatory, non-optional. Without a matching `required` here,
          // Tina lets you save an article missing one of them, which Astro
          // then rejects with a hard crash that takes down the entire site
          // build, not just that one article. Setting this blocks the Save
          // button itself until the field has a value, so an incomplete
          // article can never be written to disk in the first place.
          { type: "string", name: "summary", label: "Summary", required: true, ui: { component: "textarea" } },
          { type: "string", name: "author", label: "Author", required: true },
          { type: "image", name: "authorAvatar", label: "Author Avatar", required: true },
          // Plain string, not 'datetime' — our content schema expects a quoted
          // date-only string ("2020-08-29"). Tina's datetime type writes an
          // unquoted ISO timestamp, which YAML parses as an object and breaks
          // Astro's z.string() schema.
          { type: "string", name: "date", label: "Date (YYYY-MM-DD)", required: true },
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
