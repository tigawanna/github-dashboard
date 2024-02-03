import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { GitHub, generateState } from "arctic";
import { Loader } from "lucide-react";
import { Redirect, useSSM } from "rakkasjs";
import { FiGithub } from "react-icons/fi";
import { useState } from "react";


interface GithubLoginProps {}

export function GithubLoginButton({}: GithubLoginProps) {
  const githubScopes = ["user", "delete_repo"];
  const [selectedScopes, setScopes] = useState(githubScopes.slice(0, 4));

  const github_auth_mutation = useSSM(
    async (ctx, { scopes }: { scopes: string[] }) => {
      try {
        const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
        if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
          throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not found");
        }
        const state = generateState();
        const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
        const url: URL = await github.createAuthorizationURL(state, {
          scopes,
        });
        // console.log("url ==== ", url);
        if (!url) {
          return { data: null, error: "no url" };
        }
        ctx.setCookie("github_oauth_state", state, {
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        const return_to_search_param = ctx.url.searchParams.get("return_to");
        const return_to = return_to_search_param ?? "/";
     
        ctx.setCookie("return_to", return_to, {
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: false,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return { data: url.toString(), error: null };
      } catch (error: any) {
        console.log("======  Error authing inside GithubLoginButton  ===", error);
        return { data: null, error: error.message };
      }
    },
  );

  if (github_auth_mutation.data?.data) {
    return <Redirect href={github_auth_mutation.data.data.toString()} />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* <div className="text-2xl p-4 ">login with Github</div> */}
      <div className="alert text-xs">
        This action will use the Github OAuth flow to get an accessToken to make
        requests to the Github API. Kindly pick some scopes
      </div>
      <div className="w-full flex flex-wrap gap-2 p-2 items-center justify-center">
        {githubScopes.map((scope) => (
          <div
            key={scope}
            className="flex gap-2 items-center justify-center bg-base-300 rounded-lg py-1 px-2"
          >
            {scope}
            <Checkbox
              checked={selectedScopes.includes(scope)}
              key={scope}
              onCheckedChange={(checked) => {
                console.log(checked);
                if (checked) {
                  setScopes([...selectedScopes, scope]);
                } else {
                  setScopes(selectedScopes.filter((s) => s !== scope));
                }
              }}
              className="border-accent w-5 h-5"
            />
          </div>
        ))}
      <Button
        onClick={() => github_auth_mutation.mutate({ scopes: selectedScopes })}
        className="flex gap-2 justify-center items-center hover:brightness-75"
      >
        <FiGithub className="h-6 w-6" />
        Login with Github
        {github_auth_mutation.isLoading && <Loader className="animate-spin" />}
      </Button>
      </div>
    </div>
  );
}
