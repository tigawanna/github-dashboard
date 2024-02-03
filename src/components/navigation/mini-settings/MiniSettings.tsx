import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  Redirect,
  usePageContext,
  useQueryClient,
  useMutation,
  useSSQ,
  useLocation,
} from "rakkasjs";
import { Loader } from "lucide-react";
import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";

interface MiniSettingsModalProps {}

export function MiniSettingsModal({}: MiniSettingsModalProps) {
  const qc = useQueryClient();
  const { current } = useLocation();
  const query = useSSQ(async (ctx) => {
    try {
      const gh_pat_cookie = ctx.cookie?.gh_pat_cookie;
      if (!gh_pat_cookie) {
        return { viewer: null, error: "no github token" };
      }
      const viewer = await testGithubToken(gh_pat_cookie);
      // console.log("viewer ==== ",viewer?.data.viewer)
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
      if (window) {
        document.cookie = `gh_token;`;
        window.location.reload();
      }
      return { success: true, error: null };
    } catch (error: any) {
      // console.log("======== error loggin out of db ======= ", error);
      return { success: false, error: error.message };
    }
  });
  const viewer = query.data?.viewer?.data?.viewer;

  console.log(" ====  logging out with url  ===== ", current.pathname);
  if (mutation.data?.success) {
    qc.invalidateQueries("gh_token");
    const new_url = new URL(current);
    new_url.pathname = "/auth";
    new_url.searchParams.set("return_to", current.pathname);
    return <Redirect href={new_url.toString()} />;
  }

  if (!viewer) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-7 w-7 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={viewer?.avatarUrl} alt="github viewer" />
            <AvatarFallback>{viewer?.login?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel className="font-bold text-xl">
          Viewer
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1 p-3">
          <div className="flex flex-col gap-1 p-3">
            <div>@{viewer?.login}</div>
            <div>{viewer?.name}</div>
            <div>{viewer?.email}</div>
          </div>

          <Button
            type="button"
            onClick={() => mutation.mutateAsync()}
            disabled={mutation.isLoading}
            variant={"outline"}
            className="flex justify-center items-center gap-2"
          >
            Logout{" "}
            {mutation.isLoading && <Loader className="w-4 h-4 animate-spin" />}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
