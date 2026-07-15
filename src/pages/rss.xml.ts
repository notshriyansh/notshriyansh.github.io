import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(_context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "Shriyansh Sharma",

    description:
      "Software engineering, distributed systems, AI, and project notes.",

    site: "https://notshriyansh.github.io",

    items: posts.map((post) => ({
      title: post.data.title,

      description: post.data.description,

      pubDate: post.data.date,

      link: `/blog/${post.id}/`,
    })),
  });
}
