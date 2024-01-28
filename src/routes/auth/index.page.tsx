import { PageProps, Redirect, usePageContext, useSSQ } from "rakkasjs";
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
  const page_ctx = usePageContext();
  const [token, setToken] = useState("");
  const query = useSSQ(async (ctx) => {
    try {
      const gh_pat_cookie = ctx.cookie?.gh_pat_cookie;
      if (!gh_pat_cookie) {
        return { viewer: null, error: "no github token" };
      }
      const viewer = await testGithubToken(gh_pat_cookie);
      console.log("viewer ==== ", viewer?.data.viewer);
      if (!viewer) {
        return { viewer: null, error: "invalid github token" };
      }

      return { viewer, error: null };
    } catch (error: any) {
      return { viewer: null, error: error.message };
    }
  });

  const mutation = useMutation(async() => {
    try {
      // await new Promise<void>((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000);
      // })
      if (window) {
        const valid_token = await testGithubToken(token);
        if (!valid_token) {
          throw new Error("invalid github token");
        }
        qc.setQueryData("gh_pat_cookie", token);
        document.cookie = `gh_pat_cookie=${token};path=/;`;
        window.location.reload();
      }
    } catch (error) {
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
    const redirect_search_param = page_ctx.url.searchParams.get("redirect");
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
              <div className="w-full  flex flex-col md:flex-row  gap-2">
                <Input
                  id="gh_pat_cookie"
                  name="gh_pat_cookie"
                  required
                  minLength={20}
                  value={token}
                  onChange={handleChange}
                />
                <Button type="submit" disabled={mutation.isLoading} className="flex gap-2 items-center justify-center">
                  {" "}
                  Connect{" "}
                  {mutation.isLoading && <Loader className="animate-spin w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button
            onClick={() => mutation.mutate(input)}
            disabled={mutation.isLoading}
          >
            Connect {mutation.isLoading && <Loader className="animate-spin" />}
          </Button> */}
            {/* {!(formActionData?.error == null) && (
              <p className="text-error p-2 rounded-xl">
                {formActionData.error}
              </p>
            )} */}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

// export async function action(
//   ctx: ActionContext,
// ): Promise<ActionResult<ActionResultData>> {
//   const formData = await ctx.requestContext.request.formData();
//   const gh_token = formData.get("gh_pat_cookie") as string | null;
//   // console.log("============ gh_pat_token ========= ", gh_token);
//   if (gh_token == null || gh_token?.slice(0, 4) !== "ghp_") {
//     // console.log(
//     //   " ============== gh_pat_token cant be null or incorrect format========= ",
//     //   gh_token,
//     // );
//     return {
//       data: {
//         error: "Github access token cannot be empty or in invalid format",
//         data: {
//           gh_pat_cookie: gh_token as string,
//         },
//       },
//     };
//   }

//   const valid_token = await testGithubToken(gh_token);
//   if (valid_token) {
//     // console.log(" ============== gh_pat_token is valide ========= ", gh_token);
//     const redirect_search_param = ctx.url.searchParams.get("redirect");
//     const redirect_to = redirect_search_param ?? "/";
//     // ctx.queryClient.setQueryData("gh_pat_cookie", gh_token);
//     // console.log(" ======  ctx.queryClient.getQueryData(gh_pat_cookie) ======",ctx.queryClient.getQueryData("gh_pat_cookie"))
//     return {
//       redirect:redirect_to.toString(),
//       headers: {
//         "Set-Cookie": `gh_pat_cookie=${gh_token}`,
//       },
//     };
//   }
//   // console.log(
//   //   " ============== gh_pat_token cant be invalide ========= ",
//   //   gh_token,
//   // );
//   return {
//     data: {
//       error: "Invalid github personal access token",
//       data: {
//         gh_pat_cookie: gh_token as string,
//       },
//     },
//   };
// }
