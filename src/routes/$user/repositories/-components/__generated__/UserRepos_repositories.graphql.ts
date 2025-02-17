/**
 * @generated SignedSource<<a262ca642ee6ab2edeea368b16c1a9ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RepositoryPermission = "ADMIN" | "MAINTAIN" | "READ" | "TRIAGE" | "WRITE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type UserRepos_repositories$data = {
  readonly id: string;
  readonly repositories: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly nameWithOwner: string;
        readonly viewerPermission: RepositoryPermission | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"RepoCard_reposiotory">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
    readonly totalCount: number;
  };
  readonly " $fragmentType": "UserRepos_repositories";
};
export type UserRepos_repositories$key = {
  readonly " $data"?: UserRepos_repositories$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserRepos_repositories">;
};

import UserReposPaginationQuery_graphql from './UserReposPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "repositories"
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
      "name": "after"
    },
    {
      "defaultValue": 24,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "isFork"
    },
    {
      "defaultValue": {
        "direction": "DESC",
        "field": "PUSHED_AT"
      },
      "kind": "LocalArgument",
      "name": "orderBy"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": UserReposPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "UserRepos_repositories",
  "selections": [
    {
      "alias": "repositories",
      "args": [
        {
          "kind": "Variable",
          "name": "isFork",
          "variableName": "isFork"
        },
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        }
      ],
      "concreteType": "RepositoryConnection",
      "kind": "LinkedField",
      "name": "__UserRepos_repositories_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RepositoryEdge",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
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

(node as any).hash = "88897bf562c3b0b6aa960d1dbcebece5";

export default node;
