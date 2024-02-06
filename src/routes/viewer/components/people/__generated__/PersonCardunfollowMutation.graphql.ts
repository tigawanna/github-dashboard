/**
 * @generated SignedSource<<e16fbdf626f0b1a7973b6ed860f95dad>>
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
export type PersonCardunfollowMutation$variables = {
  input: UnfollowUserInput;
};
export type PersonCardunfollowMutation$data = {
  readonly unfollowUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type PersonCardunfollowMutation = {
  response: PersonCardunfollowMutation$data;
  variables: PersonCardunfollowMutation$variables;
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
    "name": "PersonCardunfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonCardunfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "67a8e9ed2eb2b1e2fc0b45fea98438d0",
    "id": null,
    "metadata": {},
    "name": "PersonCardunfollowMutation",
    "operationKind": "mutation",
    "text": "mutation PersonCardunfollowMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "f74cb51a025a4daeed523d754e73513d";

export default node;
