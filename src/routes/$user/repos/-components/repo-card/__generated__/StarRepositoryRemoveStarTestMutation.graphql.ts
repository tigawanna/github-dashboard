/**
 * @generated SignedSource<<3172177ce498fb39661feed05998e2c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type StarRepositoryRemoveStarTestMutation$variables = {
  starrableId: string;
};
export type StarRepositoryRemoveStarTestMutation$data = {
  readonly removeStar: {
    readonly starrable: {
      readonly id: string;
      readonly stargazerCount: number;
      readonly viewerHasStarred: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type StarRepositoryRemoveStarTestMutation = {
  response: StarRepositoryRemoveStarTestMutation$data;
  variables: StarRepositoryRemoveStarTestMutation$variables;
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
    "name": "StarRepositoryRemoveStarTestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
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
    "name": "StarRepositoryRemoveStarTestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
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
    "cacheID": "8d302da422fbc5409366e3da487273fa",
    "id": null,
    "metadata": {},
    "name": "StarRepositoryRemoveStarTestMutation",
    "operationKind": "mutation",
    "text": "mutation StarRepositoryRemoveStarTestMutation(\n  $starrableId: ID!\n) {\n  removeStar(input: {starrableId: $starrableId, clientMutationId: \"\"}) {\n    starrable {\n      __typename\n      id\n      stargazerCount\n      viewerHasStarred\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b759110899fbc66b72256410db99912";

export default node;
