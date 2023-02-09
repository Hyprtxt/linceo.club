export default function css() {
  return {
    name: "css",
    render(ctx) {
      const scripts = []
      const cssText = `.navigation {
  display: flex;
}
.cool-shadow {
  box-shadow: 4px 2px 0 white;
  margin-bottom: 15px;
  display: block;
}
`
      const styles = [{ cssText, id: "css" }]
      ctx.render()
      return {
        scripts,
        styles,
      }
    },
  }
}
