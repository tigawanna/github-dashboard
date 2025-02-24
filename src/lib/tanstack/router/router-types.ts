import { routeTree } from "@/routeTree.gen";
import { ParseRoute } from "@tanstack/react-router";

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];
export type RouterContext = ParseRoute<typeof routeTree>["types"]["routerContext"]
export type RouterTypes = ParseRoute<typeof routeTree>["types"]
export type AllRouterContext = ParseRoute<typeof routeTree>["types"]["allContext"]


