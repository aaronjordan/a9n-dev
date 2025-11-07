import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

export const prerender = true;

const staticPages = {
  index: {
    title: "\nAaron Jordan 👋",
    description:
      "I build software that delights users and empowers developers.",
  },
  notebooks: {
    title: "Notebooks",
    description: "",
  },
  snippets: {
    title: "Snippets",
    description: "",
  },
  "404": {
    title: "Not Found",
  },
};

const notebooks = await getCollection("notebooks");
const snippets = await getCollection("snippets");

const notebookPages = Object.fromEntries(
  notebooks.map(({ data, id }) => [
    `notebooks/${id}`,
    {
      title: data.title,
      description: data.subtitle,
    },
  ])
);

const snippetPages = Object.fromEntries(
  snippets.map(({ data, id }) => [
    `snippets/${id}`,
    {
      title: data.title,
      description: data.subtitle,
    },
  ])
);

const pages = { ...staticPages, ...notebookPages, ...snippetPages };

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_, { title, description }) => ({
    title,
    description,
    bgGradient: [
      [249, 245, 215],
      [251, 241, 199],
    ],
    border: { color: [215, 153, 33], width: 40 },
    padding: 80,
    font: {
      title: {
        families: ["Google Sans Code", "Noto Color Emoji"],
        weight: "Normal",
        size: 78,
        lineHeight: 1.25,
        color: [40, 40, 40],
      },
      description: {
        families: ["Figtree", "Noto Color Emoji"],
        weight: "Normal",
        size: 42,
        lineHeight: 1.25,
        color: [60, 56, 54],
      },
    },
    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/google-sans-code:vf@latest/latin-wght-normal.woff2",
      "https://a9n.dev/Figtree.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-color-emoji@latest/emoji-400-normal.woff2",
    ],
  }),
});
