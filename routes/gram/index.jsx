// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper, ROYGBIV } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import LocalDateTime from "@/islands/LocalDateTime.jsx"
import { tw } from "twind"
import Reactions from "@/islands/Reactions.jsx"

export const handler = {
  GET: async (req, ctx) => {
    const url = new URL(req.url)
    const getPage = () => {
      const the_page = parseInt(url.searchParams.get("p"))
      if (the_page > 0) {
        return the_page
      } else {
        return 1
      }
    }
    const page = getPage()
    // console.log(page);
    const snaps = await fetch(
      // `${API_URL}/snaps?sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=*`,
      `${API_URL}/snaps?sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate[reactions][populate][0]=user&populate[user]=*&populate[media]=*`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())

    // console.log(snaps)
    // if (snaps.error) {
    //   console.error(snaps.error)
    //   return ctx.renderNotFound({ url: new URL(req.url) })
    // }
    return ctx.render({ ...ctx.state, snaps })
  },
}

export default function LinceoGramPage(props) {
  const metadata = {
    title: "LinceoGram",
  }
  return (
    <PageWrapper data={props.data} meta={metadata}>
      <LinceoGram posts={props.data.snaps} current_user={props.data.user} />
      {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
    </PageWrapper>
  )
}

export const GramWrap = ({ children }) => (
  <div class="border-solid border-4 border-yellow p-2 mt-2">
    <a href="/gram" class="no-underline">
      <h2 class="text-3xl text-orange">
        LinceoGrams
      </h2>
    </a>
    {children}
  </div>
)

export const LinceoGram = ({ posts, current_user }) => (
  <GramWrap>
    {posts.data.map((post, index) => (
      <GramPost post={post} index={index} current_user={current_user} />
    ))}
    {/* <pre class="text-white">{JSON.stringify(posts.meta.pagination, null, 2)}</pre> */}
    {posts.meta.pagination.page > 1
      ? (
        <a
          href={`/gram?p=${posts.meta.pagination.page - 1}`}
          class={tw`text-underline`}
        >
          &laquo; Previous Page
        </a>
      )
      : <></>}
    {posts.meta.pagination.page <
        posts.meta.pagination.pageCount
      ? (
        <a
          href={`/gram?p=${posts.meta.pagination.page + 1}`}
          class="text-underline float-right"
        >
          Next Page &raquo;
        </a>
      )
      : <></>}
    <div style="clear:both" />
  </GramWrap>
)

const StrapiMedia = ({ post }) => {
  const sizes = ["thumbnail", "small", "medium", "large"]
  console.log(post.attributes.media, "SDLKFJD")
  if (!post.attributes.media.data) {
    return <></>
  }
  // console.log(post.attributes.media.data[0], "THIS")
  if (post.attributes.media.data[0].attributes.mime == "video/quicktime") {
    return <></>
  }
  const sources = sizes.reduce(
    (acc, current) => {
      const thing = post.attributes.media.data[0].attributes.formats[current]
      if (thing === undefined) {
        return acc
      }
      acc.push(`${thing.url} ${thing.width}w`)
      return acc
    },
    [],
  )
  return (
    <img
      src={post.attributes.media.data[0].attributes.formats.thumbnail.url}
      srcset={sources.join(" ,")}
      alt={post.attributes.alternativeText}
    />
  )
}

// const LinkButton = (props) => (
//   <a
//     {...props}
//     class={`inline-block cursor-pointer px-3 py-2 bg-white rounded hover:bg-gray-100 ${
//       props.class ?? ""
//     }`}
//   />
// )

export const GramPost = (props) => {
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
      class={`border-solid border-4 border-${
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
