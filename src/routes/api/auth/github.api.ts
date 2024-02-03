import { json } from "@hattip/response";
import { RequestContext } from "rakkasjs";
import { GitHub} from "arctic";
import { setGHPATCookie } from "@/lib/cookie";

export async function get(ctx: RequestContext) {
  try {
    const code = ctx.url.searchParams.get("code");
    const state = ctx.url.searchParams.get("state");
    const storedState = ctx.cookie?.["github_oauth_state"] ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      return json(
        { data: null, error: "missing fields" },
        {
          status: 401,
          headers: {
            location: "/auth",
          },
        },
      );
    }
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not found");
    }

    const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
    const tokens = await github.validateAuthorizationCode(code);
    setGHPATCookie(ctx, tokens.accessToken);
    console.log(" ctx.cookie github.api.ts ===== ", ctx.cookie);
    const redirect_to = ctx.cookie?.["return_to"];
    return new Response(null, {
      status: 302,
      headers: {
        location: redirect_to ?? "/",
        "content-type": "text/plain",
        // "set-cookie": `redirect_to=${redirect_to ?? "/"}`,
      },
    });
  } catch (error) {
    return json(
      { data: null, error: error },
      {
        status: 401,
        headers: {
          location: "/auth",
        },
      },
    );
  }
}
