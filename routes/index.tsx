import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";
// import Counter from "../islands/Counter.tsx";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Linceo Club</title>
        <link href="https://fonts.googleapis.com/css2?family=Cherry+Swash&display=swap" rel="stylesheet"></link>
      </Head>
      <body class={tw`bg-dark`}>
        {children}
      </body>
    </>
  );
}

export const RainbowLogo = ({style }) => 
  <a href="/">
    <h1 class={ style }>
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

export default function Home() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        {/* <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        /> */}
        {/* <h1 class={tw`text-6xl font-cherry-swash text-yellow`}>Linceo.Club</h1> */}
        <RainbowLogo style="text-8xl font-cherry-swash text-center" />


        <div class="border-solid border-4 border-blue p-2">
          <p class="text-yellow">Welcome to Linceo's Website!</p>
          <p class="text-orange">Join with Facebook to leave comments on pages!</p>
          <p class="text-green">This is the homepage</p>
          <h2 class="text-red text-xl">2023</h2>
          <ul class="text-blue">
            <li><a class="text-underline hover:text-yellow" href="/week1">Week 1</a></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
