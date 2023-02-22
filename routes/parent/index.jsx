import { PageWrapper } from "@/routes/index.jsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"
import { createContext } from "https://esm.sh/v106/preact@10.11.0/src/index"
import { tw } from "twind"

export const handler = {
  GET: (_req, ctx) => {
    console.log(ctx.state, "that")
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
        <input type="file" accept="image/*;capture=camera" />
        {
          /* <p class="text-red mt-2">
          That's all for now.
        </p> */
        }
      </div>
    </PageWrapper>
  )
}
