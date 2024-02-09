/**
 * @generated SignedSource<<cdb21a31d53fca27818a21ffc04f98ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RepoCardStardAddStarMutation$variables = {
  starrableId: string;
};
export type RepoCardStardAddStarMutation$data = {
  readonly addStar: {
    readonly starrable: {
      readonly id: string;
      readonly stargazerCount: number;
      readonly viewerHasStarred: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type RepoCardStardAddStarMutation = {
  response: RepoCardStardAddStarMutation$data;
  variables: RepoCardStardAddStarMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "starrableId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Literal",
        "name": "clientMutationId",
        "value": ""
      },
      {
        "kind": "Variable",
        "name": "starrableId",
        "variableName": "starrableId"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stargazerCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerHasStarred",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RepoCardStardAddStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddStarPayload",
        "kind": "LinkedField",
        "name": "addStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RepoCardStardAddStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddStarPayload",
        "kind": "LinkedField",
        "name": "addStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ba18b80009ded37f6d5a82062f4895d0",
    "id": null,
    "metadata": {},
    "name": "RepoCardStardAddStarMutation",
    "operationKind": "mutation",
    "text": "mutation RepoCardStardAddStarMutation(\n  $starrableId: ID!\n) {\n  addStar(input: {starrableId: $starrableId, clientMutationId: \"\"}) {\n    starrable {\n      __typename\n      id\n      stargazerCount\n      viewerHasStarred\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "32f6bbbf5e390d75654c86325e306329";

export default node;
