import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [
    preact(),
    {
      name: "preload-route-chunks",
      transformIndexHtml(html, ctx) {
        if (!ctx || !ctx.bundle) return html;
        const preloads = [];
        // Preload ALL route-level chunks so navigation is instant
        const routePrefixes = [
          "Home-", "projects-", "ProjectDetail-", "Work-",
          "About-", "Category-",
        ];
        for (const [name, info] of Object.entries(ctx.bundle)) {
          if (routePrefixes.some((p) => name.includes(p))) {
            preloads.push(
              `<link rel="modulepreload" crossorigin href="/${info.fileName}">`,
            );
          }
        }
        return html.replace(
          "</head>",
          `  ${preloads.join("\n  ")}\n  </head>`,
        );
      },
    },
  ],
});