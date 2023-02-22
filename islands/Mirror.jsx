import { useEffect, useRef } from "preact/hooks"

export default function Mirror(props) {
  const video = useRef(null)
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.current.srcObject = stream
        })
        .catch(function (err) {
          console.log("Something went wrong!")
        })
    }
  }, [])
  return (
    <video
      class="w-full"
      ref={video}
      autoplay="true"
    >
    </video>
  )
}
