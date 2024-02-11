import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log(" ==== user in viewer guard  === ", user);
  const new_url = new URL(ctx.url);
  new_url.pathname = ctx.url.searchParams.get("return_to")??"/"
  // console.log("user in auth route  ====== ",user)
  if (user) {
    return {
      redirect:new_url.toString(),
    };
  } else {
    return true;
  }
}
