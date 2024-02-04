/**
 * @generated SignedSource<<4f6f5f6e76028406e6e8d4643e78c19d>>
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
export type RepositoryOrder = {
  direction: OrderDirection;
  field: RepositoryOrderField;
};
export type UserQuery$variables = {
  isFork?: boolean | null | undefined;
  login: string;
  orderBy?: RepositoryOrder | null | undefined;
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
v3 = [
  {
    "kind": "Variable",
    "name": "login",
    "variableName": "login"
  }
],
v4 = {
  "kind": "Variable",
  "name": "isFork",
  "variableName": "isFork"
},
v5 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "nodes",
    "plural": true,
    "selections": [
      (v8/*: any*/)
    ],
    "storageKey": null
  }
],
v10 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v11 = [
  (v10/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v8/*: any*/),
      (v12/*: any*/),
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
      (v13/*: any*/),
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
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "login",
            "storageKey": null
          },
          (v8/*: any*/),
          (v13/*: any*/),
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
          (v10/*: any*/)
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
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "color",
                    "storageKey": null
                  },
                  (v12/*: any*/)
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
        "args": (v6/*: any*/),
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
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": null
              },
              (v8/*: any*/)
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
                  (v12/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v14/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": (v6/*: any*/),
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
                                          (v12/*: any*/)
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
                                      (v8/*: any*/)
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
                      (v8/*: any*/)
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
      (v14/*: any*/)
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
v16 = {
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
v17 = [
  (v10/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "STARRED_AT"
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ViewerRepos_repositories"
          },
          {
            "args": null,
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
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "FollowerConnection",
            "kind": "LinkedField",
            "name": "followers",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": "followers(first:1)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "FollowingConnection",
            "kind": "LinkedField",
            "name": "following",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": "following(first:1)"
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v15/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "filters": [
              "orderBy",
              "isFork"
            ],
            "handle": "connection",
            "key": "Repositories_repositories",
            "kind": "LinkedHandle",
            "name": "repositories"
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v17/*: any*/),
            "concreteType": "StarredRepositoryConnection",
            "kind": "LinkedField",
            "name": "starredRepositories",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "StarredRepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v15/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": "starredRepositories(first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"STARRED_AT\"})"
          },
          {
            "alias": null,
            "args": (v17/*: any*/),
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
    "cacheID": "c18bc20748044c88895710c57537182b",
    "id": null,
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": "query UserQuery(\n  $login: String!\n  $isFork: Boolean\n  $orderBy: RepositoryOrder\n) {\n  user(login: $login) {\n    ...viewer_info\n    ...ViewerRepos_repositories_3LFRQw\n    ...ViewerStarerdRepos_repositories\n    id\n  }\n}\n\nfragment ViewerRepos_repositories_3LFRQw on User {\n  repositories(first: 10, orderBy: $orderBy, isFork: $isFork) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 10) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment ViewerStarerdRepos_repositories on User {\n  starredRepositories(first: 10, orderBy: {field: STARRED_AT, direction: DESC}) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 10) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment viewer_info on User {\n  followers(first: 1) {\n    totalCount\n    nodes {\n      id\n    }\n  }\n  following(first: 1) {\n    totalCount\n    nodes {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f1ece2dcba9477591f62ddc70181ab11";

export default node;
