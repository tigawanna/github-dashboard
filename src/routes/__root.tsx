import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
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
import { returnTo } from "@/lib/tanstack/router/utils";

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
  validateSearch: (search) => searchparams.parse(search),
  component: RootComponent,
  beforeLoad: async (ctx) => {
    // const isPATvalid = await fetchCurrentViewer(ctx.context.PAT!);
    // console.log("isPATvalid === ", isPATvalid);
    // if(!isPATvalid){
    //   throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
    // }
    const viewer = await ctx.context.queryClient.ensureQueryData(
      viewerQueryOptions(ctx.context.PAT!)
    );
    if (!viewer) {
      ctx.context.PAT = undefined;
      ctx.context.viewer = undefined;
      throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
      return {
        ...ctx.context,
        PAT: undefined,
        viewer: undefined,
      };
    }
    // ctx.context.viewer = viewer;
    return {
      ...ctx.context,
      viewer,
    };
  },
});
