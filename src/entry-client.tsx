/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/graphql/relay/modules";
import { fetchFn } from "./lib/graphql/relay/RelayEnvironment";
import {parse} from "cookie-es"

const relay_data_form_server = (window as any)?.__RELAY_DATA__;
// console.log(
//   "  ===  entry-client relay_data_form_server =====",
//   relay_data_form_server,
// );
function createRelayEnvironment() {
  const cookie = parse(document?.cookie);
  console.log("===== document .cookie  === ",document.cookie)
  console.log(" ===== entry client cookies ===== ",cookie)
  const token = cookie.gh_token;
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token
      }),
    ),
    store: new Store(RecordSource.create(relay_data_form_server)),
    isServer: false,
  });
}
export const clientRelayEnvironment = createRelayEnvironment();
// console.log("  ===  entry-client clientRelayEnvironment =====",clientRelayEnvironment);
// const network = clientRelayEnvironment?.options;
// console.log("=====  clientRelayEnvironment =====", network);
startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },
    wrapApp(app) {
      return (
        <RelayEnvironmentProvider environment={clientRelayEnvironment}>
          {app}
        </RelayEnvironmentProvider>
      );
    },

    extendPageContext(ctx) {
      // if (document?.cookie) {
      //   const cookie = parse(document?.cookie);
      //   if (cookie) {
      //     const pg_config = safeDestr<DbAuthProps>(cookie?.pg_cookie);
      //     // console.log("  ===  entry-client pg_config =====", pg_config);
      //     ctx.locals.pg = pg_config;
      //     console.log("  ===  entry-client cooki_pg config =====", cookie,pg_config);
      //     ctx.queryClient.setQueryData("pg_config", pg_config);
      //   } else {
      //     console.log("  ===  entry-client no cookie =====");
      //     ctx.queryClient.setQueryData("pg_config", null);
      //     ctx.locals.pg = null;
      //   }
      // }
    },
  },
});
