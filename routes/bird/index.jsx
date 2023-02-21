// import { HandlerContext } from "$fresh/server.ts";
import { PAGE_SIZE, PageWrapper, ROYGBIV } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { render } from "gfm"

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
    const posts = await fetch(
      `${API_URL}/posts?sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())
      .then((data) => data)
    return ctx.render({ ...ctx.state, posts })
  },
}

export default function TweetPage(props) {
  const metadata = {
    title: "The Linceo Bird",
  }
  return (
    <PageWrapper data={props.data} meta={metadata}>
      <Bird posts={props.data.posts} />
      {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
    </PageWrapper>
  )
}

export const BirdWrap = ({ children }) => (
  <div class="border-solid border-4 border-yellow p-2 mt-2">
    <h2 class="text-3xl text-orange">
      The Linceo Bird
    </h2>
    {children}
  </div>
)

export const Bird = ({ posts }) => (
  <BirdWrap>
    {posts.data.map((post, index) => <BirdPost post={post} index={index} />)}
    {/* <pre class="text-white">{JSON.stringify(posts.meta.pagination, null, 2)}</pre> */}
    {posts.meta.pagination.page > 1
      ? (
        <a
          href={`/bird?p=${posts.meta.pagination.page - 1}`}
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
          href={`/bird?p=${posts.meta.pagination.page + 1}`}
          class="text-underline float-right"
        >
          Next Page &raquo;
        </a>
      )
      : <></>}
    <div style="clear:both" />
  </BirdWrap>
)

export const BirdPost = ({ post, index }) => {
  const content = render(post.attributes.content)
  return (
    <div
      class={`border-solid border-4 border-${
        ROYGBIV[(index + 4) % 7]
      } p-2 mt-2`}
    >
      {/* <span class="text-yellow">{new Date(post.attributes.publishedAt).toString()}</span> */}
      <a href={`/bird/${post.id}`} class="text-yellow">
        {post.attributes.date}
      </a>
      <span
        class="text-green"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </span>
    </div>
  )
}
