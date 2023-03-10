import { PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"
import { tw } from "twind"

export const handler = {
  GET: async (req, ctx) => {
    // if (!ctx.state.jwt) {
    //   return redirect("/unauthorized")
    // }
    const media = await fetch(`${API_URL}/art-gallery?populate=*`, {
      headers: new Headers({
        Authorization: `Bearer ${TOKEN}`,
      }),
    })
      .then(async (res) => await res.json())
    if (media.error) {
      console.error(media.error)
      return ctx.renderNotFound({ url: new URL(req.url) })
    }
    return ctx.render({ ...ctx.state, media })
  },
}

export default function AccountPage({ data }) {
  const gallery = data.media.data.attributes.content.data
  const metadata = {
    title: "AI Art Gallery",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-indigo p-2 my-2">
        <h2 class="text-3xl text-violet mb-2">
          {metadata.title}
        </h2>
        <p class={tw`text-yellow mb-4`}>
          Welcome to the AI Art gallery!
        </p>
        <div class="flex flex-wrap justify-center">
          {gallery.map((file) => {
            if (file.attributes.formats) {
              return (
                <>
                  <img
                    class="flex-initial p-1 mb-3"
                    src={file.attributes.formats.small.url}
                  />
                </>
              )
            }
          })}
        </div>
        <p class="text-red mt-2">
          That's all for now.
        </p>
      </div>
    </PageWrapper>
  )
}
