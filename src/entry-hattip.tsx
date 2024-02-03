import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/graphql/relay/modules";
import { fetchFn } from "./lib/graphql/relay/RelayEnvironment";
import { RequestContext } from "rakkasjs";

import { Auth } from "@auth/core";
import type { Provider } from "@auth/core/providers";
import GitHubProvider from "@auth/core/providers/github";

async function authjsMiddleware(ctx: RequestContext) {
  if (!ctx.url.pathname.match(/^\/auth(\/|$)/)) {
    return;
  }

  const { SERVER_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  if (!SERVER_SECRET) {
    throw new Error(
      "SERVER_SECRET environment variable is not set. " +
        "You can generate one with 'npm run gen-secret' and put it in a .env file in the root of the project.",
    );
  }

  const providers: Provider[] = [];

  if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        authorization: {
          params: {
            scope: "user  delete_repo",
          },
        },
      }) as any,
    );
  } else {
    console.warn("GitHub client ID and secret not set, GitHub login disabled");
  }

  if (providers.length === 0) {
    throw new Error(
      "No authentication providers configured. " +
        "Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET . " +
        "You can put them in a .env file in the root of the project.",
    );
  }

  return Auth(
    new Request(ctx.url, {
      method: ctx.method,
      headers: ctx.request.headers,
      body: ctx.request.body,

      // @ts-expect-error: Node's fetch now requires this but types haven't been updated yet
      duplex: "half",
    }),
    {
      trustHost: true,
      secret: SERVER_SECRET,
      providers,
    },
  ) as Promise<Response>;
}

function createRelayEnvironment(ctx: RequestContext) {
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
    beforeAll: [cookie(), authjsMiddleware],
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

        const cookie = requestContext.cookie;
        if (cookie?.gh_pat_cookie) {
          // console.log("  ===  entry-hatip cookie =====", cookie.pg_cookie);
          const gh_pat_cookie = cookie?.gh_pat_cookie;
          // pageContex.locals.pg = gh_pat_cookie;
          pageContext.queryClient.setQueryData("gh_pat_cookie", gh_pat_cookie);

          // console.log("  ===  entry-hatip pg_config =====",pg_config );
        }
        const [session, csrf] = await Promise.all([
          requestContext.fetch("/auth/session").then((r) => r.json()),
          requestContext.fetch("/auth/csrf").then((r) => r.json()),
        ]);

        pageContext.queryClient.setQueryData("auth:session", session);
        pageContext.queryClient.setQueryData("auth:csrf", csrf);
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
