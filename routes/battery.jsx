import { PageWrapper } from "@/routes/index.jsx"
import BatteryInfo from "@/islands/BatteryInfo.jsx"

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
}

export default function TermsPage({ data }) {
  const metadata = {
    title: "The Battery API Page",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h2 class="text-yellow text-xl">{metadata.title}</h2>
        <BatteryInfo />
      </div>
    </PageWrapper>
  )
}
