import { useMemo } from "react";
import {
  createIsographEnvironment,
  createIsographStore,
} from '@isograph/react';

export function makeNetworkRequest<T>(
  queryText: string,
  variables: unknown,
  token: string,
): Promise<T> {
  const promise = fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: queryText, variables }),
  }).then(async (response) => {
    const json = await response.json();

    if (response.ok) {
      /**
       * Enforce that the network response follows the specification:: {@link https://spec.graphql.org/draft/#sec-Errors}.
       */
      if (Object.hasOwn(json, 'errors')) {
        if (!Array.isArray(json.errors) || json.errors.length === 0) {
          throw new Error('GraphQLSpecificationViolationError', {
            cause: json,
          });
        }
        throw new Error('GraphQLError', {
          cause: json.errors,
        });
      }
      return json;
    }
    throw new Error('NetworkError', {
      cause: json,
    });
  });
  return promise;
}

export function useIsographEnviroment(token: string) {
    return  useMemo(
    () =>
      createIsographEnvironment(
        createIsographStore(),
        (...args)=>makeNetworkRequest(...args,token),
        null,
        typeof window != 'undefined' ? console.log : null,
      ),
    [],
  );
}
