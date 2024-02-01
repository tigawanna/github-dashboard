/**
 * @generated SignedSource<<ecd3d8a748f5bd3367fca3e7e1f6d5d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type User_info$data = {
  readonly followers: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
    } | null | undefined> | null | undefined;
    readonly totalCount: number;
  };
  readonly following: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
    } | null | undefined> | null | undefined;
    readonly totalCount: number;
  };
  readonly starredRepositories: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
    } | null | undefined> | null | undefined;
    readonly totalCount: number;
  };
  readonly " $fragmentType": "User_info";
};
export type User_info$key = {
  readonly " $data"?: User_info$data;
  readonly " $fragmentSpreads": FragmentRefs<"User_info">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v3 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "nodes",
    "plural": true,
    "selections": (v2/*: any*/),
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_info",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "FollowerConnection",
      "kind": "LinkedField",
      "name": "followers",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": "followers(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "FollowingConnection",
      "kind": "LinkedField",
      "name": "following",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": "following(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "StarredRepositoryConnection",
      "kind": "LinkedField",
      "name": "starredRepositories",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Repository",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": "starredRepositories(first:1)"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "b4c9bdf4239450d21f7a150131989b26";

export default node;
