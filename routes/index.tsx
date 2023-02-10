import { Head } from "$fresh/runtime.ts"
import { tw } from "twind"
import { CSS } from "gfm"
import { API_URL, DENO_ENV, GTM_ID, TOKEN } from "@/utils/config.js"
// import Counter from "../islands/Counter.tsx";
import { Bird } from "@/routes/bird/index.tsx"

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

export const handler = {
  GET: async (_req, ctx) => {
    const posts = await fetch(
      `${API_URL}/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=${PAGE_SIZE}`,
      {
        headers: new Headers({
          Authorization: `Bearer ${TOKEN}`,
        }),
      },
    )
      .then(async (res) => await res.json())
    return ctx.render({ ...ctx.state, posts })
  },
}

export const PageWrapper = ({ children, data }) => {
  const NAV_CONTAINER_STYLE = `border-solid border-4 border-red p-2 mb-2`
  const NAV_BUTTON_STYLE = `border(solid 2) p-2 m-2 d-block rounded-3xl`
  return (
    <Layout data={data}>
      <Head>
        <style>{CSS}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
        <div class={`navigation ${NAV_CONTAINER_STYLE}`}>
          <a class={`cool-shadow ${NAV_BUTTON_STYLE}`} href="/bird">
            The Linceo Bird
          </a>
          <a class={`cool-shadow ${NAV_BUTTON_STYLE}`} href="/guestbook">
            Guestbook
          </a>
          {data.user
            ? (
              <>
                <a class={`cool-shadow ${NAV_BUTTON_STYLE}`} href="/account">
                  Account
                </a>
                <a class={`cool-shadow ${NAV_BUTTON_STYLE}`} href="/logout">
                  Logout
                </a>
              </>
            )
            : (
              <a
                class={`cool-shadow ${NAV_BUTTON_STYLE}`}
                href="/login/facebook"
              >
                Authenticate
              </a>
            )}
        </div>
        {children}
        {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
      </div>
    </Layout>
  )
}

export const Layout = ({ children, data }) => {
  return (
    <>
      <Head>
        <title>Linceo Club</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cherry+Swash&display=swap"
          rel="stylesheet"
        >
        </link>
        {
          /* {DENO_ENV === "production"
          ? (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            >
            </script>
          )
          : <></>} */
        }
      </Head>
      <body class={tw`bg-dark`}>
        {children}
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
  return (
    <PageWrapper data={props.data}>
      <div class="border-solid border-4 border-blue p-2">
        <p class="text-yellow">Welcome to Linceo's Website</p>
        <p class="text-orange">
          Linceo is too young to have a Twitter or Mastodon account. Well,
          that's my excuse for the Twitter yak shaving excercise; Also I get to
          do it in{" "}
          <a href="https://github.com/Hyprtxt/linceo.club">Deno/Fresh</a>. I
          call it <a href="/bird">The Linceo Bird</a> for now.
        </p>
        <p class="text-red">
          This site now also has a Guestbook! Use your Facebook account to
          signup or login below and you will be able to set your signature and
          leave a message in the guestbook.
        </p>
        {/* <p class="text-violet"></p> */}
        {props.data.user
          ? (
            <p class="text-blue">
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

        {/* <p class="text-orange">Join with Facebook to leave comments on pages!</p> */}
        {
          /* <h2 class="text-red text-xl">2023</h2>
          <ul class="text-blue">
            <li><a class="text-underline hover:text-yellow" href="/week1">Week 1</a></li>
          </ul> */
        }
      </div>

      <Bird posts={props.data.posts} />
    </PageWrapper>
  )
}

export const LoginOAuth = ({ provider, children }) => (
  <a
    href={`/login/${provider}`}
    id={`login-${provider}`}
    class="group relative w-full flex text-blue justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow hover:bg-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 mt-3"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg
        class="h-5 w-5 text-black group-hover:text-black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    {children}
  </a>
)
