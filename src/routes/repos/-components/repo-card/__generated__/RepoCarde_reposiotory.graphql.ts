/**
 * @generated SignedSource<<e6218dfc6d7185c2d34f74dfb5b549ba>>
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
export type RepoCarde_reposiotory$data = {
  readonly description: string | null | undefined;
  readonly diskUsage: number | null | undefined;
  readonly forkCount: number;
  readonly forkingAllowed: boolean;
  readonly id: string;
  readonly isFork: boolean;
  readonly isInOrganization: boolean;
  readonly languages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly color: string | null | undefined;
        readonly id: string;
        readonly name: string;
      };
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly name: string;
  readonly nameWithOwner: string;
  readonly openGraphImageUrl: any;
  readonly owner: {
    readonly avatarUrl: any;
    readonly id: string;
    readonly login: string;
    readonly url: any;
  };
  readonly pushedAt: any | null | undefined;
  readonly refs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly target: {
          readonly history?: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly author: {
                  readonly name: string | null | undefined;
                } | null | undefined;
                readonly committedDate: any;
                readonly message: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly releases: {
    readonly nodes: ReadonlyArray<{
      readonly name: string | null | undefined;
      readonly publishedAt: any | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly stargazerCount: number;
  readonly url: any;
  readonly viewerCanAdminister: boolean;
  readonly viewerHasStarred: boolean;
  readonly viewerPermission: RepositoryPermission | null | undefined;
  readonly visibility: RepositoryVisibility;
  readonly " $fragmentType": "RepoCarde_reposiotory";
};
export type RepoCarde_reposiotory$key = {
  readonly " $data"?: RepoCarde_reposiotory$data;
  readonly " $fragmentSpreads": FragmentRefs<"RepoCarde_reposiotory">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RepoCarde_reposiotory",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
    (v2/*: any*/),
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
      "name": "forkCount",
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
      "name": "isInOrganization",
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
      "name": "isFork",
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
      "name": "viewerPermission",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerCanAdminister",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "login",
          "storageKey": null
        },
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "LanguageConnection",
      "kind": "LinkedField",
      "name": "languages",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LanguageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Language",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "color",
                  "storageKey": null
                },
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "languages(first:20)"
    },
    {
      "alias": null,
      "args": (v3/*: any*/),
      "concreteType": "ReleaseConnection",
      "kind": "LinkedField",
      "name": "releases",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Release",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "publishedAt",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "releases(first:1)"
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": {
            "direction": "DESC",
            "field": "TAG_COMMIT_DATE"
          }
        },
        {
          "kind": "Literal",
          "name": "refPrefix",
          "value": "refs/heads/"
        }
      ],
      "concreteType": "RefConnection",
      "kind": "LinkedField",
      "name": "refs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RefEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Ref",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "target",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": (v3/*: any*/),
                          "concreteType": "CommitHistoryConnection",
                          "kind": "LinkedField",
                          "name": "history",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "CommitEdge",
                              "kind": "LinkedField",
                              "name": "edges",
                              "plural": true,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "Commit",
                                  "kind": "LinkedField",
                                  "name": "node",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "committedDate",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "concreteType": "GitActor",
                                      "kind": "LinkedField",
                                      "name": "author",
                                      "plural": false,
                                      "selections": [
                                        (v1/*: any*/)
                                      ],
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "message",
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": "history(first:1)"
                        }
                      ],
                      "type": "Commit",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "refs(first:2,orderBy:{\"direction\":\"DESC\",\"field\":\"TAG_COMMIT_DATE\"},refPrefix:\"refs/heads/\")"
    }
  ],
  "type": "Repository",
  "abstractKey": null
};
})();

(node as any).hash = "182146e97f7f67577136904e7e8a38f8";

export default node;
