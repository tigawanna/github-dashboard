/**
 * @generated SignedSource<<9d5349dd94bc4a49d74900bc38d87504>>
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
export type viewerVIEWERQuery$variables = {
  isFork?: boolean | null | undefined;
  orderBy?: RepositoryOrder | null | undefined;
  starOrder?: StarOrder | null | undefined;
};
export type viewerVIEWERQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Followers_followers" | "Following_following" | "ProfileDetails" | "ViewerRepos_repositories" | "ViewerStarerdRepos_repositories">;
  };
};
export type viewerVIEWERQuery = {
  response: viewerVIEWERQuery$data;
  variables: viewerVIEWERQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isFork"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "starOrder"
  }
],
v1 = {
  "kind": "Variable",
  "name": "isFork",
  "variableName": "isFork"
},
v2 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bio",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "company",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twitterUsername",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowingViewer",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerIsFollowing",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewer",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v17 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v18 = [
  (v17/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v21 = {
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
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v23 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      (v20/*: any*/)
    ],
    "storageKey": null
  },
  (v21/*: any*/),
  (v22/*: any*/)
],
v24 = [
  (v17/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/)
],
v25 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v26 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
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
      (v16/*: any*/),
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
          (v19/*: any*/),
          (v5/*: any*/),
          (v3/*: any*/),
          (v16/*: any*/),
          (v8/*: any*/)
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "color",
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
        "args": (v25/*: any*/),
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": null
              },
              (v3/*: any*/)
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
                  (v4/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "target",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": (v25/*: any*/),
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
                                          (v4/*: any*/)
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
                                      (v3/*: any*/)
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
                      (v3/*: any*/)
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
      (v19/*: any*/)
    ],
    "storageKey": null
  },
  (v20/*: any*/)
],
v27 = [
  (v17/*: any*/),
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "starOrder"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "viewerVIEWERQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileDetails"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Following_following"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Followers_followers"
          },
          {
            "args": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ViewerRepos_repositories"
          },
          {
            "args": [
              {
                "kind": "Variable",
                "name": "orderByStarredRepos",
                "variableName": "starOrder"
              }
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "viewerVIEWERQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": "FollowingConnection",
            "kind": "LinkedField",
            "name": "following",
            "plural": false,
            "selections": (v23/*: any*/),
            "storageKey": "following(first:10)"
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Following_following",
            "kind": "LinkedHandle",
            "name": "following"
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": "FollowerConnection",
            "kind": "LinkedField",
            "name": "followers",
            "plural": false,
            "selections": (v23/*: any*/),
            "storageKey": "followers(first:10)"
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Followers_followers",
            "kind": "LinkedHandle",
            "name": "followers"
          },
          {
            "alias": null,
            "args": (v24/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v26/*: any*/),
                "storageKey": null
              },
              (v21/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v24/*: any*/),
            "filters": [
              "orderBy",
              "isFork"
            ],
            "handle": "connection",
            "key": "Repositories_repositories",
            "kind": "LinkedHandle",
            "name": "repositories"
          },
          {
            "alias": null,
            "args": (v27/*: any*/),
            "concreteType": "StarredRepositoryConnection",
            "kind": "LinkedField",
            "name": "starredRepositories",
            "plural": false,
            "selections": [
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "StarredRepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v26/*: any*/),
                "storageKey": null
              },
              (v21/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v27/*: any*/),
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
    "cacheID": "cbfb5240cf49d46f47efe1e59c33a1e4",
    "id": null,
    "metadata": {},
    "name": "viewerVIEWERQuery",
    "operationKind": "query",
    "text": "query viewerVIEWERQuery(\n  $isFork: Boolean\n  $orderBy: RepositoryOrder\n  $starOrder: StarOrder\n) {\n  viewer {\n    ...ProfileDetails\n    ...Following_following\n    ...Followers_followers\n    ...ViewerRepos_repositories_3LFRQw\n    ...ViewerStarerdRepos_repositories_fFbs1\n    id\n  }\n}\n\nfragment Followers_followers on User {\n  followers(first: 10) {\n    edges {\n      node {\n        ...PersonCard_user\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    totalCount\n  }\n  id\n}\n\nfragment Following_following on User {\n  following(first: 10) {\n    edges {\n      node {\n        ...PersonCard_user\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    totalCount\n  }\n  id\n}\n\nfragment PersonCard_user on User {\n  id\n  name\n  login\n  email\n  bio\n  avatarUrl\n  company\n  twitterUsername\n  createdAt\n  isFollowingViewer\n  viewerIsFollowing\n  isViewer\n  location\n  url\n}\n\nfragment ProfileDetails on User {\n  id\n  name\n  login\n  email\n  bio\n  avatarUrl\n  company\n  twitterUsername\n  createdAt\n  isFollowingViewer\n  viewerIsFollowing\n  isViewer\n  location\n  url\n}\n\nfragment ViewerRepos_repositories_3LFRQw on User {\n  repositories(first: 10, orderBy: $orderBy, isFork: $isFork) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        forkingAllowed\n        isFork\n        viewerHasStarred\n        viewerPermission\n        viewerCanAdminister\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 20) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment ViewerStarerdRepos_repositories_fFbs1 on User {\n  starredRepositories(first: 10, orderBy: $starOrder) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        nameWithOwner\n        description\n        pushedAt\n        diskUsage\n        url\n        visibility\n        forkCount\n        openGraphImageUrl\n        forkingAllowed\n        isFork\n        viewerHasStarred\n        viewerPermission\n        viewerCanAdminister\n        owner {\n          __typename\n          login\n          id\n          url\n          avatarUrl\n        }\n        languages(first: 20) {\n          edges {\n            node {\n              id\n              color\n              name\n            }\n          }\n        }\n        releases(first: 1) {\n          nodes {\n            name\n            publishedAt\n            id\n          }\n        }\n        stargazerCount\n        refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 2) {\n          edges {\n            node {\n              name\n              id\n              target {\n                __typename\n                ... on Commit {\n                  history(first: 1) {\n                    edges {\n                      node {\n                        committedDate\n                        author {\n                          name\n                        }\n                        message\n                        id\n                      }\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "932abd3fb1e6630a8f0fb8bf57f4d1b0";

export default node;
