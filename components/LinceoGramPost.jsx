import LocalDateTime from "@/islands/LocalDateTime.jsx"
import Reactions from "@/islands/Reactions.jsx"
import { ROYGBIV } from "@/routes/index.jsx"
import StrapiMedia from "@/components/StrapiMedia.jsx"

// const LinkButton = (props) => (
//   <a
//     {...props}
//     class={`inline-block cursor-pointer px-3 py-2 bg-white rounded hover:bg-gray-100 ${
//       props.class ?? ""
//     }`}
//   />
// )

export const LinceoGramPost = (props) => {
  const { post, index, current_user } = props
  // console.log(current_user, "YES")
  const {
    createdAt,
    user,
    caption,
    reactions,
  } = post.attributes
  // @todo
  // Display post without an image (and no error)
  // Display post with only a small image available

  // console.log(reactions, "this one")
  return (
    <div
      class={`gram_post border-solid border-4 border-${
        ROYGBIV[(index + 4) % 7]
      } p-2 mt-2`}
    >
      <p class="text-indigo">
        Posted:{" "}
        <a href={`/gram/${post.id}`}>
          <LocalDateTime date={createdAt} />
        </a>
        {" "}
      </p>
      <p class="text-orange">
        By:{" "}
        <span class="text-yellow">
          {user.data.attributes.signature}
        </span>
      </p>
      <StrapiMedia post={post} />
      <span class="text-green">
        {caption}
      </span>
      <Reactions
        reactions={reactions}
        current_user={current_user}
        gram_id={post.id}
      />
    </div>
  )
}

export default LinceoGramPost
