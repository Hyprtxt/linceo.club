// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" }
import * as $0 from "./routes/_404.tsx"
import * as $1 from "./routes/api/joke.ts"
import * as $2 from "./routes/bird/[index].tsx"
import * as $3 from "./routes/bird/index.tsx"
import * as $4 from "./routes/feed.ts"
import * as $5 from "./routes/index.tsx"
import * as $6 from "./routes/privacy.tsx"
import * as $7 from "./routes/terms.tsx"
import * as $8 from "./routes/uploads/[file].js"
import * as $9 from "./routes/week1.tsx"
import * as $$0 from "./islands/Counter.tsx"

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/bird/[index].tsx": $2,
    "./routes/bird/index.tsx": $3,
    "./routes/feed.ts": $4,
    "./routes/index.tsx": $5,
    "./routes/privacy.tsx": $6,
    "./routes/terms.tsx": $7,
    "./routes/uploads/[file].js": $8,
    "./routes/week1.tsx": $9,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
}

export default manifest
