import { PageWrapper } from "@/routes/index.tsx"

export default function TermsPage() {
  const metadata = {
    title: "Terms & Conditions",
  }
  return (
    <PageWrapper meta={metadata}>
      <div class="border-solid border-4 border-blue p-2">
        <h2 class="text-yellow text-xl">Terms and Conditions</h2>
      </div>
    </PageWrapper>
  )
}
