/**
 * @generated SignedSource<<81a910011fe056ce217942778b5030a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchRepoResultsFraggment$data = {
  readonly createdAt: any;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly nameWithOwner: string;
  readonly openGraphImageUrl: any;
  readonly " $fragmentType": "SearchRepoResultsFraggment";
};
export type SearchRepoResultsFraggment$key = {
  readonly " $data"?: SearchRepoResultsFraggment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchRepoResultsFraggment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchRepoResultsFraggment",
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
      "name": "nameWithOwner",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "openGraphImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Repository",
  "abstractKey": null
};

(node as any).hash = "cc4dd1b1848d5475150e394b90f1173b";

export default node;
