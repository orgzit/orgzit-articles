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
        ui: {
          router: ({ document }) => `/articles/${document._sys.filename}`
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
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          { type: "string", name: "author", label: "Author" },
          { type: "image", name: "authorAvatar", label: "Author Avatar" },
          { type: "datetime", name: "date", label: "Date" },
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
