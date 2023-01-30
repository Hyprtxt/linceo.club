import { PageWrapper } from "@/routes/index.tsx";

export const handler = async (_req, ctx) => {
  return ctx.render({ ...ctx.state });
};

export default function Home(props) {
  return (
    <PageWrapper data={props.data}>
      <div class="border-solid border-4 border-blue p-2">
        <h1 class="text-red text-4xl">
          404 <span class="text-orange text-2xl">Not Found</span>
        </h1>
        <p class="text-yellow">That's an error, Whoops!</p>
      </div>
    </PageWrapper>
  );
}
