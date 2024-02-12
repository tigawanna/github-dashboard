import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,

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
import {  useRelayEnvironment } from "@/lib/relay/modules";
interface RepoCardDeleteProps {
  open: boolean;
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
  const enviroment = useRelayEnvironment();

  const mutation = useMutation(() => deleteRepositories(selected, token), {
    onSuccess: (data) => {
      // console.log("succesfully deleted repos", data);
      setSelected(null);
      (data.successfull.length>0)&&
        data.successfull?.forEach((item) => {
          enviroment.applyUpdate({
            storeUpdater: (store) => {
              store.delete(item.id);
            },
          });
        });
      hotToast({
        title: "Done",
        mixed: {
          successfull: 
          `${data?.successfull?.length} Successfull deletes : \n ${data?.successfull.map((item)=>item.name + "\n").join(", \n")}`,
          failed: `${data?.failed?.length} Failed deletes:\n ${data?.failed.map((item) => item.repo + " : " + item.issue + "\n").join(", ")}`,
        },
        type: "mixed",
        duration: 7000,
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
        <Trash className="h-6 w-6 text-red-700 hover:fill-red-700 " />
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
          <AlertDialogAction
            className="bg-error/50"
            onClick={() => mutation.mutate()}
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
