import { Layout, RainbowLogo } from "@/routes/index.tsx"

export default function Page() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
        <div class="border-solid border-4 border-blue p-2">
          <h2 class="text-yellow text-xl">January 2023 Week 1</h2>
          <p class="text-violet">An update on things Linceo did this week!</p>
        </div>
      </div>
    </Layout>
  )
}
