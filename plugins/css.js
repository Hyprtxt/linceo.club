export default function css() {
  return {
    name: "css",
    render(ctx) {
      const scripts = []
      const cssText = `.navigation {
  display: flex;
}
.cool-shadow {
  border-color: rgb(160,235,177);
  border-color: rgb(249,108,98);
  box-shadow: 4px 2px 0 rgb(254,245,121);
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
