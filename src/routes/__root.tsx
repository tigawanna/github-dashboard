import { createRootRouteWithContext, redirect } from "@tanstack/react-router";
import "@/view-transition/angled-transition.css";
import "@/view-transition/wipe-transition.css";
import "@/view-transition/slides-transition.css";
import "@/view-transition/flip-transition.css";
import "@/view-transition/vertical-transition.css";
import "../components/pagination/pagination.css";
import "./index.css";
// import "@/routes/$user/repositories/-components/github-rest-api-resources/markdown.css";
import { QueryClient } from "@tanstack/react-query";
import { RootComponent } from "./-components/RootComponent";
import { z } from "zod";
import { fetchCurrentViewer, getPAT, getVerifiedPAT, viewerQueryOptions } from "@/lib/viewer/use-viewer";
import { returnTo } from "@/lib/tanstack/router/utils";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

const searchparams = z.object({
  globalPage: z.number().optional(),
  globalSearch: z.string().optional(),
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  viewer: Awaited<ReturnType<typeof fetchCurrentViewer> | undefined>;
  PAT?: string;
  relayEnviroment?: RelayModernEnvironment;
}>()({
  validateSearch: (search) => searchparams.parse(search),
  component: RootComponent,
  beforeLoad: async (ctx) => {
    const PAT = await getVerifiedPAT()
    if(!PAT){
      ctx.context.PAT = undefined;
      ctx.context.viewer = undefined;
      throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
    }
    const viewer = await ctx.context.queryClient.ensureQueryData(
      viewerQueryOptions(PAT!)
    );
    if (!viewer) {
      ctx.context.PAT = undefined;
      ctx.context.viewer = undefined;
      throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
    }  
    return {
      ...ctx.context,
      viewer,
    };
  },
});
