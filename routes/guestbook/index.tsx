import { PageWrapper } from "@/routes/index.tsx"
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
      .then(async (res) => await res.json())
    return ctx.render({ ...ctx.state, entries })
  },
}

export default function Page(props) {
  return (
    <PageWrapper data={props.data}>
      <GuestBookWrap>
        {props.data.entries.data.map((entry) => {
          return <GuestBookEntry entry={entry} />
        })}
      </GuestBookWrap>
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

export const GuestBookEntry = ({ entry }) => {
  return (
    <div class="border-solid border-4 border-yellow p-2 mt-2">
      <span>
        <p class="text-orange">{dateFormat(entry.attributes.createdAt)}</p>
        <p class="text-green">{entry.attributes.content}</p>
        <p class="text-violet">
          - {entry.attributes.users_permissions_user.data.attributes.signature}
        </p>
      </span>
    </div>
  )
}
