// import { HandlerContext } from "$fresh/server.ts";
import { PageWrapper } from "@/routes/index.jsx"
import { GramWrap } from "@/routes/gram/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import LinceoGramPost from "@/components/LinceoGramPost.jsx"

const randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

export const handler = {
  GET: async (req, ctx) => {
    const idx = parseInt(ctx.params.index)
    if (idx) {
      const posts = await fetch(
        `${API_URL}/snaps/${idx}?&populate[reactions][populate][0]=user&populate[user]=*&populate[media]=*`,
        {
          headers: new Headers({
            Authorization: `Bearer ${TOKEN}`,
          }),
        },
      )
        .then(async (res) => await res.json())
      if (posts.error) {
        console.error(posts.error)
        return ctx.renderNotFound({ url: new URL(req.url) })
      }
      if (posts.data !== null) {
        return ctx.render({ ...ctx.state, posts })
      }
    }
    return ctx.renderNotFound({ url: new URL(req.url) })
  },
}

export default function GramPage(props) {
  const metadata = {
    title: "LinceoGram",
  }
  return (
    <PageWrapper data={props.data} meta={metadata}>
      <GramWrap>
        <LinceoGramPost
          post={props.data.posts.data}
          index={randomInt(1, 7)}
          current_user={props.data.user}
        />
      </GramWrap>
    </PageWrapper>
  )
}
