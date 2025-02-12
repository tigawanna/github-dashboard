/**
 * @generated SignedSource<<93e4d486e632f087f6eb67352c8a8ae2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UnfollowUserInput = {
  clientMutationId?: string | null | undefined;
  userId: string;
};
export type UserInfounfollowMutation$variables = {
  input: UnfollowUserInput;
};
export type UserInfounfollowMutation$data = {
  readonly unfollowUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type UserInfounfollowMutation = {
  response: UserInfounfollowMutation$data;
  variables: UserInfounfollowMutation$variables;
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
    "concreteType": "UnfollowUserPayload",
    "kind": "LinkedField",
    "name": "unfollowUser",
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
    "name": "UserInfounfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserInfounfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "510f37c5692d2651f5e9e71e93b63119",
    "id": null,
    "metadata": {},
    "name": "UserInfounfollowMutation",
    "operationKind": "mutation",
    "text": "mutation UserInfounfollowMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7acd445ab1681d367968f7c667beff9";

export default node;
