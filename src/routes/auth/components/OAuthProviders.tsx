import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { hotToast } from "@/components/wrappers/toast";
import { oneClickOauthLogin } from "@/lib/pb/client";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Loader } from "lucide-react";
import {
  useLocation,
  useMutation,
  usePageContext,
  useQueryClient,
} from "rakkasjs";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const githubScopes = ["user","repo", "delete_repo"];
  const [selectedScopes, setScopes] = useState(githubScopes.slice(0, 2));
  const { locals } = usePageContext();
  const qc = useQueryClient();

  
  const mutation = useMutation(
    () => {
      return tryCatchWrapper(
        oneClickOauthLogin(locals.pb, {
          provider: "github",
          scopes: selectedScopes,
        }),
      );
    },
    {
      onSuccess(data) {
        if (data && data?.data) {
          hotToast({
            title: "Welcome " + data?.data?.username,
            type: "success",
          });
          qc.invalidateQueries(["viewer"]);
          window.location.reload()
          // const navigate_to = current.searchParams.get("return_to");
          // navigate(navigate_to ?? "/");
        }
        if (data.error) {
          // toast(data.error.message, { type: "error", autoClose: false });
          hotToast({
            title: "Something went wrong",
            description: data?.error?.message,
            type: "error",
          });
        }
      },
    },
  );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div className="alert text-sm">
        This action will use the Github OAuth flow to get an accessToken to make
        requests to the Github API. Kindly pick some scopes
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4">
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
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <Button
          onClick={() => mutation.mutate()}
          disabled={mutation.isLoading}
          className=" btn-wide text-lg flex gap-4"
        >
          <FaGithub />
          Github
          {mutation.isLoading && <Loader className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
