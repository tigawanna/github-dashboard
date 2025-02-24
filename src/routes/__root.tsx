import { createRootRouteWithContext } from "@tanstack/react-router";
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
import { fetchCurrentViewer } from "@/lib/viewer/use-viewer";
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

});
