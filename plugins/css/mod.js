const cssText = await Deno.readTextFile(
  "./plugins/css/style.css",
)

export default function css() {
  return {
    name: "css",
    render(ctx) {
      const scripts = []
      const styles = [{ cssText, id: "css" }]
      ctx.render()
      return {
        scripts,
        styles,
      }
    },
  }
}
