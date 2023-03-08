import { API_URL } from "@/utils/config.js"

export const handler = {
  GET: async (_req, ctx) => {
    if (!ctx.state.jwt) {
      return new Response("", {
        status: 401,
      })
    }
    // console.log(API_URL, ctx.state.jwt)
    const query = await fetch(
      `${API_URL}/reactions/${ctx.params.index}?populate=*`,
      {
        method: "GET",
        headers: new Headers({
          "Authorization": `Bearer ${ctx.state.jwt}`,
        }),
      },
    ).then(async (res) => await res.json())
    // console.log(ctx.params.index, "reaction index", query)
    return new Response(JSON.stringify({ ...query }))
  },
  DELETE: async (_req, ctx) => {
    if (!ctx.state.jwt) {
      return new Response("", {
        status: 401,
      })
    }
    const query = await fetch(
      `${API_URL}/reactions/${ctx.params.index}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Authorization": `Bearer ${ctx.state.jwt}`,
        }),
      },
    ).then(async (res) => await res.json())
    return new Response(JSON.stringify({ ...query }))
  },
}
