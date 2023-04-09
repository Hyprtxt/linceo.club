// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
// import { tw } from "twind"
import LinceoGramPost from "@/components/LinceoGramPost.jsx"
import { stringify } from "qs"
import ForeverScrollLoader from "@/islands/ForeverScrollLoader.jsx"
import Pagination from "@/islands/Pagination.jsx"

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
    const query = stringify({
      sort: "createdAt:desc",
      pagination: {
        page: getPage(),
        pageSize: PAGE_SIZE,
      },
      populate: {
        reactions: {
          populate: "user",
        },
        user: "*",
        media: "*",
      },
    })
    const snaps = await fetch(
      `${API_URL}/snaps?${query}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())

    // console.log(snaps, !snaps.data.length)
    if (!snaps.data.length) {
      return ctx.renderNotFound({ url: new URL(req.url) })
    }
    if (snaps.error) {
      console.error(snaps.error)
      return ctx.renderNotFound({ url: new URL(req.url) })
    }
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

export const LinceoGram = ({ posts, current_user }) => {
  return (
    <GramWrap>
      {posts.data.map((post, index) => (
        <LinceoGramPost post={post} index={index} current_user={current_user} />
      ))}
      {!current_user
        ? <ForeverScrollLoader data={posts.meta.pagination} />
        : <></>}
      <Pagination data={posts.meta.pagination} />
    </GramWrap>
  )
}
