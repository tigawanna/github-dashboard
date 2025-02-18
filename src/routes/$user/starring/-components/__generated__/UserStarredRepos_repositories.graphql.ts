/**
 * @generated SignedSource<<02d9dd12430ad8ad8aead5054c922833>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RepositoryPermission = "ADMIN" | "MAINTAIN" | "READ" | "TRIAGE" | "WRITE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type UserStarredRepos_repositories$data = {
  readonly id: string;
  readonly starredRepositories: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly nameWithOwner: string;
        readonly viewerPermission: RepositoryPermission | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"RepoCard_reposiotory">;
      };
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
    readonly totalCount: number;
  };
  readonly " $fragmentType": "UserStarredRepos_repositories";
};
export type UserStarredRepos_repositories$key = {
  readonly " $data"?: UserStarredRepos_repositories$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserStarredRepos_repositories">;
};

import StarredRepositoriesPaginationQuery_graphql from './StarredRepositoriesPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "starredRepositories"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "afterStarredRepo"
    },
    {
      "defaultValue": 24,
      "kind": "LocalArgument",
      "name": "firstStarredRepos"
    },
    {
      "defaultValue": {
        "direction": "DESC",
        "field": "STARRED_AT"
      },
      "kind": "LocalArgument",
      "name": "orderByStarredRepos"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "firstStarredRepos",
        "cursor": "afterStarredRepo",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "firstStarredRepos",
          "cursor": "afterStarredRepo"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": StarredRepositoriesPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "UserStarredRepos_repositories",
  "selections": [
    {
      "alias": "starredRepositories",
      "args": [
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderByStarredRepos"
        }
      ],
      "concreteType": "StarredRepositoryConnection",
      "kind": "LinkedField",
      "name": "__UserStarredRepos_starredRepositories_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "StarredRepositoryEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Repository",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "nameWithOwner",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "viewerPermission",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RepoCard_reposiotory"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "1097e5856a15d61524f679afa4d55076";

export default node;
