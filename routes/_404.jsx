import { PageWrapper } from "@/routes/index.jsx"
import { tw } from "twind"
import { asset } from "$fresh/runtime.ts"

export const handler = (req, ctx) => {
  const url = new URL(req.url)
  ctx.state.url = url
  return ctx.render({ ...ctx.state })
}

export default function Page404({ data }) {
  const metadata = {
    title: "Error",
  }

  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h1 class="text-red text-4xl">
          404 <span class="text-orange text-2xl">Not Found</span>
        </h1>
        <p class="text-yellow">That's an error, Whoops!</p>
        <p class="text-orange">How about a Linceo Drawing?</p>
        <div class={tw`flex justify-center`}>
          <img
            src={asset(`/error${Math.floor(Math.random() * 2) + 1}.png`)}
            alt="It's Linceo"
          />
        </div>
      </div>
    </PageWrapper>
  )
}
