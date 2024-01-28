import { RequestContext } from "rakkasjs";
import { json } from "@hattip/response";
import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";
export async function get(ctx: RequestContext) {
  try {
    const gh_pat_cookie = ctx.cookie?.gh_pat_cookie;
    if (!gh_pat_cookie) throw new Error("No github token");
    if (!testGithubToken(gh_pat_cookie)) {
      ctx.deleteCookie("gh_pat_cookie");
      throw new Error("Github token is not valid");
    }
    return json({ data: "ok" });
  } catch (error: any) {
    return json(
      { error: error.message },
      {
        status: 401,
        headers: { "content-type": "application/json", redirect: "/auth" },
      },
    );
  }
}
