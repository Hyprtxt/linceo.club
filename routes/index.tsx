import { Head } from "$fresh/runtime.ts"
import { tw } from "twind"
import { CSS, render } from "gfm"
import { API_URL, DENO_ENV, TOKEN } from "@/utils/config.js"
// import Counter from "../islands/Counter.tsx";

export const PAGE_SIZE = 5

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
  return (
    <Layout data={data}>
      <Head>
        <style>{CSS}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-4xl sm:text-6xl md:text-8xl font-cherry-swash text-center" />
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
      </Head>
      <body class={tw`bg-dark`}>
        {children}
      </body>
      {DENO_ENV === "development"
        ? <pre class="text-white">{JSON.stringify(data, null, 2)}</pre>
        : ""}
    </>
  )
}

export const RainbowLogo = ({ style }) => (
  <a href="/">
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
        <p class="text-yellow">Welcome to Linceo's Website!</p>
        <p class="text-orange">
          Linceo is too young to have a Twitter or Mastodon account. Well,
          that's my excuse for the Twitter yak shaving excercise; Also I get to
          do it in Deno. I call it{" "}
          <a href="/bird" class="text-violet">The Linceo Bird</a> for now.
        </p>
        <p class="text-green">
          The site might expand to include some other stuff. Like a Guestbook
          with Facebook login.
        </p>
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

export const BirdWrap = ({ children }) => (
  <div class="border-solid border-4 border-blue p-2 mt-2">
    <h2>
      <a href="/bird" class="text-violet text-3xl text-center">
        The Linceo Bird
      </a>
    </h2>
    {children}
  </div>
)

export const Bird = ({ posts }) => (
  <BirdWrap>
    {posts.data.map((post) => <BirdPost post={post} />)}
    {/* <pre class="text-white">{JSON.stringify(posts.meta.pagination, null, 2)}</pre> */}
    {posts.meta.pagination.page > 1
      ? (
        <a
          href={`/bird?p=${posts.meta.pagination.page - 1}`}
          class="text-violet text-underline"
        >
          &laquo; Previous Page
        </a>
      )
      : <></>}
    {posts.meta.pagination.page <
        posts.meta.pagination.pageCount
      ? (
        <a
          href={`/bird?p=${posts.meta.pagination.page + 1}`}
          class="text-violet text-underline float-right"
        >
          Next Page &raquo;
        </a>
      )
      : <></>}
    <div style="clear:both" />
  </BirdWrap>
)

export const BirdPost = ({ post }) => {
  const content = render(post.attributes.content)
  return (
    <div class="border-solid border-4 border-red p-2 mt-2">
      {/* <span class="text-yellow">{new Date(post.attributes.publishedAt).toString()}</span> */}
      <a href={`/bird/${post.id}`} class="text-yellow">
        {post.attributes.date}
      </a>
      <span
        class="text-green"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </span>
    </div>
  )
}
