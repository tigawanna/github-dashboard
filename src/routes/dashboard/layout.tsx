import { fetchCurrentViewer } from "@/lib/viewer/use-viewer";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "./-components/dashoboard-sidebar/DashboardLayout";
import { useIsographEnviroment } from "@/lib/isograph/client";
import { IsographEnvironmentProvider } from "@isograph/react";
import { Suspense } from "react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  async loader(ctx) {
    if (!ctx.context.PAT) {
      return;
    }
    const viewer = await fetchCurrentViewer(ctx.context.PAT);
    if (!viewer) {
      ctx.context.PAT = undefined;
      ctx.context.viewer = undefined;
    }
    ctx.context.viewer = viewer;
    return viewer;
  },
  staleTime: 2_000_000,
});

