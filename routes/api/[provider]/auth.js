// routes/api/[provider]/auth.js
import { redirect } from "@/utils/mod.js"

export const handler = {
  GET: async (_req, ctx) => {
    const provider = ctx.params.provider
    // console.log(provider, "auth.js");
    const { search } = ctx.state.url
    const login = await fetch(
      `${ctx.API_URL}/auth/${provider}/callback${search}`,
    ).then(async (res) => {
      const body = await res.json()
      console.log(body, "yep")
      if (res.status !== 200) {
        return { unauthorized: true }
      }
      return body
    })
    // console.log("oauth login", login);
    const { user, jwt } = login
    const state = Object.assign(ctx.state, { user, jwt })
    const payload = JSON.stringify(state)
    return await ctx.store.set(ctx.REDIS_KEY, payload).then(
      () => redirect(`${ctx.BASE_URL}/account`),
    )
  },
}
