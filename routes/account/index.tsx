import { PageWrapper } from "@/routes/index.tsx"
import { API_URL } from "@/utils/config.js"

export const handler = {
  GET: async (_req, ctx) => {
    const user = await fetch(`${API_URL}/users/me`, {
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
    })
      .then(async (res) => await res.json())
    // console.log(user, ctx.state.jwt, `${API_URL}/users/me`)
    ctx.state.user = user
    return ctx.render({ ...ctx.state })
  },
  POST: async (req, ctx) => {
    const body = await req.formData()
    const update = await fetch(`${API_URL}/users/${ctx.state.user.id}`, {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
      }),
      body,
    })
      .then(async (res) => await res.json())
    ctx.state.user = update
    return ctx.render({ ...ctx.state })
  },
}

export default function AccountPage({ data }) {
  return (
    <PageWrapper data={data}>
      <AccountBookWrap>
        <p class="text-yellow">
          Thanks for joining us here!
        </p>
        <form method="POST" class="border-4 border-green px-2 pb-2">
          <p class="text-orange">
            Use this little form to set your Name/Signature on your guestbook
            entries.
          </p>
          <hr class="border-1 border-yellow" />
          <p>
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
          <p>
            <input
              type="submit"
              value="update"
              class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
            />
          </p>
        </form>
        <p class="text-red">
          Be nice or be banned.
        </p>
      </AccountBookWrap>
    </PageWrapper>
  )
}

export const AccountBookWrap = ({ children }) => (
  <div class="border-solid border-4 border-indigo p-2 mt-2">
    <h2 class="text-3xl text-violet">
      Account Page
    </h2>
    {children}
  </div>
)
