import { PageWrapper } from "@/routes/index.jsx"
import { API_URL } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"

export const handler = {
  GET: async (_req, ctx) => {
    if (!ctx.state.jwt) {
      return redirect("/unauthorized")
    }
    const user = await fetch(`${API_URL}/users/me`, {
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    ctx.state.user = user
    return ctx.render({ ...ctx.state })
  },
  POST: async (req, ctx) => {
    if (!ctx.state.jwt) {
      return redirect("/unauthorized")
    }
    const body = await req.formData()
    const update = await fetch(`${API_URL}/users/${ctx.state.user.id}`, {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
      body,
    })
      .then(async (res) => await res.json())
    const state = Object.assign(ctx.state, { user: update })
    const payload = JSON.stringify(state)
    return await ctx.store.set(ctx.REDIS_KEY, payload)
      .then(() => ctx.render({ ...state }))
  },
}

export default function AccountPage({ data }) {
  const metadata = {
    title: "Account",
  }
  return (
    <PageWrapper data={data} meta={metadata}>
      <AccountBookWrap>
        <p class="text-yellow mb-4">
          Thanks for joining us here!
        </p>
        <form method="POST" class="border-4 border-green px-2 my-2">
          <p class="text-orange my-2">
            Use this little form to set your Name/Signature on your guestbook
            entries.
          </p>
          <p class="text-blue mb-2">
            Leave this field blank and you will not show up in the guest list.
          </p>
          <hr class="border-1 border-yellow" />
          <p class="my-2">
            <label>
              Signature:&nbsp;
              <input
                type="text"
                value={data.user.signature}
                name="signature"
                class="bg-black border-1 border-white rounded my-2 px-2"
              />
            </label>
          </p>
          <p class="my-2">
            <input
              type="submit"
              value="update"
              class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
            />
          </p>
        </form>
        <p class="text-red mt-2">
          Be nice or be banned.
        </p>
      </AccountBookWrap>
    </PageWrapper>
  )
}

export const AccountBookWrap = ({ children }) => (
  <div class="border-solid border-4 border-indigo p-2 my-2">
    <h2 class="text-3xl text-violet mb-2">
      Account Page
    </h2>
    {children}
  </div>
)
