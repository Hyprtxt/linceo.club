import { PAGE_SIZE, PageWrapper, ROYGBIV } from "@/routes/index.tsx"
import { API_URL, TOKEN } from "@/utils/config.js"
import { redirect } from "@/utils/mod.js"

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
      `${API_URL}/entries?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=users_permissions_user`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())
    return ctx.render({ ...ctx.state, entries })
  },
  POST: async (req, ctx) => {
    // const body = JSON.stringify(Object.fromEntries());
    const data = await req.formData()

    const body = JSON.stringify({
      data: {
        content: data.get("content"),
        users_permissions_user: parseInt(data.get("users_permissions_user")),
      },
    })
    const create = await fetch(`${API_URL}/entries`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${ctx.state.jwt}`,
        "Content-Type": "application/json",
      }),
      body,
    })
      .then(async (res) => await res.json())

    console.log(body, create, "create")
    // ctx.state.user = update
    return redirect("/guestbook")
    // return ctx.render({ ...ctx.state })
  },
}

export default function Page({ data }) {
  return (
    <PageWrapper data={data}>
      <GuestBookWrap>
        {data.entries.data.map((entry, index) => {
          return <GuestBookEntry entry={entry} index={index} />
        })}
      </GuestBookWrap>
      <GuestBookSignMeBox data={data} />
    </PageWrapper>
  )
}

export const GuestBookWrap = ({ children }) => (
  <div class="border-solid border-4 border-green p-2 mt-2">
    <h2 class="text-3xl text-yellow">
      The Guestbook
    </h2>
    {children}
  </div>
)

const dateFormat = (string) => {
  const date = new Date(string)
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0]
}

const GuestBookForm = ({ data }) => (
  <form method="POST" class="border-4 border-green px-2 pb-2">
    <p class="text-orange">
      Leave a message for Linceo in the Guestbook.
    </p>
    <hr class="border-1 border-yellow" />
    <p>
      {
        <textarea
          rows={3}
          name="content"
          class="bg-black border-1 border-white rounded my-2 px-2 w-full"
        />
      }
    </p>
    {
      <input
        type="hidden"
        name="users_permissions_user"
        value={data.user.id}
      />
    }
    <p>
      <input
        type="submit"
        value="post"
        class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
      />{" "}
      as {data.user.signature}
    </p>
  </form>
)

const GuestBookSignMeBox = ({ data }) => {
  return (
    <div class="border-solid border-4 border-indigo  p-2 mt-2">
      <h2 class="text-3xl text-yellow">
        Sign The Guestbook
      </h2>
      {data.user ? <GuestBookForm data={data} /> : (
        <p>
          <a href="/login/facebook">Authenticate with Facebook</a>{" "}
          to sign the Guestbook
        </p>
      )}
    </div>
  )
}

export const GuestBookEntry = ({ entry, index }) => (
  <div class={`border-solid border-4 border-${ROYGBIV[index]} p-2 mt-2`}>
    <span>
      <p class="text-orange">{dateFormat(entry.attributes.createdAt)}</p>
      {entry.attributes.content.split("\n").map((item) => (
        <p class="text-green">{item}</p>
      ))}
      <p class="text-violet">
        - {entry.attributes.users_permissions_user.data
          ? entry.attributes.users_permissions_user.data.attributes.signature
          : "Anon"}
      </p>
    </span>
  </div>
)
