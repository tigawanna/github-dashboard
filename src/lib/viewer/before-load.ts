import { logRedirected } from "@/utils/log";
import { AnyContext, BeforeLoadContextOptions, redirect, RootRoute } from "@tanstack/react-router";
import { returnTo } from "../tanstack/router/utils";
import { fetchCurrentViewer, getVerifiedPAT, viewerQueryOptions } from "./use-viewer";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import { QueryClient } from "@tanstack/react-query";
import { RouterTypes } from "../tanstack/router/router-types";
import { createRelayEnvironment } from "../relay/RelayEnvironment";

// type SearchParams = ((search: Record<string, unknown>) => Record<string, any>)|undefined
type SearchParams = any;
type RouterContext = {
  queryClient: QueryClient;
  viewer: Awaited<ReturnType<typeof fetchCurrentViewer> | undefined>;
  PAT?: string;
  relayEnviroment?: RelayModernEnvironment;
};

type BeforeLoadContext = BeforeLoadContextOptions<
  RootRoute<
    (search: Record<string, unknown>) => {
      globalPage?: number | undefined;
      globalSearch?: string | undefined;
    },
    RouterContext,
    AnyContext,
    AnyContext,
    {},
    undefined,
    unknown,
    unknown
  >,
  SearchParams,
  Record<any, string>,
  AnyContext,
  AnyContext
>;

export async function viewerBeforeLoad<T extends BeforeLoadContext>(ctx: T) {
  const PAT = await getVerifiedPAT();
  console.log("== pat ==", PAT);
  if (!PAT || PAT.length < 5) {
    ctx.context.PAT = undefined;
    ctx.context.viewer = undefined;
    logRedirected(ctx.location.pathname);
    throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
  }
  const viewer = await ctx.context.queryClient.ensureQueryData(viewerQueryOptions(PAT!));
  if (!viewer) {
    ctx.context.PAT = undefined;
    ctx.context.viewer = undefined;
    logRedirected(ctx.location.pathname);
    throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
  }
  return {
    ...ctx.context,
    PAT,
    viewer,
  };
}
export async function viewerBeforeLoadWithRelay<T extends BeforeLoadContext>(ctx: T) {
  const PAT = await getVerifiedPAT();
  if (!PAT || PAT.length < 5) {
    console.log("PAT == missing in local storage ==", PAT);
    ctx.context.PAT = undefined;
    ctx.context.viewer = undefined;
    logRedirected(ctx.location.pathname);
    throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
  }
  const viewer = await ctx.context.queryClient.ensureQueryData(viewerQueryOptions(PAT!));
  if (!viewer) {
    ctx.context.PAT = undefined;
    ctx.context.viewer = undefined;
    logRedirected(ctx.location.pathname);
    throw redirect({ to: "/auth", search: { returnTo: returnTo(ctx.location) } });
  }
    return {
      ...ctx.context,
      viewer,
      PAT,
      relayEnviroment: createRelayEnvironment(PAT),
    };
}
