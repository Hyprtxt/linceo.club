import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";
import { Layout, RainbowLogo } from "@/routes/index.tsx"

export default function Page() {
  return (
    <Layout>
      <div class="p-4 mx-auto max-w-screen-md">
        <RainbowLogo style="text-8xl font-cherry-swash text-center" />
        <div class="border-solid border-4 border-blue p-2">
          <h2 class="text-yellow text-xl">January 2023 Week 1</h2>
          <p class="text-violet">An update on things Linceo did this week!</p>
          <p class="text-blue">Fun Places</p>
          <p class="text-blue">We share a place that Linceo likes</p>
          <p class="text-blue">Linceo Eats</p>
          <p class="text-blue">A bit about a food that Linceo eats</p>

          
          <p class="text-blue">Week one: Hi-Chew</p>
          <p class="text-blue">Linceo Really likes Hi-Chew and will behave his best to get some of this sweet chewy candy.</p>
          <p class="text-blue">Flavors he has tried</p>
          <ul>
            {/* <li>Apple</li> */}
            <li>Banana</li>
            <li>Watermelon</li>
            <li>Cola/Ramune</li>
            <li>Tropical Mix</li>
          </ul>


          <p class="text-blue"></p>
          <p class="text-blue"></p>

          {/* <p class="text-blue">The Water Park is closed for the winter.</p> */}
          {/* <p class="text-blue">The Indoor Park</p> */}
          {/* <p class="text-blue">Linceo loves Maxine</p>
          <p class="text-blue">video of Linceo calling Maxine and feeding treats?</p> */}
        </div>
        {/* <p class="my-6 text-red">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-orange">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-yellow">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-green">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-blue">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-indigo">
          Welcome to my site, This is a neat place to build
        </p>
        <p class="my-6 text-violet">
          Welcome to my site, This is a neat place to build
        </p> */}

        {/* <Counter start={3} /> */}
      </div>
    </Layout>
  );
}
