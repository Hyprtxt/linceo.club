import { PageWrapper } from "@/routes/index.tsx"

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
}

export default function PrivacyPage({ data }) {
  const metadata = {
    title: "Privacy Policy",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h2 class="text-yellow text-xl">Privacy Policy</h2>
      </div>
    </PageWrapper>
  )
}
