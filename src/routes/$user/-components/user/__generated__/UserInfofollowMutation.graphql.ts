/**
 * @generated SignedSource<<272648b8321df8f9c6110d5cf08b7cb1>>
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
export type UserInfofollowMutation$variables = {
  input: FollowUserInput;
};
export type UserInfofollowMutation$data = {
  readonly followUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type UserInfofollowMutation = {
  response: UserInfofollowMutation$data;
  variables: UserInfofollowMutation$variables;
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
    "name": "UserInfofollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserInfofollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4055783021538a4cdab71fe63190aeb4",
    "id": null,
    "metadata": {},
    "name": "UserInfofollowMutation",
    "operationKind": "mutation",
    "text": "mutation UserInfofollowMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "b13a1607ba4bfef9d50e51739a84b66f";

export default node;
