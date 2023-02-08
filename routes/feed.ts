import { Handlers } from "$fresh/server.ts"

import { Feed, type Item as FeedItem } from "feed"

export const handler: Handlers<Post[]> = {
  async GET(req, _ctx) {
    const posts = await getPosts()
    const url = new URL(req.url)
    const origin = url.origin
    const copyright = `Copyright ${new Date().getFullYear()} ${origin}`
    const feed = new Feed({
      title: "Linceo Club",
      description: "Welcome to Linceo Club. This is Linceo's website.",
      id: `${origin}/bird`,
      link: `${origin}/bird`,
      language: "en",
      favicon: `${origin}/favicon.ico`,
      copyright: copyright,
      generator: "Hyprtxt - Taylor 99721",
      feedLinks: {
        atom: `${origin}/feed`,
      },
    })

    posts.map((post) => {
      const item: FeedItem = {
        id: `${origin}/${post.title}`,
        title: post.title,
        description: post.snippet,
        date: post.publishedAt,
        link: `${origin}/${post.slug}`,
        copyright,
        published: post.publishedAt,
      }
      feed.addItem(item)
    })

    const atomFeed = feed.atom1()
    return new Response(atomFeed, {
      headers: {
        "content-type": "application/atom+xml; charset=utf-8",
      },
    })
  },
}
