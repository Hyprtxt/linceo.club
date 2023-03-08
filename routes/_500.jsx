import { tw } from "twind"
import { DENO_ENV } from "@/utils/config.js"

export default function Page500({ error }) {
  // console.log(error, "YESYS")

  let message = undefined
  if (error instanceof Error) {
    message = error.stack
  } else {
    message = String(error)
  }
  return (
    <body class={tw`bg-dark`}>
      <div class="border-solid border-4 border-blue p-2">
        <h1 class="text-red text-4xl">
          500 <span class="text-orange text-2xl">Server Error</span>
        </h1>
        {DENO_ENV === "development" ? <pre>{message}</pre> : <></>}
        <p>There is something wrong at the server. Please try again later.</p>
      </div>
    </body>
  )
}
