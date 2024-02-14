import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  const gh_pat = import.meta.env.RAKKAS_GH_PAT;
  const is_dev = import.meta.env.DEV
  const auth_url = new URL(ctx.url);
  auth_url.searchParams.set("return_to", ctx.url.pathname);
  auth_url.pathname = "auth";
  // console.log(" ======= home route :redirect to auth ====== ", ctx.url.pathname);
  // console.log(" ======= home route :redirecting to auth ====== ", auth_url);
  if (!user && !(gh_pat && is_dev) && ctx.url.pathname !== "/auth") {
    console.log(" ====== / auth guard redirect ===== ",{
      user,
      gh_pat,
      is_dev,
      redirect: auth_url.toString()
    });
    return {
      redirect: auth_url.toString(),
    };
  } else {
    return true;
  }
}
