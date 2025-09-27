// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { createCssVariablesTheme } from "shiki";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],

  markdown: {
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
