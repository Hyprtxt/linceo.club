import { PageWrapper } from "@/routes/index.jsx"
import Mirror from "@/islands/Mirror.jsx"

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
}

export default function TermsPage({ data }) {
  const metadata = {
    title: "Mirror Page",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h2 class="text-yellow text-xl">{metadata.title}</h2>
        <Mirror />
      </div>
    </PageWrapper>
  )
}
