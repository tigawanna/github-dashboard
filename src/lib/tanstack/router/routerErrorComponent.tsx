import { Button } from "@/components/shadcn/ui/button";
import { Link } from "@tanstack/react-router";
import { Frown } from "lucide-react";

interface RouterErrorComponentProps {
  error: Error;
}

export function RouterjustErrorComponent({ error }: RouterErrorComponentProps) {
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center">
      <div className="rounded-xl border border-error bg-error/20 p-5 w-full h-full">
        <p className="">{error.name}</p>
        <p className="text-sm">{error.message}</p>
      </div>
    </div>
  );
}

interface UserFriendlyErrorProps {
  error: Error;
}

export function RouterErrorComponent({ error }: UserFriendlyErrorProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="rounded-xl border border-muted p-8 shadow-lg">
        <div className="flex flex-col items-center gap-4 text-center">
          <Frown className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
          <p className="text-lg text-muted-foreground">
            We're sorry, but we encountered an unexpected error.
          </p>
          <p className="text-sm text-muted-foreground">
            Our team has been notified and is working on a fix.
          </p>
          {import.meta.env.DEV&&(
            <RouterjustErrorComponent error={error} />
          )}
          <div className="mt-4 flex gap-4">
            <Button asChild>
              <Link to="/">Go to Homepage</Link>
            </Button>
            <Button asChild>
              <Link to="..">Go to Back</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
