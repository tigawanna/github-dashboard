import { Button } from "@/components/shadcn/ui/button";
import { verifyGithubPAT } from "@/lib/viewer/use-viewer";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useState } from "react";

interface PATInputProps {}

export function PATInput({}: PATInputProps) {
  const [pat, setPat] = useState<string>("");
  const [error, setError] = useState(false);
  const router = useRouter({});
  const { returnTo } = useSearch({
    from: "/auth/",
  });
  const mutation = useMutation({
    mutationFn: async (input: string) => {
      const isvalide = await verifyGithubPAT(input);
      return isvalide;
    },
    meta: {
      invalidates: ["viewer"],
    },
    onSuccess(data) {
      if (!data) {
        setError(true);
      } else {
        router.invalidate()
        router.navigate({ to: returnTo });
      }
    },
    onError(error) {
      setError(true);
    },
  });
  const isdisabled = mutation.isPending || pat.length < 5;

  return (
    <div className="w-full p-2 flex flex-col  items-center gap-2 justify-center">
      <div className=" flex w-[90%] md:w-[70%] lg:w-[50%]  items-end gap-4 ">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="pat" className="sm">
            Personal Access Token
          </label>
          <input
            key={error ? "error" : "success"}
            data-invalid={error}
            id="pat"
            placeholder="enter a personal access token"
            className="input border bg-base-200 border-base-300 data-[invalid=true]:border-error w-full"
            value={pat}
            onChange={(e) => {
              setError(false);
              setPat(e.target.value);
            }}
          />
        </div>
        <Button disabled={isdisabled} type="button" onClick={() => mutation.mutate(pat)}>
          Submit
          {mutation.isPending && <Loader className="animate-spin" />}
        </Button>
      </div>
      {error && <p className="text-sm text-error">Invalid Personal Access Token</p>}
    </div>
  );
}
