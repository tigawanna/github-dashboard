/**
 * @generated SignedSource<<857683904a9ca8326644d46d91c191fa>>
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
export type UserFragmentCardunfollowMutation$variables = {
  input: UnfollowUserInput;
};
export type UserFragmentCardunfollowMutation$data = {
  readonly unfollowUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type UserFragmentCardunfollowMutation = {
  response: UserFragmentCardunfollowMutation$data;
  variables: UserFragmentCardunfollowMutation$variables;
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
    "name": "UserFragmentCardunfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFragmentCardunfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cd8a3c9a21a17623ea9a3507f23f4edc",
    "id": null,
    "metadata": {},
    "name": "UserFragmentCardunfollowMutation",
    "operationKind": "mutation",
    "text": "mutation UserFragmentCardunfollowMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "93e6f881000faad64a89d77a6ba17a32";

export default node;
