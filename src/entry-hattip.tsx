import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/relay/modules";
import { fetchFn } from "./lib/relay/RelayEnvironment";
import { RequestContext } from "rakkasjs";
import { PocketBaseClient } from "./lib/pb/client";
import PocketBase from "pocketbase";
function createRelayEnvironment(ctx: RequestContext) {
  const pb_auth = ctx.locals?.pb?.authStore?.model;
  // console.log("=== createRelayEnvironment pocketbase  ===== ",ctx);
  // console.log("=== pb_auth  ===== ",pb_auth);
  //  when is dev mode check for a personal access token if  githu accessToken from pocketbase auth  is not found
  const gh_pat = import.meta.env.RAKKAS_GH_PAT;
  const is_dev = import.meta.env.DEV;
  const pb_pat = pb_auth?.accessToken;
  const token = is_dev ? pb_pat || gh_pat : pb_pat;
  console.log(" token ===",token)
  // const token = ctx.cookie.gh_token;
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token,
      }),
    ),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}

function pocketbaseMiddleware(ctx: RequestContext) {
  ctx.locals.pb = new PocketBase(
    import.meta.env.RAKKAS_PB_URL,
  ) as PocketBaseClient;
  // load the store data from the request cookie string
  ctx.locals.pb.authStore.loadFromCookie(
    ctx.request.headers.get("cookie") || "",
  );
}

export default createRequestHandler({
  middleware: {
    beforePages: [],
    beforeApiRoutes: [],
    beforeNotFound: [],
    beforeAll: [cookie(), pocketbaseMiddleware],
  },

  createPageHooks(requestContext) {
    const serverRelayEnvironment = createRelayEnvironment(requestContext);
    return {
      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        const relay_data = serverRelayEnvironment
          ?.getStore()
          ?.getSource()
          ?.toJSON();
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     <script>__RELAY_DATA__=${JSON.stringify(relay_data)}</script>

  `;
      },

      async extendPageContext(pageContext) {
        const request = pageContext.requestContext?.request;
        if (!request) return;
        // const gh_token = requestContext?.cookie?.gh_token;
        // if (gh_token) {
        //   try {
        //     await testGithubToken(gh_token);
        //     // console.log(
        //     //   "========= testGithubToken in extend page-ctx entry-hattip ==========",
        //     //   gh_token,
        //     // );
        //     pageContext.queryClient.setQueryData("gh_token", gh_token);
        //   } catch (error) {
        //     pageContext.queryClient.setQueryData("gh_token", null);
        //   }
        // }
        if (!pageContext.locals.pb) {
          pageContext.locals.pb = new PocketBase(
            import.meta.env.RAKKAS_PB_URL,
          ) as PocketBaseClient;
          // load the store data from the request cookie string
          pageContext.locals.pb.authStore.loadFromCookie(
            request.headers.get("cookie") || "",
          );
        }
        try {
          if (pageContext.locals.pb.authStore.isValid) {
            const user = pageContext?.locals?.pb;
            pageContext.queryClient.setQueryData(
              "user",
              user?.authStore?.model,
            );
            // console.log("===VALID USER , UPDATING POCKETBASE USER= ===");
          } else {
            // console.log("====INVALID USER , LOGGING OUT POCKETBASE= ===");
            pageContext.locals.pb.authStore.clear();
            pageContext.queryClient.setQueryData("user", null);
          }
        } catch (_) {
          // clear the auth store on failed refresh
          pageContext.locals.pb.authStore.clear();
        }
      },

      wrapApp(app) {
        return (
          <RelayEnvironmentProvider environment={serverRelayEnvironment}>
            {app}
          </RelayEnvironmentProvider>
        );
      },
    };
  },
});
