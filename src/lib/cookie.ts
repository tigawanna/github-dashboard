import { RequestContext } from "rakkasjs";

export function setGHPATCookie(ctx: RequestContext<unknown>, value: string) {
    ctx?.setCookie("gh_pat_cookie", value, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: false,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  // console.log( " ============= set pg cookie  ============ ", ctx.cookie?.pg_cookie);
}
export function deleteGHPATCookie(ctx: RequestContext<unknown>) {
    ctx?.deleteCookie("gh_pat_cookie", {
    path: "/",
  });
  // console.log( " ============= deleted pg cookie  ============ ", ctx.cookie?.pg_cookie);
}
