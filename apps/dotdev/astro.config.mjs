// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { createCssVariablesTheme } from "shiki";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import remarkGfm from "remark-gfm";
import rehypeCodeGroups from "@repo/rehype-code-groups";
import remarkCodeGroups from "@repo/remark-code-groups";

// https://astro.build/config
export default defineConfig({
	site: "https://a9n.dev",
	integrations: [mdx()],

	markdown: {
		rehypePlugins: [
			rehypeGithubAlerts,
			[rehypeCodeGroups, { class: "lane-full" }],
		],
		remarkPlugins: [remarkGfm, remarkCodeGroups],
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
		ssr: {
			external: ["canvaskit-wasm"],
		},
	},

	adapter: cloudflare(),
});
