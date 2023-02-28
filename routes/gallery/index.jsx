import { PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"
import { tw } from "twind"

export const handler = {
  GET: async (_req, ctx) => {
    if (!ctx.state.jwt) {
      return redirect("/gallery/public")
    }
    const media = await fetch(`${API_URL}/upload/files`, {
      headers: new Headers({
        Authorization: `Bearer ${TOKEN}`,
      }),
    })
      .then(async (res) => await res.json())
    if (media.error) {
      return ctx.renderNotFound({ url: new URL(req.url) })
    }
    return ctx.render({ ...ctx.state, media })
  },
}

export default function AccountPage({ data }) {
  const metadata = {
    title: "Account",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <MediaPageWrap>
        <p class={tw`text-yellow mb-4`}>
          Welcome to the members only gallery!
        </p>
        <p class="text-green mb-4">
          This page just displays everything that gets uploaded to the server.
        </p>
        <div class="flex flex-wrap justify-between">
          {data.media.map((file) => {
            if (file.formats) {
              return (
                <>
                  <img
                    class="flex-initial p-1"
                    src={file.formats.thumbnail.url}
                  />
                </>
              )
            }
          })}
        </div>
        <p class="text-red mt-2">
          That's all for now.
        </p>
      </MediaPageWrap>
    </PageWrapper>
  )
}

export const MediaPageWrap = ({ children }) => (
  <div class="border-solid border-4 border-indigo p-2 my-2">
    <h2 class="text-3xl text-violet mb-2">
      Members only gallery
    </h2>
    {children}
  </div>
)
