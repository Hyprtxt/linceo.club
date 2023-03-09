import { EMOTES } from "@/utils/mod.js"
import { css } from "twind/css"
import IconChevronDown from "$icons/chevron-down.tsx"
import IconX from "$icons/x.tsx"
import { tw } from "twind"
import { useSignal } from "@preact/signals"

const Reactions = ({ reactions, current_user, gram_id }) => {
  const data = reactions.data.map((reaction) => {
    return {
      id: reaction.id,
      emote: reaction.attributes.emote.slice(1),
      signature: reaction.attributes.user.data?.attributes?.signature,
      mine: current_user?.id === reaction.attributes.user.data?.id,
    }
  })
  // console.log(data, "this reaction")
  const signal = useSignal(data)

  const removeEmote = async (_e, emote_id) => {
    // Delete the Emote
    const reaction_id = parseInt(emote_id)
    console.log(reaction_id)
    const query = await fetch(`/api/reaction/${reaction_id}`, {
      method: "DELETE",
    }).then(async (res) => await res.json())
    if (query.error) {
      console.error(query)
    }
    signal.value = signal.value.filter((item) => {
      return item.id !== reaction_id
    })
  }

  const addEmote = async (_e, emote) => {
    // Update server
    const thing = await fetch(`/gram/${gram_id}/${emote[0]}`)
      .then(async (res) => await res.json())
    // Update the local view
    const newItem = {
      id: thing.query.data.id,
      emote: thing.query.data.attributes.emote.slice(1),
      signature: "",
      mine: true,
    }
    signal.value = [...signal.value, newItem]
  }

  return (
    <div class="flex justify-between mt-2">
      {reactions?.data
        ? (
          <div class="flex justify-start w-full flex-wrap">
            {signal.value.length ? "Reactions:" : ""}
            {signal.value.map((item) => {
              const { emote, signature, mine, id } = item
              return (
                <ReactionTooltip
                  tooltip={mine
                    ? (
                      <button
                        class="text-red"
                        onClick={(e) => {
                          removeEmote(e, id)
                        }}
                      >
                        <IconX class="w-4 h-4" />
                      </button>
                    )
                    : signature}
                >
                  {emote}
                </ReactionTooltip>
              )
            })}
          </div>
        )
        : <></>}
      {current_user?.id ? <AddReactionButton addEmote={addEmote} /> : <></>}
    </div>
  )
}

const EmoteLink = ({ emote, idx, doClick }) => (
  <li class="emote-link">
    <a
      class={`${idx === 0 ? "rounded-t" : ""} ${
        idx === EMOTES.length - 1 ? "rounded-b" : ""
      } bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap no-underline text-xl cursor-pointer`}
      onClick={(e) => doClick(e, emote)}
    >
      {emote.slice(1)}
    </a>
  </li>
)

const AddReactionButton = ({ addEmote = () => {} }) => {
  const dropdown = css({
    "&:hover .dropdown-menu": {
      display: "block",
    },
  })
  return (
    <div class={tw`dropdown inline-block relative ${dropdown}`}>
      <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span class="mr-1">React</span>
        <IconChevronDown class="w-5 h-5" />
      </button>
      <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 right-0">
        {EMOTES.map((emote, idx) => {
          return (
            <EmoteLink
              emote={emote}
              index={idx}
              doClick={addEmote}
            />
          )
        })}
      </ul>
    </div>
  )
}

const ReactionTooltip = ({ children, tooltip }) => {
  return (
    <div class="relative flex flex-col items-center group text-2xl">
      {children}
      <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
          {tooltip}
        </span>
        <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div>
  )
}

export default Reactions
