import { PageWrapper } from "@/routes/index.tsx"

export default function PrivacyPage() {
  const metadata = {
    title: "Privacy Policy",
  }
  return (
    <PageWrapper meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h2 class="text-yellow text-xl">Privacy Policy</h2>
      </div>
    </PageWrapper>
  )
}
