/**
 * @generated SignedSource<<a5f4e7def30b5262f0c0cdbd36e11f20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RepoFullRepositoryQuery$variables = {
  reponame: string;
  repoowner: string;
};
export type RepoFullRepositoryQuery$data = {
  readonly repository: {
    readonly forkCount: number;
    readonly nameWithOwner: string;
    readonly " $fragmentSpreads": FragmentRefs<"Branches_refs" | "Languages_languages" | "Stars_stargazers">;
  } | null | undefined;
};
export type RepoFullRepositoryQuery = {
  response: RepoFullRepositoryQuery$data;
  variables: RepoFullRepositoryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reponame"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repoowner"
},
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "reponame"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "repoowner"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "forkCount",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v11/*: any*/),
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPreviousPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
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
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v16 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RepoFullRepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Stars_stargazers"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Branches_refs"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Languages_languages"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RepoFullRepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "StargazerConnection",
            "kind": "LinkedField",
            "name": "stargazers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "StargazerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": "stargazers(first:5)"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Stars_stargazers",
            "kind": "LinkedHandle",
            "name": "stargazers"
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
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
                      (v7/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "target",
                        "plural": false,
                        "selections": [
                          (v10/*: any*/),
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": (v5/*: any*/),
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
                                              (v7/*: any*/),
                                              (v8/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "message",
                                            "storageKey": null
                                          },
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
                                            "name": "pushedDate",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "authoredDate",
                                            "storageKey": null
                                          },
                                          (v9/*: any*/),
                                          (v10/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v13/*: any*/),
                                  (v15/*: any*/)
                                ],
                                "storageKey": "history(first:5)"
                              },
                              {
                                "alias": null,
                                "args": (v5/*: any*/),
                                "filters": null,
                                "handle": "connection",
                                "key": "Commits_history",
                                "kind": "LinkedHandle",
                                "name": "history"
                              }
                            ],
                            "type": "Commit",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "refs(first:3,orderBy:{\"direction\":\"DESC\",\"field\":\"TAG_COMMIT_DATE\"},refPrefix:\"refs/heads/\")"
          },
          {
            "alias": null,
            "args": (v14/*: any*/),
            "filters": [
              "refPrefix",
              "orderBy"
            ],
            "handle": "connection",
            "key": "Branches_refs",
            "kind": "LinkedHandle",
            "name": "refs"
          },
          {
            "alias": null,
            "args": (v16/*: any*/),
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
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "color",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v15/*: any*/)
            ],
            "storageKey": "languages(first:20)"
          },
          {
            "alias": null,
            "args": (v16/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Languages_languages",
            "kind": "LinkedHandle",
            "name": "languages"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aa737aea309d81523bb7ba15e1c356e6",
    "id": null,
    "metadata": {},
    "name": "RepoFullRepositoryQuery",
    "operationKind": "query",
    "text": "query RepoFullRepositoryQuery(\n  $repoowner: String!\n  $reponame: String!\n) {\n  repository(owner: $repoowner, name: $reponame) {\n    nameWithOwner\n    forkCount\n    ...Stars_stargazers\n    ...Branches_refs\n    ...Languages_languages\n    id\n  }\n}\n\nfragment Branches_refs on Repository {\n  refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 3) {\n    edges {\n      node {\n        name\n        id\n        target {\n          __typename\n          ...Commits_history\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment Commits_history on Commit {\n  history(first: 5) {\n    edges {\n      node {\n        committedDate\n        author {\n          name\n          email\n        }\n        message\n        url\n        pushedDate\n        authoredDate\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    totalCount\n  }\n  id\n}\n\nfragment Languages_languages on Repository {\n  languages(first: 20) {\n    edges {\n      node {\n        id\n        color\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    totalCount\n  }\n  id\n}\n\nfragment Stars_stargazers on Repository {\n  stargazers(first: 5) {\n    edges {\n      cursor\n      node {\n        name\n        email\n        avatarUrl\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "ac33c43748a09656e01960b5476f8c72";

export default node;
