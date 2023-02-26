// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper, ROYGBIV } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"

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
      `${API_URL}/snaps?sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=*`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())
      .then((data) => data)
    return ctx.render({ ...ctx.state, snaps })
  },
}

export default function TweetPage(props) {
  const metadata = {
    title: "LinceoGram",
  }
  return (
    <PageWrapper data={props.data} meta={metadata}>
      <Snap posts={props.data.snaps} />
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

export const Snap = ({ posts }) => (
  <SnapWrap>
    {posts.data.map((post, index) => <SnapPost post={post} index={index} />)}
    {/* <pre class="text-white">{JSON.stringify(posts.meta.pagination, null, 2)}</pre> */}
    {posts.meta.pagination.page > 1
      ? (
        <a
          href={`/gram?p=${posts.meta.pagination.page - 1}`}
          class="text-underline"
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

export const SnapPost = ({ post, index }) => {
  return (
    <div
      class={`border-solid border-4 border-${
        ROYGBIV[(index + 4) % 7]
      } p-2 mt-2`}
    >
      {
        // This needs to become an Island that renders the local date.


          <a href={`/gram/${post.id}`}>
            {post.attributes.createdAt}
          </a>

      }
      {post.attributes.media.data[0].attributes.formats.large
        ? (
          <img
            src={post.attributes.media.data[0].attributes.formats.large.url}
            alt={post.attributes.alternativeText}
          />
        )
        : (
          <img
            src={post.attributes.media.data[0].attributes.formats.medium.url}
            alt={post.attributes.alternativeText}
          />
        )}
      <span class="text-green">
        {post.attributes.caption}
      </span>
      <p class="text-orange">
        Posted By:{" "}
        <span class="text-yellow">
          {post.attributes.user.data.attributes.signature}
        </span>
      </p>
    </div>
  )
}
