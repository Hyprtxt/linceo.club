// import { Head } from "$fresh/runtime.ts";
// import { tw } from "twind";
// import { CSS, render } from "gfm";
// import Counter from "../islands/Counter.tsx";

export const handler = {
  GET: (req, _ctx) => {
    const img_path = new URL(req.url).pathname
    return new Response(null, {
      status: 302,
      headers: new Headers({
        Location: `https://api.hyprtxt.dev${img_path}`,
      }),
    })
  },
}
