import { useEffect, useRef } from "preact/hooks"

const ForeverScrollLoader = () => {
  const watcher = useRef(null)

  useEffect(() => {
    // define an observer instance
    const observer = new IntersectionObserver(onIntersection, {
      root: null,
      threshold: .5,
    })

    // callback is called on intersection change
    function onIntersection(entries, opts) {
      entries.forEach(async (entry) => {
        // console.log("VISIBLELELE?", entry.isIntersecting)
        if (entry.isIntersecting) {
          console.log("TIME TO FOREVERSCROLL LOAD")
          const posts = await fetch(`/gram?p=2`).then(async (res) =>
            await res.text()
          )
          // console.log(posts)
          const parser = new DOMParser()
          const doc = parser.parseFromString(posts, "text/html")
          const grams = doc.querySelectorAll(".gram_post")
          for (const element of grams) watcher.current.appendChild(element)
        }
        return entry.target.classList.toggle("visible", entry.isIntersecting)
      })
    }

    // Use the observer to observe an element
    console.log(watcher.current, watcher)
    setTimeout(() => {
      observer.observe(watcher.current)
    }, 2000)
  }, [])
  return (
    <>
      <div ref={watcher}></div>
    </>
  )
}

export default ForeverScrollLoader
