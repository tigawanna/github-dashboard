/**
 * @generated SignedSource<<b26c78373040777353c37225b7ae5647>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type RepositoryOrderField = "CREATED_AT" | "NAME" | "PUSHED_AT" | "STARGAZERS" | "UPDATED_AT" | "%future added value";
export type StarOrderField = "STARRED_AT" | "%future added value";
export type RepositoryOrder = {
  direction: OrderDirection;
  field: RepositoryOrderField;
};
export type StarOrder = {
  direction: OrderDirection;
  field: StarOrderField;
};
export type UserQuery$variables = {
  isFork?: boolean | null | undefined;
  login: string;
  orderBy?: RepositoryOrder | null | undefined;
  starOrder?: StarOrder | null | undefined;
};
export type UserQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewerRepos_repositories" | "ViewerStarerdRepos_repositories" | "viewer_info">;
  } | null | undefined;
};
export type UserQuery = {
  response: UserQuery$data;
  variables: UserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isFork"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "login"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "starOrder"
},
v4 = [
  {
    "kind": "Variable",
    "name": "login",
    "variableName": "login"
  }
],
v5 = {
  "kind": "Variable",
  "name": "isFork",
  "variableName": "isFork"
},
v6 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v7 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "starOrder"
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  (v9/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "nodes",
    "plural": true,
    "selections": [
      (v10/*: any*/)
    ],
    "storageKey": null
  }
],
v12 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v13 = [
  (v12/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v10/*: any*/),
      (v14/*: any*/),
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
      (v15/*: any*/),
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
        "concreteType": null,
        "kind": "LinkedField",
        "name": "owner",
        "plural": false,
        "selections": [
          (v16/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "login",
            "storageKey": null
          },
          (v10/*: any*/),
          (v15/*: any*/),
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
          (v12/*: any*/)
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
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "color",
                    "storageKey": null
                  },
                  (v14/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "languages(first:10)"
      },
      {
        "alias": null,
        "args": (v8/*: any*/),
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
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": null
              },
              (v10/*: any*/)
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
                  (v14/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": (v8/*: any*/),
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
                                          (v14/*: any*/)
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
                                      (v10/*: any*/)
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
                      },
                      (v10/*: any*/)
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
      },
      (v16/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cursor",
    "storageKey": null
  }
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
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
v19 = [
  (v12/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "viewer_info"
          },
          {
            "args": [
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ViewerRepos_repositories"
          },
          {
            "args": [
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ViewerStarerdRepos_repositories"
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
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "FollowerConnection",
            "kind": "LinkedField",
            "name": "followers",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": "followers(first:1)"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "FollowingConnection",
            "kind": "LinkedField",
            "name": "following",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": "following(first:1)"
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
            "filters": [
              "orderBy",
              "isFork"
            ],
            "handle": "connection",
            "key": "Repositories_repositories",
            "kind": "LinkedHandle",
            "name": "repositories"
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": (v19/*: any*/),
            "concreteType": "StarredRepositoryConnection",
            "kind": "LinkedField",
            "name": "starredRepositories",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "StarredRepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v19/*: any*/),
            "filters": [
              "orderBy"
            ],
            "handle": "connection",
            "key": "Viewer_starredRepositories",
            "kind": "LinkedHandle",
            "name": "starredRepositories"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "583d1110edd6e8bcf1b821f1fc807234",
    "id": null,
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": "query UserQuery(\n  $login: String!\n  $isFork: Boolean\n  $orderBy: RepositoryOrder\n  $starOrder: StarOrder\n) {\n  user(login: $login) {\n    ...viewer_info\n    ...ViewerRepos_repositories_3LFRQw\n    ...ViewerStarerdRepos_repositories_pZk0a\n    id\n  }\n}\n\nfragment ViewerRepos_repositories_3LFRQw on User {\n  repositories(first: 10, orderBy: $orderBy, isFork: $isFork) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 10) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment ViewerStarerdRepos_repositories_pZk0a on User {\n  starredRepositories(first: 10, orderBy: $starOrder) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 10) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment viewer_info on User {\n  followers(first: 1) {\n    totalCount\n    nodes {\n      id\n    }\n  }\n  following(first: 1) {\n    totalCount\n    nodes {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9b64b94a16d4219f707d2cba4b4e0146";

export default node;
