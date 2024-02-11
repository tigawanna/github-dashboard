/**
 * @generated SignedSource<<3b5d42056da04b17cd88941d40629fb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchUserResultsfragment$data = {
  readonly avatarUrl: any;
  readonly bio: string | null | undefined;
  readonly id: string;
  readonly login: string;
  readonly name: string | null | undefined;
  readonly url: any;
  readonly " $fragmentType": "SearchUserResultsfragment";
};
export type SearchUserResultsfragment$key = {
  readonly " $data"?: SearchUserResultsfragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchUserResultsfragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchUserResultsfragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 150
        }
      ],
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": "avatarUrl(size:150)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "login",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "97c5ddebdd06bae7adf96980131df2f1";

export default node;
