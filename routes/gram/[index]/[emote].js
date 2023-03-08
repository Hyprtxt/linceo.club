export const handler = {
  GET: (req, ctx) => {
    console.log(ctx.params?.emote, "emote")

    // const idx = parseInt(ctx.params.index)
    // if (idx) {
    //   const posts = await fetch(
    //     `${API_URL}/snaps/${idx}?&populate[reactions][populate][0]=user&populate[user]=*&populate[media]=*`,
    //     {
    //       headers: new Headers({
    //         Authorization: `Bearer ${TOKEN}`,
    //       }),
    //     },
    //   )
    //     .then(async (res) => await res.json())
    //   if (posts.error) {
    //     console.error(posts.error)
    //     return ctx.renderNotFound({ url: new URL(req.url) })
    //   }
    //   if (posts.data !== null) {
    //     return ctx.render({ ...ctx.state, posts })
    //   }
    // }
    return new Response(
      JSON.stringify({
        stuff: false,
      }),
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      },
    )
    // return ctx.renderNotFound({ url: new URL(req.url) })
  },
}
