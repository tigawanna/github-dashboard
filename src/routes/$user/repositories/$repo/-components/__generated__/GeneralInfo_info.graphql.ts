/**
 * @generated SignedSource<<5164124db785666af6f7ad29db14893d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RepositoryPermission = "ADMIN" | "MAINTAIN" | "READ" | "TRIAGE" | "WRITE" | "%future added value";
export type RepositoryVisibility = "INTERNAL" | "PRIVATE" | "PUBLIC" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GeneralInfo_info$data = {
  readonly description: string | null | undefined;
  readonly diskUsage: number | null | undefined;
  readonly forkCount: number;
  readonly forkingAllowed: boolean;
  readonly hasDiscussionsEnabled: boolean;
  readonly hasIssuesEnabled: boolean;
  readonly hasProjectsEnabled: boolean;
  readonly hasWikiEnabled: boolean;
  readonly homepageUrl: any | null | undefined;
  readonly id: string;
  readonly isArchived: boolean;
  readonly isDisabled: boolean;
  readonly isFork: boolean;
  readonly isLocked: boolean;
  readonly isPrivate: boolean;
  readonly isTemplate: boolean;
  readonly isUserConfigurationRepository: boolean;
  readonly languages: {
    readonly nodes: ReadonlyArray<{
      readonly color: string | null | undefined;
      readonly id: string;
      readonly name: string;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly nameWithOwner: string;
  readonly openGraphImageUrl: any;
  readonly primaryLanguage: {
    readonly color: string | null | undefined;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly projectsResourcePath: any;
  readonly projectsUrl: any;
  readonly pushedAt: any | null | undefined;
  readonly repositoryTopics: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly topic: {
        readonly name: string;
      };
    } | null | undefined> | null | undefined;
  };
  readonly resourcePath: any;
  readonly stargazerCount: number;
  readonly url: any;
  readonly viewerCanAdminister: boolean;
  readonly viewerHasStarred: boolean;
  readonly viewerPermission: RepositoryPermission | null | undefined;
  readonly visibility: RepositoryVisibility;
  readonly " $fragmentType": "GeneralInfo_info";
};
export type GeneralInfo_info$key = {
  readonly " $data"?: GeneralInfo_info$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneralInfo_info">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneralInfo_info",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
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
      "name": "nameWithOwner",
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
      "name": "projectsUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "projectsResourcePath",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pushedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "diskUsage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "homepageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "resourcePath",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibility",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerPermission",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "RepositoryTopicConnection",
      "kind": "LinkedField",
      "name": "repositoryTopics",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RepositoryTopic",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Topic",
              "kind": "LinkedField",
              "name": "topic",
              "plural": false,
              "selections": [
                (v2/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "repositoryTopics(first:20)"
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "LanguageConnection",
      "kind": "LinkedField",
      "name": "languages",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Language",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v3/*: any*/),
            (v2/*: any*/),
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": "languages(first:20)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Language",
      "kind": "LinkedField",
      "name": "primaryLanguage",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v0/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "forkCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stargazerCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasDiscussionsEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasIssuesEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasProjectsEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasWikiEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "forkingAllowed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArchived",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDisabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFork",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLocked",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPrivate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isTemplate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUserConfigurationRepository",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerHasStarred",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerCanAdminister",
      "storageKey": null
    }
  ],
  "type": "Repository",
  "abstractKey": null
};
})();

(node as any).hash = "8ee2b546ef4e7061b084c2728d7178cc";

export default node;
