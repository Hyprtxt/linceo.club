import { useState } from "preact/hooks"

export default function SubmitButton(props) {
  const { value } = props
  const [working, setWorking] = useState(value)
  return (
    <input
      onClick={() => {
        setWorking("Working…")
        setTimeout(() => {
          // This fakes resetting if the formvalidation triggers.
          setWorking(value)
          // Fix this by integrating proper form validation
        }, 5000)
      }}
      type="submit"
      value={working}
      class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
    />
  )
}
