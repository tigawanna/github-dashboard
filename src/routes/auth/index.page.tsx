import { PageProps, Redirect, useLocation, usePageContext, useSSM, useSSQ } from "rakkasjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { useMutation, useQueryClient } from "rakkasjs";
import { useState } from "react";
import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";
import { hotToast } from "@/components/wrappers/toast";
import { GithubLoginButton } from "./components/GithubLoginButton";

interface ActionResultData {
  data: {
    gh_pat_cookie: string;
  };
  error?: string;
  success?: string;
}
export default function LoginPage({ actionData }: PageProps) {
  // const formActionData = actionData as ActionResultData;
  const qc = useQueryClient();
  const { current } = useLocation();
  const [token, setToken] = useState("");
  const query = useSSQ(async (ctx) => {
    try {
      const gh_pat_cookie = ctx.cookie?.gh_pat_cookie;
      if (!gh_pat_cookie) {
        return { viewer: null, error: "no github token" };
      }
      const viewer = await testGithubToken(gh_pat_cookie);
      if (!viewer) {
        return { viewer: null, error: "invalid github token" };
      }
      return { viewer, error: null };
    } catch (error: any) {
      return { viewer: null, error: error.message };
    }
  });

  const mutation = useMutation(async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 100);
      })
      const valid_token = await testGithubToken(token);
      // console.log("===valid token  ==== ", valid_token);
      if (!valid_token) {
        throw new Error("invalid github token");
      }
      if (window) {
        qc.setQueryData("gh_token", token);
        document.cookie = `gh_token=${token};path=/;`;
        window.location.reload();
      }
    } catch (error:any) {
      hotToast({
        title: "failed",
        description: error.message,
        type: "error",
      })
      return;
    }
  });



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate();
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  }

  if (query.data.viewer?.data?.viewer) {
    const redirect_search_param = current.searchParams.get("return_to");
    const redirect_to = redirect_search_param ?? "/";
    return <Redirect href={redirect_to.toString()} />;
  }

  return (
    <div className="w-full flex items-center justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="w-[95%] md:w-[60%] h-full flex items-center justify-center"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add token</CardTitle>
            <CardDescription>A Github access token is required</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="gh_pat_cookie">Github PAT</Label>
              <div className="w-full  flex flex-col md:flex-row  gap-4">
                <Input
                  id="gh_pat_cookie"
                  name="gh_pat_cookie"
                  required
                  minLength={20}
                  value={token}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="flex gap-2 items-center justify-center hover:brightness-75"
                >
                  {" "}
                  Connect{" "}
                  {mutation.isLoading && (
                    <Loader className="animate-spin w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center flex-col gap-3">
            <div className="w-full flex items-center justify-center">
              <span className="w-full border-t border-accent" />
              <span className="px-2  min-w-fit">Or continue with Github</span>
              <span className="w-full border-t border-accent" />
            </div>
            <GithubLoginButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

