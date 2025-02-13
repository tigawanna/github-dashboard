/**
 * @generated SignedSource<<9963d1c2272038be6c8812e2c41a1e16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Branches_refs$data = {
  readonly id: string;
  readonly refs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly target: {
          readonly " $fragmentSpreads": FragmentRefs<"Commits_history">;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly totalCount: number;
  } | null | undefined;
  readonly " $fragmentType": "Branches_refs";
};
export type Branches_refs$key = {
  readonly " $data"?: Branches_refs$data;
  readonly " $fragmentSpreads": FragmentRefs<"Branches_refs">;
};

import BranchesPaginationQuery_graphql from './BranchesPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "refs"
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
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
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
      "operation": BranchesPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "Branches_refs",
  "selections": [
    {
      "alias": "refs",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": {
            "direction": "DESC",
            "field": "TAG_COMMIT_DATE"
          }
        },
        {
          "kind": "Literal",
          "name": "refPrefix",
          "value": "refs/heads/"
        }
      ],
      "concreteType": "RefConnection",
      "kind": "LinkedField",
      "name": "__Branches_refs_connection",
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
          "concreteType": "RefEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Ref",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "target",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "Commits_history"
                    }
                  ],
                  "storageKey": null
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__Branches_refs_connection(orderBy:{\"direction\":\"DESC\",\"field\":\"TAG_COMMIT_DATE\"},refPrefix:\"refs/heads/\")"
    },
    (v1/*: any*/)
  ],
  "type": "Repository",
  "abstractKey": null
};
})();

(node as any).hash = "39f611a294c301b48f7de4283b87cfd8";

export default node;
