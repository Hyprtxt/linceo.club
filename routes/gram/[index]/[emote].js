import { EMOTES } from "@/utils/mod.js"
import { API_URL } from "@/utils/config.js"

export const handler = {
  GET: async (_req, ctx) => {
    // console.log(ctx.params?.emote, "emote")
    const emoteIndex = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4 }
    const emote = EMOTES[emoteIndex[ctx.params?.emote]]
    // console.log(emote, ctx.state.user.id, ctx.params.index)
    const data = {
      data: {
        snap: ctx.params.index,
        user: ctx.state.user.id,
        emote,
      },
    }
    const query = await fetch(`${API_URL}/reactions`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    // if (query.error) {
    //   console.error(query.error)
    //   return ctx.renderNotFound({ url: new URL(req.url) })
    // }
    return new Response(
      JSON.stringify({
        query,
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
