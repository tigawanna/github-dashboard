import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/ui/alert-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

import { GitHub, generateState } from "arctic";
import { Loader } from "lucide-react";
import { Redirect, useSSM } from "rakkasjs";
import { FiGithub } from "react-icons/fi";
import { useState } from "react";
import { setGHPATCookie } from "@/lib/cookie";

interface GithubLoginProps {}

export function GithubLoginButton({}: GithubLoginProps) {
  const githubScopes = [
    "user",
    "user:email",
    "user:follow",
    "repo",
    "repo:status",
    "public_repo",
    "delete_repo",
  ];
  const [selectedScopes, setScopes] = useState(githubScopes.slice(0, 4));

  const github_auth_mutation = useSSM(
    async (ctx, { scopes }: { scopes: string[] }) => {
      try {
        const client = import.meta.env.RAKKAS_GH_CLIENT;
        const secret = import.meta.env.RAKKAS_GH_SECRET;
        console.log("====== client,secret inside GithubButton useSSm", {
          client,
          secret,
        });
        const state = generateState();
        const github = new GitHub(client, secret);
        const url: URL = await github.createAuthorizationURL(state, {
          // optional
          //   scopes,
          scopes,
        });
        console.log("url ==== ", url);
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
        console.log(
          "return_search_param in oauth  === ",
          return_to_search_param,
        );
        const return_to = return_to_search_param ?? "/";
        console.log("return_to in auth layout  === ", return_to);
        ctx.setCookie("return_to", return_to, {
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: false,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return { data: url.toString(), error: null };
      } catch (error: any) {
        console.log("Error authing  ===", error);
        return { data: null, error: error.message };
      }
    },
  );

  if (github_auth_mutation.data?.data) {
    return <Redirect href={github_auth_mutation.data.data.toString()} />;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 justify-center items-center hover:brightness-75">
          <FiGithub className="h-6 w-6" />
          Login with Github
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>login with Github</AlertDialogTitle>
          <AlertDialogDescription>
            This action will use the Github OAuth flow to get an accessToken to
            make requests to the Github API. Kindly pick some scopes
          </AlertDialogDescription>
          <div className="w-full flex flex-wrap gap-2">
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
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
        <Button
          className="flex gap-2 justify-center items-center hover:brightness-75"
          onClick={() =>
            github_auth_mutation.mutate({ scopes: selectedScopes })
          }
        >
          Login
          {github_auth_mutation.isLoading && (
            <Loader className="animate-spin" />
          )}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
