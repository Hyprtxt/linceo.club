import { PageWrapper } from "@/routes/index.jsx"
import SubmitButton from "@/islands/SubmitButton.jsx"
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
    // const media = await fetch(`${API_URL}/upload/files`, {
    //   headers: new Headers({
    //     Authorization: `Bearer ${TOKEN}`,
    //   }),
    // })
    //   .then(async (res) => await res.json())
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
      JSON.stringify({ caption: data.get("caption") }, null, 0),
    )
    // const snap =
    await fetch(`${API_URL}/snaps?populate=*`, {
      method: "POST",
      body,
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    // console.log(snap, "snap")
    // return redirect("/parent")
    return ctx.render({ ...ctx.state })
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
          Camera Access
        </h2>
        <p class={tw`text-yellow mb-4`}>
          Welcome to the upload test page
        </p>
        <form method="POST" enctype="multipart/form-data">
          <input
            type="hidden"
            name="user"
            value={data.user.id}
          />
          <input
            type="file"
            name="media"
            accept="image/*;capture=camera"
          />
          <textarea
            rows={3}
            name="caption"
            class="bg-black border-1 border-white rounded my-2 px-2 w-full"
          />
          <SubmitButton value="upload" />
        </form>
        {
          /* <p class="text-red mt-2">
          That's all for now.
        </p> */
        }
      </div>
    </PageWrapper>
  )
}
