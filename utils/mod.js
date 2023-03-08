// @/utils/mod.js

export const redirect = (Location) =>
  new Response(null, {
    status: 302,
    headers: new Headers({
      Location,
    }),
  })

export const EMOTES = ["a🍦", "b❤️", "c😊", "d😭", "e👍", "f🚀"]
