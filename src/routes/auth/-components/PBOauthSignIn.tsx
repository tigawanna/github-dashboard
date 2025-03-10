import { oneClickOauthLogin, pb } from "@/lib/pb/client";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {  useRouter, useSearch } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/shadcn/ui/accordion";

interface PBOauthSignInProps {}

export function PBOauthSignIn({}: PBOauthSignInProps) {
  const router = useRouter({});
  const { returnTo } = useSearch({
    from: "/auth/",
  });
  const query = useSuspenseQuery({
    queryKey: ["pb-health"],
    queryFn: async () => {
      try {
        return pb.health.check();
      } catch (error) {
        return null;
      }
    },
  });
  const mutation = useMutation({
    mutationFn: async (scopes: string[]) => {
      return tryCatchWrapper(
        oneClickOauthLogin(pb, {
          provider: "github",
          scopes: scopes,
        })
      );
    },
    meta:{
      invalidates:["viewer","pat"]
    },
    onSuccess(data, variables, context) {
      if (data.data) {
         router.invalidate();
         router.navigate({ to: returnTo });
      }
    },
  });

  const [selectedScopes, setSelectedScopes] = useState<string[]>(["user", "repo"]);

  const scopeOptions = [
    {
      id: "user",
      label: "User Profile",
      description: "Read/Write access to profile info",
    },
    {
      id: "repo",
      label: "Repository Access",
      description: "Full control of public and private repositories",
    },
    {
      id: "delete_repo",
      label: "Delete Repositories",
      description: "Ability to delete repositories",
    },
  ];

  const handleScopeToggle = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const isHealthy = query.data;

  if (!isHealthy) {
    return (
      <div className="flex flex-col w-full items-center justify-center cursor-not-allowed">
        <button
          disabled={true}
          className="btn btn-wide btn-accent w-full"
          onClick={() => {
            mutation.mutate(selectedScopes);
          }}>
          <FaGithub className="h-5 w-5" />
          Sign in with GitHub
          {mutation.isPending && <Loader className="animate-spin h-5 w-5" />}
        </button>
        <div className="w-[60%]   flex flex-col items-center justify-center">
          <div className="divider ">OR</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col  justify-center  p-1 items-center gap-5">
      <div className="w-[90%] md:w-[70%] lg:w-[50%] rounded-2xl flex flex-col border justify-center  p-5 items-center gap-5">
        <h1 className="text-2xl font-bold">Sign in with GitHub</h1>

        <div className="w-full flex flex-col justify-center  space-y-1">
          <h3 className="font-bold">GitHub Scopes</h3>
          <ul className="list-disc list-inside brightness-75">
            <li>Delete scope is required to delete repositories</li>
            <li>Disabling all scopes might lead to unexpected behavior</li>
          </ul>
        </div>
        {/* <Accordion type="single"  collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Adjust token scopes</AccordionTrigger>
            <AccordionContent className="w-full">
              <div className=" w-full flex flex-col justify-center items-center gap-2">
                {scopeOptions.map((scope) => (
                  <label
                    key={scope.id}
                    className="flex w-full bg-primary/10 items-start space-x-3 p-1 rounded-lg hover:bg-base-300 transition-colors">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent mt-1 border border-accent"
                      checked={selectedScopes.includes(scope.id)}
                      onChange={() => handleScopeToggle(scope.id)}
                    />
                    <div className="flex w-full flex-col">
                      <span className="font-medium text-sm">{scope.label}</span>
                      <span className="text-sm text-base-content/70">{scope.description}</span>
                    </div>
                  </label>
                ))}
                {selectedScopes.length === 0 && (
                  <div role="alert" className="alert alert-info alert-outline">
                    <span className="text-xs text-center">
                      if no scopes are selected, the default read-only access to public information
                      will be used
                    </span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
        <div className=" w-full flex flex-col justify-center items-center gap-2">
          {scopeOptions.map((scope) => (
            <label
              key={scope.id}
              className="flex w-full bg-primary/10 items-start space-x-3 p-1 rounded-lg hover:bg-base-300 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-accent mt-1 border border-accent"
                checked={selectedScopes.includes(scope.id)}
                onChange={() => handleScopeToggle(scope.id)}
              />
              <div className="flex w-full flex-col">
                <span className="font-medium text-sm">{scope.label}</span>
                <span className="text-sm text-base-content/70">{scope.description}</span>
              </div>
            </label>
          ))}
          {selectedScopes.length === 0 && (
            <div role="alert" className="alert alert-info alert-outline">
              <span className="text-xs text-center">
                if no scopes are selected, the default read-only access to public information will
                be used
              </span>
            </div>
          )}
        </div>
        <button
          disabled={mutation.isPending}
          className="btn btn-wide btn-primary btn-outline w-full"
          onClick={() => {
            mutation.mutate(selectedScopes);
          }}>
          <FaGithub className="h-5 w-5" />
          Sign in with GitHub
          {mutation.isPending && <Loader className="animate-spin h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
