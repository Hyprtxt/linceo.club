// import { HandlerContext } from "$fresh/server.ts";
import { BirdPost, BirdWrap, PageWrapper } from "@/routes/index.tsx"
import { API_URL, TOKEN } from "@/utils/config.js"

export const handler = {
  GET: async (_req, ctx) => {
    const idx = parseInt(ctx.params.index)
    if (idx) {
      const posts = await fetch(
        `${API_URL}/posts/${idx}`,
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

export default function TweetPage(props) {
  return (
    <PageWrapper data={props.data}>
      <BirdWrap>
        <BirdPost post={props.data.posts.data} />
      </BirdWrap>
      {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
    </PageWrapper>
  )
}
