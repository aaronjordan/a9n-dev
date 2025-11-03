import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const Post = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  pubDate: z.date(),
});

const notebooks = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/notebooks" }),
  schema: Post,
});
const snippets = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/snippets" }),
  schema: Post,
});

export const collections = { notebooks, snippets };
