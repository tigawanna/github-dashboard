import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { LocalViewer } from "@/lib/relay/RelayEnvironment";
import { RepoCardDelete } from "./RepoCardDelete";
import { useState } from "react";

interface RepositoryActionsProps {
  local_viewer: LocalViewer | null;
  viewerCanAdminister: boolean;
  owner: string;
  forkingAllowed: boolean;
  isFork: boolean;
  id: string;
  nameWithOwner: string;
}

export function RepositoryActions({
  local_viewer,
  forkingAllowed,
  isFork,
  owner,
  viewerCanAdminister,

  id,
  nameWithOwner,
}: RepositoryActionsProps) {
  const CAN_FORK = local_viewer?.login !== owner && forkingAllowed;
  const CAN_DELETE = local_viewer?.login === owner && viewerCanAdminister;

  if (!CAN_FORK && !CAN_DELETE) return null;
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* {CAN_DELETE && (
            <DropdownMenuItem className="gap-2">
              <Trash className="w-4 h-4" /> Delete
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          )} */}
          {CAN_DELETE && (
            <RepoCardDelete
              open={open}
              setOpen={setOpen}
              setSelected={() => {}}
              selected={[
                { id, name: nameWithOwner.split("/")[1], nameWithOwner },
              ]}
            />
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
