export default function css() {
  return {
    name: "css",
    render(ctx) {
      const scripts = []
      const cssText = `:root {
  --red: rgb(210,81,153);
  --orange: rgb(249,108,98);
  --yellow: rgb(254,245,121);
  --green: rgb(160,235,177);
  --blue: rgb(0,190,211);
  --indigo: rgb(0,153,212);
  --violet: rgb(150,117,180);
  --dark: rgb(15,15,15);
}
@media (min-width: 510px) {
  .navigation {
    display: flex;
  }
}
.cool-shadow {
  border-color: var(--green);
  border-color: var(--red);
  box-shadow: 4px 2px 0 var(--yellow);
  margin-bottom: 15px;
  display: block;
}
.cool-shadow:hover {
  background: var(--dark)
}
.cool-shadow:active {
  background: var(--violet);
  box-shadow: 0 0 0 var(--yellow);
  position: relative;
  top: 2px;
  left: 4px;
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
