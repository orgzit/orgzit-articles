// tina/config.ts
import { defineConfig } from "tinacms";
var CLIENT_ID = process.env.TINA_CLIENT_ID || "";
var TOKEN = process.env.TINA_TOKEN || "";
var config_default = defineConfig({
  clientId: CLIENT_ID,
  token: TOKEN,
  branch: "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
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
          { type: "image", name: "authorAvatar", label: "Author Avatar" },
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
