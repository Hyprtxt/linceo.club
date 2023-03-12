import { useEffect, useRef } from "preact/hooks"
import { useSignal } from "@preact/signals"
import { show_pagination } from "@/islands/Pagination.jsx"

const ForeverScrollLoader = ({ data }) => {
  const { pageCount } = data
  const page = useSignal(data.page)
  const watcher = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries, _opts) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          page.value++
          // console.log("Visible, time to load more content", page.value)
          if (page.value > pageCount) return
          if (show_pagination.value) show_pagination.value = false
          const posts = await fetch(`/gram?p=${page.value}`)
            .then(async (res) => await res.text())
          const parser = new DOMParser()
          const doc = parser.parseFromString(posts, "text/html")
          const grams = doc.querySelectorAll(".gram_post")
          for (const element of grams) content.current.appendChild(element)
        }
      })
    })

    observer.observe(watcher.current)
    return () => {
      observer.disconnect()
    }
  }, [watcher])

  return (
    <>
      <div ref={content}></div>
      <div ref={watcher}></div>
    </>
  )
}

export default ForeverScrollLoader
