import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  CacheConfig,
  RequestParameters,
  UploadableMap,
  Variables,
} from "relay-runtime";

const HTTP_ENDPOINT = "https://api.github.com/graphql";

interface RelayFecherVars {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  uploadables?: UploadableMap | null | undefined;
}
interface RelayeFetcherFunctionArgs {
  fetchVars: RelayFecherVars;
  token?: string | null;
}
export async function fetchFn({
  fetchVars: { request, variables },
  token,
}: RelayeFetcherFunctionArgs) {
  try {
    // throw new Error("no gh_pat in env")
    const gh_pat = token;
    // console.log("=== gh_pat in relay fetchFn ====== ",gh_pat)
    if (gh_pat == null) {
      throw new Error("no gh_pat in env");
    }
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
        "Content-Type": "application/json",
        // <-- Additional headers like 'Authorization' would go here
        Authorization: `Bearer ${gh_pat}`,
      },
      body: JSON.stringify({
        query: request.text, // <-- The GraphQL document composed by Relay
        variables,
      }),
    });
    if (!resp.ok) {
      // If the response is not okay, then throw an error
      console.log(" ====== RELAY FETCHER STATUS TEXT ============== ", resp.statusText);
      throw new Error(resp.statusText);
    }
    const json = await resp.json();
    // console.log(" ====== RELAY FETCHER JSON ============== ", json);
    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
      throw new Error(
        `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(
          variables
        )}': ${JSON.stringify(json.errors)}`
      );
    }
    return json;
  } catch (error) {
    console.log(" ====== RELAY FETCHER ERROR ============== ", error);
    throw error;
  }
}

export function createRelayEnvironment(token: string) {
  return new Environment({
    network: Network.create((request, variables, cacheConfig, uploadables) =>
      fetchFn({
        fetchVars: { request, variables, cacheConfig, uploadables },
        token,
      })
    ),
    store: new Store(new RecordSource()),
  });
}

;
