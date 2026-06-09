import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "preload-home-chunks",
      transformIndexHtml(html, ctx) {
        if (!ctx || !ctx.bundle) return html;
        // Find the Home chunk and projects data chunk, add modulepreload
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
