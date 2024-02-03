import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
    // console.log(" ==== url in pageGuard ===== ",ctx.url)
    // console.log(" ==== renderdUrl in pageGuard ===== ",ctx.renderedUrl)
    const session: string = ctx.queryClient.getQueryData("gh_token");
    // console.log("======== viewer guard $queryClient.getQueryData(gh_token) ====== ", session);
    if (session) {
        return true;
    } else {
        const url = new URL("/auth", ctx.url);
        url.searchParams.set("return_to", ctx.url.pathname + ctx.url.search);
        return { redirect: url,headers(headers) {
            headers.set("set-cookie", "return_to=" + ctx.url.pathname + ctx.url.search);
        }, };
    }
    return true
}
