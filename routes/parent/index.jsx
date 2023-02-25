import { PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"
// import { createContext } from "https://esm.sh/v106/preact@10.11.0/src/index"
import { tw } from "twind"

export const handler = {
  GET: (_req, ctx) => {
    // console.log(ctx.state, "that")
    if (!ctx.state.jwt) {
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
    const data = await req.formData()
    const body = new FormData()
    // console.log(data)
    // console.log(data.get("files.media"))

    body.set("files.media", data.get("media"))
    body.set("data", JSON.stringify({ caption: data.get("caption") }, null, 0))

    console.log(body)
    const snap = await fetch(`${API_URL}/snaps?populate=*`, {
      method: "POST",
      body,
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    console.log(snap, "snap")
    return redirect("/parent")
    // return ctx.render({ ...ctx.state })
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
        <form method="POST">
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
          <input
            type="submit"
            value="upload"
            class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
          />
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
