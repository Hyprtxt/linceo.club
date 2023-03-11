// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" }
import * as $0 from "./routes/_404.jsx"
import * as $1 from "./routes/_500.jsx"
import * as $2 from "./routes/_middleware.js"
import * as $3 from "./routes/account/index.jsx"
import * as $4 from "./routes/api/[provider]/auth.js"
import * as $5 from "./routes/api/joke.ts"
import * as $6 from "./routes/api/reaction/[index].js"
import * as $7 from "./routes/bird/[index].jsx"
import * as $8 from "./routes/bird/index.jsx"
import * as $9 from "./routes/gallery/ai-art.jsx"
import * as $10 from "./routes/gallery/index.jsx"
import * as $11 from "./routes/gallery/mom.jsx"
import * as $12 from "./routes/gallery/public.jsx"
import * as $13 from "./routes/gram/[index]/[emote].js"
import * as $14 from "./routes/gram/[index]/index.jsx"
import * as $15 from "./routes/gram/index.jsx"
import * as $16 from "./routes/guestbook/index.jsx"
import * as $17 from "./routes/index.jsx"
import * as $18 from "./routes/login/[provider].js"
import * as $19 from "./routes/logout.jsx"
import * as $20 from "./routes/mirror.jsx"
import * as $21 from "./routes/parent/index.jsx"
import * as $22 from "./routes/privacy.jsx"
import * as $23 from "./routes/sitemap.xml.js"
import * as $24 from "./routes/terms.jsx"
import * as $25 from "./routes/unauthorized.jsx"
import * as $26 from "./routes/uploads/[file].js"
import * as $$0 from "./islands/ForeverScrollLoader.jsx"
import * as $$1 from "./islands/LocalDateTime.jsx"
import * as $$2 from "./islands/Mirror.jsx"
import * as $$3 from "./islands/PostLinceoGram.jsx"
import * as $$4 from "./islands/Reactions.jsx"
import * as $$5 from "./islands/SubmitButton.jsx"

const manifest = {
  routes: {
    "./routes/_404.jsx": $0,
    "./routes/_500.jsx": $1,
    "./routes/_middleware.js": $2,
    "./routes/account/index.jsx": $3,
    "./routes/api/[provider]/auth.js": $4,
    "./routes/api/joke.ts": $5,
    "./routes/api/reaction/[index].js": $6,
    "./routes/bird/[index].jsx": $7,
    "./routes/bird/index.jsx": $8,
    "./routes/gallery/ai-art.jsx": $9,
    "./routes/gallery/index.jsx": $10,
    "./routes/gallery/mom.jsx": $11,
    "./routes/gallery/public.jsx": $12,
    "./routes/gram/[index]/[emote].js": $13,
    "./routes/gram/[index]/index.jsx": $14,
    "./routes/gram/index.jsx": $15,
    "./routes/guestbook/index.jsx": $16,
    "./routes/index.jsx": $17,
    "./routes/login/[provider].js": $18,
    "./routes/logout.jsx": $19,
    "./routes/mirror.jsx": $20,
    "./routes/parent/index.jsx": $21,
    "./routes/privacy.jsx": $22,
    "./routes/sitemap.xml.js": $23,
    "./routes/terms.jsx": $24,
    "./routes/unauthorized.jsx": $25,
    "./routes/uploads/[file].js": $26,
  },
  islands: {
    "./islands/ForeverScrollLoader.jsx": $$0,
    "./islands/LocalDateTime.jsx": $$1,
    "./islands/Mirror.jsx": $$2,
    "./islands/PostLinceoGram.jsx": $$3,
    "./islands/Reactions.jsx": $$4,
    "./islands/SubmitButton.jsx": $$5,
  },
  baseUrl: import.meta.url,
  config,
}

export default manifest
