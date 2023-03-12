import { useEffect, useRef } from "preact/hooks"

const ForeverScrollLoader = () => {
  const watcher = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries, _opts) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          console.log("Visible, time to load more content?")
          const posts = await fetch(`/gram?p=2`).then(async (res) =>
            await res.text()
          )
          // console.log(posts)
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
