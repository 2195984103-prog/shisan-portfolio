import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [
    preact(),
    {
      name: "preload-home-chunks",
      transformIndexHtml(html, ctx) {
        if (!ctx || !ctx.bundle) return html;
        const preloads = [];
        for (const [name, info] of Object.entries(ctx.bundle)) {
          if (name.includes("Home-") || name.includes("projects-")) {
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