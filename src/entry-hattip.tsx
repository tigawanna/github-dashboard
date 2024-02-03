import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/graphql/relay/modules";
import { fetchFn, testGithubToken } from "./lib/graphql/relay/RelayEnvironment";
import { RequestContext } from "rakkasjs";

function createRelayEnvironment(ctx: RequestContext) {
  const token = ctx.cookie.gh_token;
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

export default createRequestHandler({
  middleware: {
    beforePages: [],
    beforeApiRoutes: [],
    beforeNotFound: [],
    beforeAll: [cookie()],
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
        const gh_token = requestContext?.cookie?.gh_token;
        if (gh_token) {
          try {
            await testGithubToken(gh_token);
            // console.log(
            //   "========= testGithubToken in extend page-ctx entry-hattip ==========",
            //   gh_token,
            // );
            pageContext.queryClient.setQueryData("gh_token", gh_token);
          } catch (error) {
            pageContext.queryClient.setQueryData("gh_token", null);
          }
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
