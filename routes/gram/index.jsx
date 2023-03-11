// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { tw } from "twind"
import LinceoGramPost from "@/components/LinceoGramPost.jsx"
import { stringify } from "qs"

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
      sort: "id:desc",
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

    // console.log(snaps)
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

const Pagination = ({ data }) => {
  const { page, pageCount } = data
  return (
    <>
      {page > 1
        ? (
          <a
            href={`/gram?p=${page - 1}`}
            class={tw`text-underline`}
          >
            &laquo; Previous Page
          </a>
        )
        : <></>}
      {page <
          pageCount
        ? (
          <a
            href={`/gram?p=${page + 1}`}
            class="text-underline float-right"
          >
            Next Page &raquo;
          </a>
        )
        : <></>}
      <div style="clear:both" />
    </>
  )
}

export const LinceoGram = ({ posts, current_user }) => (
  <GramWrap>
    {posts.data.map((post, index) => (
      <LinceoGramPost post={post} index={index} current_user={current_user} />
    ))}
    {/* <pre class="text-white">{JSON.stringify(posts.meta.pagination, null, 2)}</pre> */}
    <Pagination data={posts.meta.pagination} />
  </GramWrap>
)
