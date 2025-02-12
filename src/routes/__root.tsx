import { createRootRouteWithContext } from "@tanstack/react-router";
import "@/view-transition/angled-transition.css";
import "@/view-transition/wipe-transition.css";
import "@/view-transition/slides-transition.css";
import "@/view-transition/flip-transition.css";
import "@/view-transition/vertical-transition.css";
import "../components/pagination/pagination.css";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { RootComponent } from "./-components/RootComponent";
import { z } from "zod";
import { fetchCurrentViewer, viewerQueryOptions } from "@/lib/viewer/use-viewer";

const searchparams = z.object({
  globalPage: z.number().optional(),
  globalSearch: z.string().optional(),
});

// const list = createRouteMask({

// })

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  viewer: Awaited<ReturnType<typeof fetchCurrentViewer> | undefined>;
  PAT?: string;
}>()({
  component: RootComponent,
  validateSearch: (search) => searchparams.parse(search),
  beforeLoad: async (ctx) => {
    const viewer = await ctx.context.queryClient.ensureQueryData(viewerQueryOptions(ctx.context.PAT!));
      if (!viewer) {
        ctx.context.PAT = undefined;
        ctx.context.viewer = undefined;
      }
      // ctx.context.viewer = viewer;
  return {
    ... ctx.context,
    viewer,
  };
  },
});
