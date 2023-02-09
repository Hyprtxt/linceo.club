export default function (state) {
  console.log("Tagmanager loaded", state.GTM_ID)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag("js", new Date())
  gtag("config", state.GTM_ID)
}
