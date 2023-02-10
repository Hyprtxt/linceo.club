import { DENO_ENV, GTM_ID } from "@/utils/config.js"

export default function gtm() {
  return {
    name: "gtm",
    entrypoints: {
      "tag-manager": new URL("./tag-manager.js", import.meta.url).href,
    },
    render(ctx) {
      const res = ctx.render()
      // console.log(res)
      const scripts = []
      const styles = []
      if (DENO_ENV === "production") {
        scripts.push({
          entrypoint: "tag-manager",
          state: { GTM_ID },
        })
      }
      return {
        scripts,
        styles,
      }
    },
  }
}
