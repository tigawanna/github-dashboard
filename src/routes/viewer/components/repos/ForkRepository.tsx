import { useMutation, useQuery } from "rakkasjs";
import { ItemList } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/ui/alert-dialog";
import { GitFork, Trash } from "lucide-react";

interface ForkRepositoryProps {
  open: boolean;
  selected: ItemList[];
  setSelected: (selected: ItemList[] | null) => void;
  setOpen: (open: boolean) => void;
}

export function ForkRepository({open,selected,setOpen,setSelected}:ForkRepositoryProps){
    // useQuery("repositoory",() => {},{});
    // useMutation((async)=>{
    // try {
        
    // } catch (error) {
        
    // }
    // });
return (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger asChild>
      <div className="w-full flex p-2 gap-2 items-center bg-base-300 rounded-lg">
        <GitFork className="w-4 h-4" />
        <div className="">fork</div>
      </div>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you absolutely sure you want to delete?
        </AlertDialogTitle>
        <ul className="flex flex-col w-[90%] ml-4">
          {selected.map((item, idx) => {
            return (
              <li key={item.id}>
                {idx + 1}. {item.nameWithOwner}
              </li>
            );
          })}
        </ul>
      </AlertDialogHeader>
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
