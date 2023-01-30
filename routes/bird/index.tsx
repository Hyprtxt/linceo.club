// import { HandlerContext } from "$fresh/server.ts";
import { Bird, PAGE_SIZE, PageWrapper } from "@/routes/index.tsx";

export const handler = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const getPage = () => {
      const the_page = parseInt(url.searchParams.get("p"));
      if (the_page > 0) {
        return the_page;
      } else {
        return 1;
      }
    };
    const page = getPage();
    // console.log(page);
    const posts = await fetch(
      `https://api.hyprtxt.dev/api/posts?sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
    )
      .then(async (res) => await res.json())
      .then((data) => data);
    return ctx.render({ ...ctx.state, posts });
  },
};

export default function TweetPage(props) {
  return (
    <PageWrapper data={props.data}>
      <Bird posts={props.data.posts} />
      {/* <pre class="text-white">{JSON.stringify(props, null, 2)}</pre> */}
    </PageWrapper>
  );
}
