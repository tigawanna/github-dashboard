import { Alert } from "@/components/shadcn/ui/alert";
import { ItemList } from "../types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { GitFork, Trash } from "lucide-react";

interface ForkRepositoryProps {
  open: boolean;
  selected: ItemList[];
  setSelected: (selected: ItemList[] | null) => void;
  setOpen: (open: boolean) => void;
  canFork?: boolean;
  selectedAction?: "delete" | "fork";
  setSelectedAction?: React.Dispatch<React.SetStateAction<"delete" | "fork">>;
}


// TODO modifify this to be a fork dialog since it was copied fro m delete dialog

export function ForkRepository({ open, selected, setOpen, setSelected,canFork,selectedAction,setSelectedAction }: ForkRepositoryProps) {
  return (
    <AlertDialog open={open} onOpenChange={(open)=>{
      setOpen(open)
      setSelectedAction?.("fork")
    }}>
      <AlertDialogTrigger asChild disabled={!canFork}>
        <div className="w-full flex gap-2 items-center justify-between p-2 hover:bg-primary/20">
          <div className="">Fork</div>
          <GitFork className="w-4 h-4" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Proceed to fork</AlertDialogTitle>
          <AlertDialogDescription className="">
            Create a fork of the selected repositories
            <div className="sr-only">
            {selected.map(item=>item.nameWithOwner).join(",-> ")}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
          <ul className="flex flex-col w-[90%] ml-4">
            {selected.map((item, idx) => {
              return (
                <li key={item.id}>
                  {idx + 1}. {item.nameWithOwner}
                </li>
              );
            })}
          </ul>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction
          className="bg-error/50"
          onClick={() => mutation.mutate()}
        >
          {mutation.isLoading ? "Deleting..." : "Delete"}
        </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
