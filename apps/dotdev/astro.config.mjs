// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { createCssVariablesTheme } from "shiki";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],

  markdown: {
    rehypePlugins: [rehypeGithubAlerts],
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: createCssVariablesTheme({
        name: "css-variables",
        variablePrefix: "--code-",
        fontStyle: true,
      }),
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
