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
import { Trash, X } from "lucide-react";
import { ItemList } from "../types";
import { useRelayEnvironment } from "react-relay";
import { useRouteContext } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { deleteRepositories } from "../extra-mutations/repo_mutations";
import { makeHotToast } from "@/components/toasters";
import { FaHatWizard } from "react-icons/fa";


interface DeleteRepositoryProps {
  open: boolean;
  selected: ItemList[];
  setSelected: (selected: ItemList[] | null) => void;
  setOpen: (open: boolean) => void;
  canDelete?: boolean;
}

export function DeleteRepository({ open, selected, setOpen, setSelected,canDelete }: DeleteRepositoryProps) {
  const { PAT } = useRouteContext({ from: "__root__" });
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
      <AlertDialogTrigger asChild disabled={!canDelete}>
        <div  className="flex gap-2 group items-center justify-between p-2 hover:bg-primary/20">
          Delete
          <Trash className="size-5 text-error group-hover:fill-error" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex gap-1">
           <FaHatWizard/> This action will permanently delete the selected repositories:
            {selected.map((item) => item.nameWithOwner).join(", ")}
          </AlertDialogDescription>
          <ul className="list-disc pl-5 mt-2">
            {selected.map((item) => (
              <li key={item.id}>{item.nameWithOwner}</li>
            ))}
          </ul>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel </AlertDialogCancel>
          <AlertDialogAction className="btn btn-error bg-error/23 hover:bg-error/70"    onClick={() => mutation.mutate()}>
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
