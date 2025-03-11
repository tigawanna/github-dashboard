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
        <p className="text-2xl font-bold">{error.name}</p>
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
    <div className="flex h-full min-h-screen bg-base-300 w-full flex-col lg:flex-row gap-5 items-center p-4">
      {/* <div className="bg-base-300 justify-center items-center flex  w-full h-full gap-5 min-h-[50vh]"> */}
      <Frown className="min-h-[20vh] w-[30%] h-[40%]  text-muted-foreground" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold">Oops! Something went wrong</h1>
          <p className="text-lg text-muted-foreground">
            We're sorry, but we encountered an unexpected error.
          </p>
          <p className=" text-muted-foreground">
            Our team has been notified and is working on a fix.
          </p>
        </div>
        {import.meta.env.DEV && <RouterjustErrorComponent error={error} />}
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
      {/* </div> */}
    </div>
  );
}
