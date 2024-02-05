/**
 * @generated SignedSource<<4ba17780fd8146dcfb8470c5a4157d29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnfollowUserInput = {
  clientMutationId?: string | null | undefined;
  userId: string;
};
export type ProfileDetailsunfollowMutation$variables = {
  input: UnfollowUserInput;
};
export type ProfileDetailsunfollowMutation$data = {
  readonly unfollowUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type ProfileDetailsunfollowMutation = {
  response: ProfileDetailsunfollowMutation$data;
  variables: ProfileDetailsunfollowMutation$variables;
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
    "name": "ProfileDetailsunfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileDetailsunfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e99a8a116dfaae1673260a198fb74c3f",
    "id": null,
    "metadata": {},
    "name": "ProfileDetailsunfollowMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileDetailsunfollowMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "a4931b28bf40884af5924c177db1686d";

export default node;
