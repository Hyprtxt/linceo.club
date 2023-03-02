import { assertEquals } from "$std/testing/asserts.ts"
import { freshPuppetTestWrapper } from "fresh_marionette"
import { BASE_URL, DENO_ENV } from "@/utils/config.js"

const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true }

Deno.test(
  "Public Pages Testing",
  freshPuppetTestWrapper(puppet_config, async (t, page) => {
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
      "Not found Linceo Bird should 404 (Testing bird ID #3)",
      async () => {
        const response = await page.goto(`${BASE_URL}/bird/3`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 404)
      },
    )

    await t.step(
      "Not integer Linceo Bird path should 404 (Testing bird ID #2)",
      async () => {
        const response = await page.goto(`${BASE_URL}/bird/notinteger`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 404)
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
      "The gallery page should redirect, when not logged in",
      async () => {
        const response = await page.goto(`${BASE_URL}/gallery`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The ai gallery page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/gallery/ai-art`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The public gallery page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/gallery/public`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The Mom's gallery page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/gallery/mom`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The mirror page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/mirror`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The parent page should not allow access",
      async () => {
        const response = await page.goto(`${BASE_URL}/parent`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 401)
      },
    )
    // Parent page should not allow logged in access
    // Parent page only works for parent=true

    await t.step(
      "The LinceoGram page should work",
      async () => {
        const response = await page.goto(`${BASE_URL}/gram`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "The Single LinceoGram page should work (Testing snap ID #46)",
      async () => {
        const response = await page.goto(`${BASE_URL}/gram/46`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 200)
      },
    )

    await t.step(
      "Not found LinceoGram should 404 (Testing snap ID #2)",
      async () => {
        const response = await page.goto(`${BASE_URL}/gram/2`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 404)
      },
    )

    await t.step(
      "Not integer LinceoGram path should 404 (Testing snap ID #2)",
      async () => {
        const response = await page.goto(`${BASE_URL}/gram/notinteger`, {
          waitUntil: "networkidle2",
        })
        assertEquals(response.status(), 404)
      },
    )
  }),
)
