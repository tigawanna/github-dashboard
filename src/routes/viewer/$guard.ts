import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
    const session: string = ctx.queryClient.getQueryData("gh_token");
    console.log("======== viewer guard $queryClient.getQueryData(gh_token) ====== ", session);
    if (session) {
        return true;
    } else {
        const url = new URL("/auth", ctx.url);
        url.searchParams.set("redirect_to", url.pathname + url.search);
        return { redirect: url };
    }
}
