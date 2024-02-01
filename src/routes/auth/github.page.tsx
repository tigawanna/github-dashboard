import { deletePGCookie, setPGCookie } from "@/lib/pg/pg";
import { GitHub, OAuth2RequestError } from "arctic";
import { PageProps, Redirect, usePageContext, useSSQ } from "rakkasjs";
export default function GithubAuthPage({ url }: PageProps) {
  const { queryClient: qc } = usePageContext();
  const query = useSSQ(async (ctx) => {
    const code = ctx.url.searchParams.get("code");
    const state = ctx.url.searchParams.get("state");
    const storedState = ctx.cookie?.["github_oauth_state"] ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      return { data: null, error: "no code" };
    }
    try {
      const client = import.meta.env.GH_CLIENT;
      const secret = import.meta.env.GH_SECRET;
      console.log({ client, secret });
      const github = new GitHub(client, secret);

      const tokens = await github.validateAuthorizationCode(code);
      const redirect_to = ctx.cookie?.["redirect_to"];
      // const github_cookie = ctx.cookie?.["gh_pat_cookie"];
      // if(!(github_cookie == null)){
      //   deletePGCookie(ctx)
      // }
      // ctx.setCookie("gh_pat_cookie", tokens.accessToken, {
      //   path: "/",
      //   secure: import.meta.env.PROD,

      //   maxAge: 60 * 10,

      // });
      // setPGCookie(ctx,tokens.accessToken);
      // console.log("==== cookie set ====", ctx.cookie);
      console.log(" ====== token ===  ", tokens);
      return { data: tokens, redirect_to, error: null };
    } catch (e) {
      // the specific error message depends on the provider
      if (e instanceof OAuth2RequestError) {
        console.log("  OAuth2RequestError Error instance   ===", e);
        // invalid code
        return { data: null, error: "invalid code" };
      }
      console.log(" Authing error instance   ===", e);
      return { data: null, error: "Authing error" };
    }
  });
  if (query.data.redirect_to) {
    const token = query?.data?.data?.accessToken;
    qc.setQueryData("gh_pat_cookie", query.data.data.accessToken);
    if (window) {
      qc.setQueryData("gh_pat_cookie", token);
      document.cookie = `gh_pat_cookie=${token};path=/;`;
      // window.location.reload();
    }
    return <Redirect href={query.data.redirect_to} />;
  }
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {query.data?.data && (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          GitHub access token
          {query.data.data?.accessToken}
        </div>
      )}
      {query.data?.error && (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          {query.data.error}
        </div>
      )}
    </div>
  );
}
