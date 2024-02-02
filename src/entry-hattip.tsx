import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/graphql/relay/modules";
import { fetchFn } from "./lib/graphql/relay/RelayEnvironment";
import { RequestContext } from "rakkasjs";

function createRelayEnvironment(ctx:RequestContext) {
  const token = ctx.cookie.gh_pat_cookie;
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

      async extendPageContext(ctx) {
        const request = ctx.requestContext?.request;
        if (!request) return;

        const cookie = requestContext.cookie;
        if (cookie?.gh_pat_cookie) {
          // console.log("  ===  entry-hatip cookie =====", cookie.pg_cookie);
          const gh_pat_cookie = cookie?.gh_pat_cookie;
          // ctx.locals.pg = gh_pat_cookie;
          ctx.queryClient.setQueryData("gh_pat_cookie", gh_pat_cookie);
          // console.log("  ===  entry-hatip pg_config =====",pg_config );
        }
      },

      wrapApp(app) {
        return (
          <RelayEnvironmentProvider environment={serverRelayEnvironment}>
            {app}
          </RelayEnvironmentProvider>
        );
      },

      //   wrapSsrStream(stream) {
      //     const { readable, writable } = new TransformStream({
      //       transform(chunk, controller) {
      //         // You can transform the chunks of the
      //         // React SSR stream here.
      //         controller.enqueue(chunk);
      //       },
      //     });
      // // @ts-expect-error
      //     stream.pipeThrough(writable);

      //     return readable;
      //   },
    };
  },
});
