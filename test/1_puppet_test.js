import { assertEquals } from "$std/testing/asserts.ts"
import { freshPuppetTestWrapper } from "@/test/runner.js"
import { BASE_URL } from "@/utils/config.js"

Deno.test(
  "Public Pages Testing",
  freshPuppetTestWrapper(async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })

    await t.step("The Linceo Bird page should work", async () => {
      const response = await page.goto(`${BASE_URL}/bird`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })

    await t.step("Pagination link 1 should work", async () => {
      const response = await page.goto(`${BASE_URL}/bird?p=1`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 200)
    })

    await t.step("Pagination link 2 should work", async () => {
      const response = await page.goto(`${BASE_URL}/bird?p=2`, {
        waitUntil: "domcontentloaded",
      })
      assertEquals(response.status(), 200)
    })

    await t.step(
      "The single Bird post page should work (Testing ID #14)",
      async () => {
        const response = await page.goto(`${BASE_URL}/bird/14`, {
          waitUntil: "domcontentloaded",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The Guestbook page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/guestbook`, {
          waitUntil: "domcontentloaded",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The Privacy Policy page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/privacy`, {
          waitUntil: "domcontentloaded",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The Terms & Conditions page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/terms`, {
          waitUntil: "domcontentloaded",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step("The error page should 404", async () => {
      const response = await page.goto(`${BASE_URL}/404`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 404)
    })

    await t.step("The unauthorized page should 401", async () => {
      const response = await page.goto(`${BASE_URL}/unauthorized`, {
        waitUntil: "networkidle2",
      })
      assertEquals(response.status(), 401)
    })

    await t.step(
      "The account page should 401, when not logged in",
      async () => {
        const response = await page.goto(`${BASE_URL}/account`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 401)
      },
    )

    await t.step(
      "The gallery page should 401, when not logged in",
      async () => {
        const response = await page.goto(`${BASE_URL}/gallery`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 401)
      },
    )
  }),
)
