/**
 * @generated SignedSource<<b5984f8c1560313db85f82d431f5e825>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FollowUserInput = {
  clientMutationId?: string | null | undefined;
  userId: string;
};
export type UserFragmentCardfollowMutation$variables = {
  input: FollowUserInput;
};
export type UserFragmentCardfollowMutation$data = {
  readonly followUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type UserFragmentCardfollowMutation = {
  response: UserFragmentCardfollowMutation$data;
  variables: UserFragmentCardfollowMutation$variables;
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
    "name": "UserFragmentCardfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFragmentCardfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c81d532d7cb2b04b09eb54a72d46c007",
    "id": null,
    "metadata": {},
    "name": "UserFragmentCardfollowMutation",
    "operationKind": "mutation",
    "text": "mutation UserFragmentCardfollowMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "edab9a5db1c4186b8a2e71e12b69caac";

export default node;
