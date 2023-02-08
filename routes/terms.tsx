import { Layout, RainbowLogo } from "@/routes/index.tsx"

export default function TermsPage() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
        <div class="border-solid border-4 border-blue p-2">
          <h2 class="text-yellow text-xl">Terms and Conditions</h2>
        </div>
      </div>
    </Layout>
  )
}
