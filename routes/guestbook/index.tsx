import { Layout, RainbowLogo } from "@/routes/index.tsx"
import { API_URL, TOKEN } from "@/utils/config.js"

const PAGE_SIZE = 10

export const handler = {
  GET: async (req, ctx) => {
    const url = new URL(req.url)
    const getPage = () => {
      const the_page = parseInt(url.searchParams.get("p"))
      if (the_page > 0) {
        return the_page
      } else {
        return 1
      }
    }
    const page = getPage()
    // console.log(page);
    const entries = await fetch(
      `${API_URL}/entries?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=users_permissions_user`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => {
        console.log(res)
        return await res.json()
      })
    return ctx.render({ ...ctx.state, entries })
  },
}

export default function Page(props) {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
        <div class="border-solid border-4 border-blue p-2">
          <h2 class="text-yellow text-xl">The Guest Book</h2>
        </div>
      </div>
      <pre class="text-white">{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  )
}
