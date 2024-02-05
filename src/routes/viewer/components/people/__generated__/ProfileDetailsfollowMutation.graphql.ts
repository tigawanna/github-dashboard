/**
 * @generated SignedSource<<b6c622c523003290bda00ca5c1d0012d>>
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
export type ProfileDetailsfollowMutation$variables = {
  input: FollowUserInput;
};
export type ProfileDetailsfollowMutation$data = {
  readonly followUser: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type ProfileDetailsfollowMutation = {
  response: ProfileDetailsfollowMutation$data;
  variables: ProfileDetailsfollowMutation$variables;
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
    "name": "ProfileDetailsfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileDetailsfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "838be7dc8babc59dfc3c122b10f347c4",
    "id": null,
    "metadata": {},
    "name": "ProfileDetailsfollowMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileDetailsfollowMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "c27fb9b94a943a5e1a86ca385a487b16";

export default node;
