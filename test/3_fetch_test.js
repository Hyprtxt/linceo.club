import { assertEquals } from "$std/testing/asserts.ts"
import { freshTestWrapper } from "fresh_marionette"
import { API_URL, BASE_URL, TOKEN } from "@/utils/config.js"
import { Status } from "$std/http/http_status.ts"
import { stringify } from "qs"
import { PAGE_SIZE } from "@/routes/index.jsx"

Deno.test(
  "Some Testing",
  freshTestWrapper(async (t) => {
    // fresh has been started
    await t.step(
      "LinceoGram number of pages n+1 should render a 404",
      async () => {
        const query = stringify({
          sort: "createdAt:desc",
          pagination: {
            pageSize: PAGE_SIZE,
          },
        })
        const snaps = await fetch(
          `${API_URL}/snaps?${query}`,
          {
            headers: new Headers({
              Authorization: `Bearer ${TOKEN}`,
            }),
          },
        )
          .then(async (res) => await res.json())
        const onePastLastPage = snaps.meta.pagination.pageCount + 1
        const requestStatus = await fetch(
          `${BASE_URL}/gram?p=${onePastLastPage}`,
        ).then(
          async (res) => {
            await res.text()
            return res.status
          },
        )
        assertEquals(requestStatus, Status.NotFound)
      },
    )
    // all done? Fresh will close gracefully
  }),
)
