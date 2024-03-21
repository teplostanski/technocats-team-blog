import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://teplostanski.github.io',
  base: 'technocats-team-blog',
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap(),
    react(),
  ],
  output: "static",
});
