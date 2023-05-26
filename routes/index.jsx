import { asset, Head } from "$fresh/runtime.ts"
import { tw } from "twind"
import { CSS } from "gfm"
import { DENO_ENV, GTM_ID } from "@/utils/config.js"
import PostLinceoGram from "@/islands/PostLinceoGram.jsx"
import LoginOAuth from "@/components/LoginOAuth.jsx"
import Confetti from "@/islands/Confetti.jsx"

export const PAGE_SIZE = 7
export const ROYGBIV = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
]

export const METADATA = {
  title: "Linceo Club",
  robots: {
    index: true,
    follow: true,
  },
  description: "A website for a very special boy.",
  openGraph: {
    url: "https://linceo.club",
    siteName: "Linceo Club",
    images: [{
      url: "https://linceo.club/linceo-club-logo.png",
      width: 1388,
      height: 486,
    }],
    locale: "en_US",
    type: "website",
    app_id: "582174586695026",
  },
}

export const handler = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
}

const NAV_CONTAINER_STYLE =
  `flex flex-wrap border-solid border-4 border-red p-2 mb-2`
const NAV_BUTTON_STYLE = `border(solid 2) p-2 m-2 d-flex rounded-3xl`

const Navigation = ({ data }) => (
  <div class={tw`navigation ${NAV_CONTAINER_STYLE}`}>
    <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/gram">
      LinceoGram
    </a>
    <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/bird">
      The Linceo Bird
    </a>
    <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/guestbook">
      Guestbook
    </a>
    <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/gallery/ai-art">
      AI Art
    </a>
    <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/gallery/mom">
      Gallery
    </a>
    {data?.jwt
      ? (
        <>
          {data?.user.parent
            ? (
              <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/parent">
                Publish
              </a>
            )
            : <></>}
          <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/gallery">
            Uploads
          </a>
          <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/account">
            Account
          </a>
          <a class={tw`cool-shadow ${NAV_BUTTON_STYLE}`} href="/logout">
            Logout
          </a>
        </>
      )
      : (
        <a
          class={tw`cool-shadow ${NAV_BUTTON_STYLE}`}
          href="/login/facebook"
        >
          Authenticate
        </a>
      )}
  </div>
)

export const PageWrapper = ({ children, data, meta, home = false }) => {
  return (
    <Layout data={data} meta={meta}>
      <Head>
        <style>{CSS}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
        {home
          ? (
            <div class={tw`flex justify-center my-10`}>
              <div>
                <img
                  src={asset("./linceo-family-by-chibi-amulet.png")}
                  alt="Linceo's Family"
                />
                <p class={tw`text-center text-xs mt-3`}>
                  drawing by chibi amulet, website by{" "}
                  <a href="https://hyprtxt.dev">hyprtxt</a>
                </p>
              </div>
            </div>
          )
          : <></>}
        <Navigation data={data} />
        {children}
      </div>
    </Layout>
  )
}

const isBirthday = () => {
  const date = new Date()
  if (date.getMonth() === 10 && date.getDate() === 2) {
    return true
  }
  return false
}

export const Layout = ({ children, data, meta }) => {
  const metadata = Object.assign(METADATA, meta)
  metadata.title = meta?.title
    ? "%s | Linceo Club".replace(/%s/g, meta.title)
    : METADATA.title
  // console.log(metadata)
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        {/* // Open Graph URL should be the cannonical. */}
        <meta
          property="og:url"
          content={metadata.openGraph.url + data.url.pathname}
        />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="fb:app_id" content={metadata.openGraph.app_id} />
        {DENO_ENV === "production"
          ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
              >
              </script>
              <script>
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${GTM_ID}');`}
              </script>
            </>
          )
          : <></>}
      </Head>
      <body class={tw`bg-dark`}>
        {isBirthday() ? <Confetti /> : <></>}
        {children}
        {data.user?.parent ? <PostLinceoGram UserID={data.user.id} /> : <></>}
        {DENO_ENV === "development"
          ? <pre>{JSON.stringify(data, null, 2)}</pre>
          : ""}
      </body>
    </>
  )
}

export const RainbowLogo = ({ style }) => (
  <a href="/" class="no-underline">
    <h1 class={style}>
      <span class="text-red">L</span>
      <span class="text-orange">i</span>
      <span class="text-yellow">n</span>
      <span class="text-green">c</span>
      <span class="text-blue">e</span>
      <span class="text-indigo">o</span>
      <span class="text-violet">.</span>
      <span class="text-red">C</span>
      <span class="text-orange">l</span>
      <span class="text-yellow">u</span>
      <span class="text-green">b</span>
    </h1>
  </a>
)

export default function Home(props) {
  const metadata = {
    title: "Homepage",
  }
  return (
    <PageWrapper data={props.data} meta={metadata} home={true}>
      <div class="border-solid border-4 border-blue p-2">
        <p class="text-yellow">Welcome to Linceo's second Website 😃</p>
        <p class="text-orange">
          <a href="/bird">The Linceo Bird</a>{" "}
          is going to turn into more of a Blog, I think. If you're looking for a
          feed of realtime updates, check out <a href="/gram">LinceoGram</a>.
        </p>
        <p class="text-red">
          This site has a Guestbook! Use your Facebook account to signup or
          login (use the button below) and you will be able to set your
          signature and leave a message in the guestbook.
        </p>
        <p class="text-violet">
          <a href="/gram">LinceoGrams</a>{" "}
          can be directly uploaded to the site by Linceo's parents. Maybe
          Grandparents, Cousins and other family too``; If they decide to join
          someday.
        </p>
        <p class="text-blue">
          You can use your Facebook account to login below. If you don't want to
          show up in the Guestbook, you can set your signature to "" nothing at
          all.
        </p>
        {props.data.user
          ? (
            <p class="text-indigo">
              Hello{" "}
              <span class="text-green">
                {props.data.user.username.split(" ")[0]}
              </span>. It's nice to see you here again.{" "}
              <a href="/logout">
                You may log out by clicking here.
              </a>
            </p>
          )
          : <LoginOAuth provider="facebook">Login with Facebook</LoginOAuth>}
      </div>
    </PageWrapper>
  )
}
