import { GitHub, OAuth2RequestError } from "arctic";
import { PageProps, Redirect, usePageContext, useSSQ } from "rakkasjs";
export default function GithubAuthPage({ url }: PageProps) {
  const { queryClient: qc } = usePageContext();
  const query = useSSQ(async (ctx) => {
    const code = ctx.url.searchParams.get("code");
    const state = ctx.url.searchParams.get("state");
    const storedState = ctx.cookie?.["gh_token"] ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      return { data: null, error: "no code" };
    }
    try {
        const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
        if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
          throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not found");
        }
      const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
      const tokens = await github.validateAuthorizationCode(code);
      const redirect_to = ctx.cookie?.["redirect_to"];
    return { data: tokens, redirect_to, error: null };
    } catch (e) {
      // the specific error message depends on the provider
      if (e instanceof OAuth2RequestError) {
        console.log(" ===== OAuth2RequestError Error instance   ===", e);
     return { data: null, error: "invalid code" };
      }
      console.log(" Authing error instance   ===", e);
      return { data: null, error: "Authing error" };
    }
  });
  if (query.data.redirect_to) {
    const token = query?.data?.data?.accessToken;
    qc.setQueryData("gh_token", query.data.data.accessToken);
    if (window && document) {
      document.cookie = `gh_token=${token};path=/;`;
      // qc.setQueryData("gh_pat_cookie", token);
      window.location.reload();
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
