import { Button } from "@/components/shadcn/ui/button";
import { returnTo } from "@/lib/tanstack/router/utils";
import { useViewer } from "@/lib/viewer/use-viewer";
import { Navigate, useLocation, useNavigate } from "@tanstack/react-router";
import { Redo2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";


interface GetBetterTokenScopesProps {
    dismiss:()=>void
}

export function GetBetterTokenScopes({dismiss}: GetBetterTokenScopesProps) {
  const { logoutMutation } = useViewer();
  const navi = useNavigate();
  const location = useLocation();
  return (
    <Card className="bg-base-300">
      <CardHeader>
        <CardTitle >Insufficient token scopes</CardTitle>
        <CardDescription>
          This probably means you need to login again with user, repo and delete repo scopes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-10">
        <Button variant={"destructive"} onClick={dismiss}>Dismiss</Button>
        <Button
          onClick={() => {
            logoutMutation.mutate();
            navi({ to: "/auth", search: { returnTo: returnTo(location) } });
          }}>
          Login again
          <Redo2 />
        </Button>
      </CardContent>
    </Card>
  );
}

    // <div className="flex flex-col bg-base-200 items-center justify-center">
    //   <h1 className="text-xl font-bold">You need better token scopes</h1>
    //   <p className="text-base text-center">
    //     This probably means you need to login again with user, repo and delete repo scopes
    //   </p>
    //   <Button
    //     onClick={() => {
    //       logoutMutation.mutate();
    //       navi({ to: "/auth", search: { returnTo: returnTo(location) } });
    //     }}>
    //     Login again
    //     <Redo2 />
    //   </Button>
    // </div>;
