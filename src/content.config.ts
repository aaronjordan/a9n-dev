import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const Post = z.object({
  title: z.string(),
});

const notebooks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/notebooks" }),
  schema: Post,
});
const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/snippets" }),
  schema: Post,
});

export const collections = { notebooks, snippets };
