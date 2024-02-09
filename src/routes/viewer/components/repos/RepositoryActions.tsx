import { Star, GitFork, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { LocalViewer } from "@/lib/graphql/relay/RelayEnvironment";


interface RepositoryActionsProps {
  local_viewer: LocalViewer | null;
  viewerCanAdminister: boolean;
  viewerHasStarred: boolean;
  owner: string;
  forkingAllowed: boolean;
  isFork: boolean;
}

export function RepositoryActions({
  local_viewer,
  forkingAllowed,
  isFork,
  owner,
  viewerCanAdminister,
  viewerHasStarred,
}: RepositoryActionsProps) {
  const CAN_STAR = local_viewer?.login !== owner && !viewerHasStarred;
  const CAN_FORK = local_viewer?.login !== owner && forkingAllowed;
  const CAN_DELETE = local_viewer?.login === owner && viewerCanAdminister;

  if(!CAN_STAR && !CAN_FORK && !CAN_DELETE) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {CAN_STAR && (
            <div className="flex gap-2">
              <Star className="w-4 h-4" /> Star
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </div>
          )}

          {CAN_DELETE && (
            <DropdownMenuItem className="gap-2">
              <Trash className="w-4 h-4" /> Delete
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
