import { useEffect, useRef } from "preact/hooks"
import { useSignal } from "@preact/signals"

const ForeverScrollLoader = (props) => {
  const { pageCount } = props
  const page = useSignal(props.page)
  const watcher = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries, _opts) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          page.value = page.value + 1
          console.log("Visible, time to load more content", page.value)
          if (page.value > pageCount) {
            console.log("BIGOLDONE")
            return
          }
          const posts = await fetch(`/gram?p=${page.value}`).then(async (res) =>
            await res.text()
          )
          //
          const parser = new DOMParser()
          const doc = parser.parseFromString(posts, "text/html")
          const grams = doc.querySelectorAll(".gram_post")
          for (const element of grams) content.current.appendChild(element)
        }
        return entry.target.classList.toggle("visible", entry.isIntersecting)
      })
    }, {
      root: null,
      threshold: .5,
    })

    observer.observe(watcher.current)
  }, [])
  return (
    <>
      <div ref={content}></div>
      <div ref={watcher}></div>
    </>
  )
}

export default ForeverScrollLoader
