/**
 * @generated SignedSource<<85c33e1b95d07243d1906e345dbc6ce1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowUserInput = {
  clientMutationId?: string | null | undefined;
  userId: string;
};
export type PersonCardfollowMutation$variables = {
  input: FollowUserInput;
};
export type PersonCardfollowMutation$data = {
  readonly followUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type PersonCardfollowMutation = {
  response: PersonCardfollowMutation$data;
  variables: PersonCardfollowMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowUserPayload",
    "kind": "LinkedField",
    "name": "followUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonCardfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonCardfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "02d03ee781cfffd98a1efdfadb89be0c",
    "id": null,
    "metadata": {},
    "name": "PersonCardfollowMutation",
    "operationKind": "mutation",
    "text": "mutation PersonCardfollowMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "c675c5df4c5d861f21a762d45cdb292a";

export default node;
