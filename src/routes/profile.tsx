import { createFileRoute, redirect } from "@tanstack/react-router";
import { ResponsiveGenericToolbar } from "./-components/ResponsiveGenericToolbar";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad(ctx) {
    throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  return (
    <ResponsiveGenericToolbar>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
          <h3 className="text-5xl font-bold">Welcome To Profile Page</h3>
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
