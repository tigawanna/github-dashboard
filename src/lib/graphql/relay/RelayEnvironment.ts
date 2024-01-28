import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const HTTP_ENDPOINT = "https://api.github.com/graphql";

export const fetchFn: FetchFunction = async (request, variables) => {
  try {
    // throw new Error("no gh_pat in env")
    const gh_pat = import.meta.env.RAKKAS_PAT;
    if (!gh_pat) {
      throw new Error("no gh_pat in env");
    }
    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers: {
        Accept:
          "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
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
      throw new Error(resp.statusText);
    }
    const json = await resp.json();

    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
      throw new Error(
        `Error fetching GraphQL query '${
          request.name
        }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
          json.errors,
        )}`,
      );
    }
    return json;
  } catch (error) {
    console.log(" ====== RELAY FETCHER ERROR ============== ", error);
    return;
  }
};

export async function testGithubToken(gh_token: string) {
  try {
    const viewer = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + gh_token,
      },
      body: JSON.stringify({
        query: `
      {
        viewer {
          login
          name
          avatarUrl
          email
        }
      }
    `,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return data as any as {
          data: {
            viewer: {
              login: string;
              name: string;
              avatarUrl: string;
              email: string;
            };
          };
        };
        // console.log(" ====== Github token valid ============== ", data)
      });
    return viewer;
  } catch (error) {
    return;
  }
}

// function createRelayEnvironment() {
//   return new Environment({
//     network: Network.create(fetchFn),
//     store: new Store(new RecordSource()),
//   });
// }

// export const RelayEnvironment = createRelayEnvironment();
