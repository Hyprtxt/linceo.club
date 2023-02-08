export const handler = {
  async GET(_req, ctx) {
    if (ctx.state.user) {
      const state = ctx.state
      delete state.user
      delete state.jwt
      await ctx.store.set(ctx.REDIS_KEY, JSON.stringify(state))
      ctx.state.error = { message: "Successfully logged out" }
    } else {
      return new Response(null, {
        status: 302,
        headers: new Headers({
          location: ctx.BASE_URL + `/`,
        }),
      })
    }
    return new Response(null, {
      status: 302,
      headers: new Headers({
        location: ctx.BASE_URL + `/`,
      }),
    })
  },
}
