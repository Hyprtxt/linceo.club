import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";
import { CSS, render } from "gfm";
// import Counter from "../islands/Counter.tsx";

export const handler = {
  GET: async (_req, ctx) => {
    const posts = await fetch(
      `https://api.hyprtxt.dev/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=30`,
    )
      .then(async (res) => await res.json())
      .then((data) => data);
    return ctx.render({ ...ctx.state, posts });
  },
};

export const Layout = ({ children }) => {
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
    </>
  );
};

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
);

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <style>{CSS}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-8xl font-cherry-swash text-center" />
        <div class="border-solid border-4 border-blue p-2">
          <p class="text-yellow">Welcome to Linceo's Website!</p>
          <p class="text-orange">
            Linceo is too young to have a Twitter or Mastodon account. Well,
            that's my excuse for the Twitter yak shaving excercise; Also I get
            to do it in Deno. I call it{" "}
            <span class="text-blue">The Linceo Bird</span> for now.
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
        <div class="border-solid border-4 border-blue p-2 mt-2">
          <h2 class="text-blue text-3xl text-center">The Linceo Bird</h2>
          {props.data.posts.data.map((post) => {
            const content = render(post.attributes.content);
            return (
              <div class="border-solid border-4 border-red p-2 mt-2">
                {/* <span class="text-yellow">{new Date(post.attributes.publishedAt).toString()}</span> */}
                <span class="text-yellow">{post.attributes.date}</span>
                <span
                  class="text-green"
                  dangerouslySetInnerHTML={{ __html: content }}
                >
                </span>
              </div>
            );
          })}
        </div>
        <pre class="text-white">{JSON.stringify(props, null, 2)}</pre>
      </div>
    </Layout>
  );
}
