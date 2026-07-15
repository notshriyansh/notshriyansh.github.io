import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://notshriyansh.github.io",

  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },

  integrations: [mdx(), sitemap()],
});
