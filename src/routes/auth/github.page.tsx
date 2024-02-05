import { setClientGHPATCookie } from "@/lib/cookies.client";
import { GitHub, OAuth2RequestError } from "arctic";
import { parse } from "cookie-es";
import { Link, PageProps, Redirect, usePageContext, useSSQ } from "rakkasjs";
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

  if (query.data?.data) {
    const token = query.data.data.accessToken;
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      qc.setQueryData("gh_token", token);
      document.cookie = `gh_token=${token}; max-age=31536000; path=/;`;
      // setClientGHPATCookie("gh_token",token);
      const return_to = parse(document?.cookie)?.return_to ?? "/";
      return <Redirect href={return_to} />;
    }
  }

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {query.data?.data && (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          {/* GitHub access token
          {query.data.data?.accessToken} */}
          <h2 className="text-lg font-bold">Success</h2>
          <Link href={parse(document?.cookie)?.return_to ?? "/"}>
            Resume using
          </Link>
        </div>
      )}
      {query.data?.error && (
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          {JSON.stringify(query?.data?.error)}
        </div>
      )}
    </div>
  );
}
