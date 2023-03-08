// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper, ROYGBIV } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { EMOTES } from "@/utils/mod.js"
import LocalDateTime from "@/islands/LocalDateTime.jsx"
import { tw } from "twind"
import { css } from "twind/css"
import IconChevronDown from "$icons/chevron-down.tsx"
import EmoteLink from "@/islands/EmoteLink.jsx"

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

export const SnapWrap = ({ children }) => (
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
  <SnapWrap>
    {posts.data.map((post, index) => (
      <SnapPost post={post} index={index} current_user={current_user} />
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
  </SnapWrap>
)

const StrapiMedia = ({ post }) => {
  const sizes = ["thumbnail", "small", "medium", "large"]
  if (!post.attributes.media.data) {
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

const LinkButton = (props) => (
  <a
    {...props}
    class={`inline-block cursor-pointer px-3 py-2 bg-white rounded hover:bg-gray-100 ${
      props.class ?? ""
    }`}
  />
)

const AddReactionButton = ({ snap_id = 40 }) => {
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
          return <EmoteLink emote={emote} index={idx} snap_id={snap_id} />
        })}
      </ul>
    </div>
  )
}

export const SnapPost = (props) => {
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
      <div class="flex justify-between mt-2">
        {reactions?.data
          ? (
            <div class="flex">
              {reactions.length ? "Reactions:" : ""}
              <ReactionsList reactions={reactions} />
            </div>
          )
          : <></>}
        {current_user?.id ? <AddReactionButton snap_id={post.id} /> : <></>}
      </div>
    </div>
  )
}

const ReactionsList = ({ reactions }) => {
  return reactions.data.map((reaction) => {
    // console.log(reaction)
    const { user, emote } = reaction.attributes
    return (
      <ReactionCSS
        tooltip={user.data?.attributes?.signature ?? "?"}
      >
        {emote.slice(1)}
      </ReactionCSS>
    )
  })
}

const ReactionCSS = ({ children, tooltip }) => {
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
