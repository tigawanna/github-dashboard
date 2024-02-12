import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  const return_to = ctx.url.searchParams.get("return_to") ?? "/";
  console.log(" ==== return to   === ", return_to);
  const new_url = new URL(ctx.url);
  new_url.pathname = ctx.url.searchParams.get("return_to")??"/"
  console.log("redirecting to   ====== ",new_url)
  if (user) {
    return {
      redirect:new_url.toString(),
    };
  } else {
    return true;
  }
}
