// import { HandlerContext } from "$fresh/server.ts";
import { PageWrapper } from "@/routes/index.jsx"
import { SnapPost, SnapWrap } from "@/routes/gram/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"

const randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

export const handler = {
  GET: async (_req, ctx) => {
    const idx = parseInt(ctx.params.index)
    if (idx) {
      const posts = await fetch(
        `${API_URL}/snaps/${idx}?populate=*`,
        {
          headers: new Headers({
            Authorization: `Bearer ${TOKEN}`,
          }),
        },
      )
        .then(async (res) => await res.json())
      // .then((data) => data)
      if (posts.data !== null) {
        return ctx.render({ ...ctx.state, posts })
      }
    }
    return ctx.renderNotFound()
  },
}

export default function GramPage(props) {
  const metadata = {
    title: "LinceoGram",
  }
  return (
    <PageWrapper data={props.data} meta={metadata}>
      <SnapWrap>
        <SnapPost post={props.data.posts.data} index={randomInt(1, 7)} />
      </SnapWrap>
      {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
    </PageWrapper>
  )
}
