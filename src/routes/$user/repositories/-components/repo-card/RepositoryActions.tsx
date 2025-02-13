import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { DeleteRepository } from "./DeleteRepository";
import { ForkRepository } from "./ForkRepository";
import { GitHubViewer } from "@/lib/viewer/use-viewer";

interface RepositoryActionsProps {
  local_viewer: Partial<GitHubViewer> | null;
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
        <MoreVertical className="" />
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
            <DeleteRepository
              open={open}
              setOpen={setOpen}
              setSelected={() => {}}
              selected={[
                { id, name: nameWithOwner.split("/")[1], nameWithOwner },
              ]}
            />
          )}
          {CAN_FORK && (
            <ForkRepository
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
