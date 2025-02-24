import { Button } from "@/components/shadcn/ui/button";
import { useViewer } from "./use-viewer";
import { Loader, LogOut } from "lucide-react";


interface LogoutButtonProps {}

export function LogoutButton({}: LogoutButtonProps) {
  const { logoutMutation, viewer } = useViewer();

  if (!viewer) {
    return null;
  }
  return (
    <Button
      className="w-full"
      variant="outline"
      disabled={logoutMutation.isPending}
      onClick={() => {
        logoutMutation.mutate()
        }}>
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
      {logoutMutation.isPending && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
}
