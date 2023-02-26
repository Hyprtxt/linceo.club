import { useRef } from "preact/hooks"
import { tw } from "twind"
import { animation, css } from "twind/css"
import PostLinceoGramForm from "@/components/PostLinceoGramForm.jsx"

const slideRight = animation("0.4s ease normal", {
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
})

const slideBottom = animation("0.4s ease normal", {
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
})

const backdrop = css({
  "&::backdrop": {
    background: "rgba(0, 0, 0, 0.5)",
  },
})

export default function PostLinceoGram(props) {
  const { UserID } = props
  const popup = useRef(null)

  const onDialogClick = (e) => {
    if (e.target.tagName === "DIALOG") {
      popup.current.close()
    }
  }

  const doOpenCart = () => {
    return popup.current.showModal()
  }

  return (
    <>
      <button
        onClick={doOpenCart}
        class={tw`bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-orange hover:text-black active:bg-indigo active:text-black`}
      >
        Post a LinceoGram
      </button>
      <dialog
        ref={popup}
        id="GramPost"
        class={tw`bg-dark text-white p-3 m-0 pt-[50%] md:pt-0 md:ml-auto max-w-full md:max-w-lg w-full max-h-full h-full ${slideBottom} md:${slideRight} ${backdrop}`}
        onClick={onDialogClick}
      >
        <h2 class="text-2xl text-orange">Post a LinceoGram</h2>
        <PostLinceoGramForm UserID={UserID} />
      </dialog>
    </>
  )
}
