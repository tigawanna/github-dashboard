import { setGHPATCookie } from "@/lib/cookie";
import { GitHub, OAuth2RequestError } from "arctic";
import { parse } from "cookie-es";
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
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
      if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not found");
      }
      const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
      const tokens = await github.validateAuthorizationCode(code);
      // setGHPATCookie(ctx,tokens.accessToken)
      return { data: tokens, error: null };
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
  if (query.data.data) {
    const token = query.data.data.accessToken;
    // console.log(" ==== query.data.data in github.page ==== ", token);
    // qc.setQueryData("gh_token",token);
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      qc.setQueryData("gh_token", token);
      document.cookie = `gh_token=${token};path=/;`;
      const return_to = parse(document.cookie)?.return_to ?? "/";
      // console.log("===== return to to in github.page.tsx ======", return_to);
      return <Redirect href={return_to} />;
    }
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
