import { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const user = ctx.locals.pb?.authStore?.model;
  const gh_pat = import.meta.env.RAKKAS_GH_PAT;
    const is_dev = import.meta.env.DEV;
  // console.log(" ==== user in viewer guard  === ", user);
  // const auth_url = new URL(ctx.url);
  // auth_url.pathname = "auth";
  // auth_url.searchParams.set("return_to", ctx.url.pathname);
  // console.log("user in auth route  ====== ",user)
  const auth_url = new URL(ctx.url);
  auth_url.searchParams.set("return_to", ctx.url.pathname);
  auth_url.pathname = "auth";
  // console.log(" ======= viewer route : return  to ====== ", ctx.url.pathname);

  if (!user && !(gh_pat && is_dev)) {
        console.log(" ====== /viewerauth guard redirect ===== ", {
          user,
          gh_pat,
          is_dev,
          redirect: auth_url.toString(),
        });
    return {
      redirect: auth_url.toString(),
    };
  } else {
    return true;
  }
}
