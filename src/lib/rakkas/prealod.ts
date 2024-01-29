import { PreloadContext } from "rakkasjs";
import { testGithubToken } from "../graphql/relay/RelayEnvironment";

export async function preloadGuards(ctx: PreloadContext, route_name?: string) {
  const gh_pat_cookie = ctx.queryClient.getQueryData("gh_pat_cookie");
  console.log(
    " ==== gh_pat_cookie in " + route_name + " layout preload  ===== ",
    gh_pat_cookie,
  );
  const new_url = new URL(ctx.url);
  new_url.pathname = "/auth";
  new_url.searchParams.set("redirect", ctx.url.pathname + ctx.url.search);
  if (gh_pat_cookie == null) {
    return {
      redirect: {
        href: new_url.toString(),
      },
    };
  }
  const valid_token = await testGithubToken(gh_pat_cookie);
  // console.log(" ==== valid_token in viewer layout preload  ===== ", valid_token);
  if (!valid_token) {
    console.log(" ===== invalide github token ====== ");
    return {
      redirect: {
        href: new_url.toString(),
      },
    };
  }
}
