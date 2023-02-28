import { PageWrapper } from "@/routes/index.jsx"
import PostLinceoGramForm from "@/components/PostLinceoGramForm.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"
// import { createContext } from "https://esm.sh/v106/preact@10.11.0/src/index"
import { tw } from "twind"

export const handler = {
  GET: (_req, ctx) => {
    if (!ctx.state.jwt) {
      return redirect("/unauthorized")
    }
    if (!ctx.state.user.parent) {
      return redirect("/unauthorized")
    }
    return ctx.render({ ...ctx.state })
  },
  POST: async (req, ctx) => {
    if (!ctx.state.jwt) {
      return redirect("/unauthorized")
    }
    if (!ctx.state.user.parent) {
      return redirect("/unauthorized")
    }
    const data = await req.formData()
    const body = new FormData()
    const file = data.get("media")
    // console.log(file, file.name, file.size)
    body.append("files.media", file)
    body.append(
      "data",
      JSON.stringify(
        { caption: data.get("caption"), user: data.get("user") },
        null,
        0,
      ),
    )
    const snap = await fetch(`${API_URL}/snaps?populate=*`, {
      method: "POST",
      body,
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    if (snap.error) {
      console.error(snap.error)
      return ctx.renderNotFound({ url: new URL(req.url) })
    }
    return redirect("/gram")
  },
}

export default function ParentPage({ data }) {
  const metadata = {
    title: "Parent Upload Page",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-indigo p-2 my-2">
        <h2 class="text-3xl text-violet mb-2">
          Post a LinceoGram
        </h2>
        <p class={tw`text-yellow mb-4`}>
          Welcome to the upload area.
        </p>
        <PostLinceoGramForm UserID={data.user.id} />
        {
          /* <p class="text-red mt-2">
          That's all for now.
        </p> */
        }
      </div>
    </PageWrapper>
  )
}
