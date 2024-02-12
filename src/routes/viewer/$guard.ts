import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  // console.log(" ==== user in viewer guard  === ", user);
  // const auth_url = new URL(ctx.url);
  // auth_url.pathname = "auth";
  // auth_url.searchParams.set("return_to", ctx.url.pathname);
  // console.log("user in auth route  ====== ",user)
  const auth_url = new URL(ctx.url);
  auth_url.searchParams.set("return_to", ctx.url.pathname);
  auth_url.pathname = "auth";
  // console.log(" ======= viewer route : return  to ====== ", ctx.url.pathname);
  // console.log(" ======= viewer route :redirecting to auth ====== ", auth_url);
  if (!user) {
    return {
      redirect: auth_url.toString(),
    };
  } else {
    return true;
  }
}
