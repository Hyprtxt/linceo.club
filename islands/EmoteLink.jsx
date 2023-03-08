import { EMOTES } from "@/utils/mod.js"

const EmoteLink = ({ emote, idx, snap_id }) => (
  <li class="emote-link">
    <a
      class={`${idx === 0 ? "rounded-t" : ""} ${
        idx === EMOTES.length - 1 ? "rounded-b" : ""
      } bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap no-underline text-xl cursor-pointer`}
      onClick={async (e) => {
        const thing = await fetch(`/gram/${snap_id}/${emote[0]}`)
          .then(async (res) => await res.json())
        console.log(thing)
      }}
      // href={`/gram/${snap_id}/${emote[0]}`}
    >
      {emote.slice(1)}
    </a>
  </li>
)

export default EmoteLink
