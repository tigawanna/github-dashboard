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
  const [selectedAction,setSelectedAction]=useState<"delete"|"fork">("delete")
  const [openFork, setOpenFork] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit min-w-64">
        <DropdownMenuLabel className="text-xl font-bold">Actionssss</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* {CAN_DELETE && (
            <DropdownMenuItem className="gap-2">
              <Trash className="w-4 h-4" /> Delete
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          )} */}

          <DeleteRepository
            open={openDelete}
            setOpen={setOpenDelete}
            setSelected={() => {}}
            selected={[{ id, name: nameWithOwner.split("/")[1], nameWithOwner }]}
            canDelete={CAN_DELETE}
          />

          <ForkRepository
            open={openFork}
            setOpen={setOpenFork}
            setSelected={() => {}}
            selected={[{ id, name: nameWithOwner.split("/")[1], nameWithOwner }]}
            canFork={CAN_FORK}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
