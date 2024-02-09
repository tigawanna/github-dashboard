import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";

import { Trash } from "lucide-react";
import { ItemList } from "./types";
import { useMutation, usePageContext } from "rakkasjs";
import { deleteRepositories } from "./mutations/repo_mutations";
import { hotToast } from "@/components/wrappers/toast";
interface RepoCardDeleteProps {
  open:boolean
  selected: ItemList[];
  setSelected: (selected: ItemList[] | null) => void;
  setOpen: (open: boolean) => void;
}

export function RepoCardDelete({
  open,
  selected,
  setOpen,
  setSelected,
}: RepoCardDeleteProps) {
  const { locals } = usePageContext();
  const token = locals?.pb?.authStore.model?.accessToken;
  const mutation = useMutation(() => deleteRepositories(selected, token), {
    onSuccess: () => {
      //console.log("succesfully deleted repos");
      setSelected(null);
      hotToast({
        title: "Success",
        description: "Deleted successfully",
        type: "success",
      });

      setOpen(false);
    },
    onError(error: any) {
      hotToast({
        title: "Error",
        description: "Issue deleting repositories",
        type: "error",
      });

    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash className="h-5 w-5 text-red-700 hover:fill-red-700 " />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <ul className="flex flex-col w-[90%] ml-4">
              {selected.map((item, idx) => {
                return (
                  <li key={item.id}>
                    {idx + 1}. {item.nameWithOwner}
                  </li>
                );
              })}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
