/**
 * @generated SignedSource<<4fb86ca6fc34f315f9610904b9b96233>>
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
    readonly " $fragmentSpreads": FragmentRefs<"Branches_refs" | "GeneralInfo_info" | "Stars_stargazers">;
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v12/*: any*/),
    (v13/*: any*/),
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
v15 = [
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
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneralInfo_info"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Stars_stargazers"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Branches_refs"
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
            "args": (v5/*: any*/),
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Topic",
                    "kind": "LinkedField",
                    "name": "topic",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v3/*: any*/)
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
            "args": (v5/*: any*/),
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
                  (v7/*: any*/),
                  (v6/*: any*/),
                  (v3/*: any*/)
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
              (v7/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/)
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
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
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
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v14/*: any*/)
            ],
            "storageKey": "stargazers(first:5)"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Stars_stargazers",
            "kind": "LinkedHandle",
            "name": "stargazers"
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "concreteType": "RefConnection",
            "kind": "LinkedField",
            "name": "refs",
            "plural": false,
            "selections": [
              (v16/*: any*/),
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
                      (v6/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "target",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v3/*: any*/),
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
                                  (v16/*: any*/),
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
                                              (v6/*: any*/),
                                              (v10/*: any*/)
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
                                          (v4/*: any*/),
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
                                          (v3/*: any*/),
                                          (v11/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v9/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v14/*: any*/)
                                ],
                                "storageKey": "history(first:5)"
                              },
                              {
                                "alias": null,
                                "args": (v8/*: any*/),
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
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
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
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "refs(first:3,orderBy:{\"direction\":\"DESC\",\"field\":\"TAG_COMMIT_DATE\"},refPrefix:\"refs/heads/\")"
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "filters": [
              "refPrefix",
              "orderBy"
            ],
            "handle": "connection",
            "key": "Branches_refs",
            "kind": "LinkedHandle",
            "name": "refs"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9452980ae569d0793756254a21fe57c7",
    "id": null,
    "metadata": {},
    "name": "RepoFullRepositoryQuery",
    "operationKind": "query",
    "text": "query RepoFullRepositoryQuery(\n  $repoowner: String!\n  $reponame: String!\n) {\n  repository(owner: $repoowner, name: $reponame) {\n    ...GeneralInfo_info\n    ...Stars_stargazers\n    ...Branches_refs\n    id\n  }\n}\n\nfragment Branches_refs on Repository {\n  refs(refPrefix: \"refs/heads/\", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 3) {\n    totalCount\n    edges {\n      node {\n        name\n        id\n        target {\n          __typename\n          ...Commits_history\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment Commits_history on Commit {\n  history(first: 5) {\n    totalCount\n    edges {\n      node {\n        committedDate\n        author {\n          name\n          email\n        }\n        message\n        url\n        pushedDate\n        authoredDate\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment GeneralInfo_info on Repository {\n  id\n  url\n  description\n  nameWithOwner\n  openGraphImageUrl\n  projectsUrl\n  projectsResourcePath\n  pushedAt\n  diskUsage\n  homepageUrl\n  resourcePath\n  visibility\n  viewerPermission\n  repositoryTopics(first: 20) {\n    nodes {\n      id\n      topic {\n        name\n        id\n      }\n    }\n  }\n  languages(first: 20) {\n    nodes {\n      color\n      name\n      id\n    }\n  }\n  primaryLanguage {\n    color\n    id\n    name\n  }\n  forkCount\n  stargazerCount\n  hasDiscussionsEnabled\n  hasIssuesEnabled\n  hasProjectsEnabled\n  hasWikiEnabled\n  forkingAllowed\n  isArchived\n  isDisabled\n  isFork\n  isLocked\n  isPrivate\n  isTemplate\n  isUserConfigurationRepository\n  viewerHasStarred\n  viewerCanAdminister\n}\n\nfragment Stars_stargazers on Repository {\n  stargazers(first: 5) {\n    edges {\n      cursor\n      node {\n        name\n        email\n        avatarUrl\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "daa28ca165b367fd06f90a0bfc1b0317";

export default node;
