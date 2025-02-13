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
import { ItemList } from "../types";
import { useRelayEnvironment } from "react-relay";
import { useRouteContext } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { deleteRepositories } from "../extra-mutations/repo_mutations";
import { makeHotToast } from "@/components/toasters";

interface DeleteRepositoryProps {
  open: boolean;
  selected: ItemList[];
  setSelected: (selected: ItemList[] | null) => void;
  setOpen: (open: boolean) => void;
}

export function DeleteRepository({ open, selected, setOpen, setSelected }: DeleteRepositoryProps) {
  const { PAT } = useRouteContext({ from: "/$user/repositories/" });
  const token = PAT ?? "";
  const enviroment = useRelayEnvironment();

  const mutation = useMutation({
    mutationFn: () => deleteRepositories(selected, token),
    onSuccess: (data) => {
      // console.log("succesfully deleted repos", data);
      setSelected(null);
      data.successfull.length > 0 &&
        data.successfull?.forEach((item) => {
          enviroment.applyUpdate({
            storeUpdater: (store) => {
              store.delete(item.id);
            },
          });
        });
        makeHotToast({
          title: "Done",
          mixed: {
            successfull: `${data?.successfull?.length} Successfull deletes : \n ${data?.successfull
              .map((item) => item.name + "\n")
              .join(", \n")}`,
            failed: `${data?.failed?.length} Failed deletes:\n ${data?.failed
              .map((item) => item.repo + " : " + item.issue + "\n")
              .join(", ")}`,
          },
          variant: "mixed",
          duration: 7000,
        });


      setOpen(false);
    },
    onError(error: any) {
      makeHotToast({
        title: "Error",
        description: "Issue deleting repositories \n" + error.message,
        variant: "error",
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="w-full flex gap-2 items-center bg-base-300 rounded-lg">
          <Trash className="h-6 w-6 text-red-700 hover:fill-red-700 " />
          <div className="">delete</div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete?</AlertDialogTitle>
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
          <AlertDialogAction className="bg-error/50" onClick={() => mutation.mutate()}>
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
