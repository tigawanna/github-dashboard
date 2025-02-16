import { createFileRoute, useRouteContext } from "@tanstack/react-router";

import { RelayEnvironmentProvider } from "react-relay";
import { createRelayEnvironment } from "@/lib/relay/RelayEnvironment";
import { ReposPage } from "./-components/ReposPage";

export const Route = createFileRoute("/repos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Repos</h1>
      <ReposPage />
    </div>
  );
}
