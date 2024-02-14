/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/relay/modules";
import { fetchFn } from "./lib/relay/RelayEnvironment";
import { parse } from "cookie-es";
import { PocketBaseClient } from "./lib/pb/client";
import PocketBase from "pocketbase";
import { safeDestr } from "destr";
const relay_data_from_server = (window as any)?.__RELAY_DATA__;

export interface PB_AUTH {
  token: string;
  model: Model;
}

export interface Model {
  accessToken: string;
  avatarUrl: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  updated: string;
  username: string;
  verified: boolean;
}

function createRelayEnvironment() {
  const cookie = parse(document?.cookie);
  const pb_auth = safeDestr<PB_AUTH>(cookie.pb_auth);

//  when is dev mode check for a personal access token if  githu accessToken from pocketbase auth  is not found
  const gh_pat = import.meta.env.RAKKAS_GH_PAT;
  const is_dev = import.meta.env.DEV;
  const pb_pat = pb_auth?.model?.accessToken;
  const token = is_dev ?  pb_pat||gh_pat : pb_pat;
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token,
      }),
    ),
    store: new Store(RecordSource.create(relay_data_from_server)),
    isServer: false,
  });
}
export const clientRelayEnvironment = createRelayEnvironment();

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
      if (!ctx.locals.pb) {
        ctx.locals.pb = new PocketBase(
          import.meta.env.RAKKAS_PB_URL,
        ) as PocketBaseClient;
        ctx.locals.pb?.authStore.onChange(() => {
          ctx.requestContext?.setCookie?.(
            "set-cookie",
            ctx.locals.pb?.authStore.exportToCookie(),
          );
        });
      }
    },
  },
});
