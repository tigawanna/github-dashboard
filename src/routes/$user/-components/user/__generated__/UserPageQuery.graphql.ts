/**
 * @generated SignedSource<<d8274ac41f6288d0f56dc7af3d54e0d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserPageQuery$variables = {
  login: string;
};
export type UserPageQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UserInfo" | "UserStats">;
  } | null | undefined;
};
export type UserPageQuery = {
  response: UserPageQuery$data;
  variables: UserPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "login"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "login",
    "variableName": "login"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserInfo"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserStats"
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
    "name": "UserPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
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
            "name": "name",
            "storageKey": null
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
            "name": "email",
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
            "name": "avatarUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "company",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "twitterUsername",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowingViewer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "viewerIsFollowing",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isViewer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location",
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
            "args": (v2/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalDiskUsage",
                "storageKey": null
              }
            ],
            "storageKey": "repositories(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "StarredRepositoryConnection",
            "kind": "LinkedField",
            "name": "starredRepositories",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isOverLimit",
                "storageKey": null
              }
            ],
            "storageKey": "starredRepositories(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FollowerConnection",
            "kind": "LinkedField",
            "name": "followers",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "followers(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FollowingConnection",
            "kind": "LinkedField",
            "name": "following",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "following(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "watching",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "watching(first:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ContributionsCollection",
            "kind": "LinkedField",
            "name": "contributionsCollection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCommitContributions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalIssueContributions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalPullRequestContributions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalPullRequestReviewContributions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalRepositoriesWithContributedIssues",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalRepositoriesWithContributedPullRequests",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalRepositoriesWithContributedCommits",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalRepositoriesWithContributedPullRequestReviews",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "IssueConnection",
            "kind": "LinkedField",
            "name": "issues",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "issues(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "PullRequestConnection",
            "kind": "LinkedField",
            "name": "pullRequests",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "pullRequests(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "OrganizationConnection",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "organizations(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "GistConnection",
            "kind": "LinkedField",
            "name": "gists",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "gists(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "PackageConnection",
            "kind": "LinkedField",
            "name": "packages",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "packages(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "DiscussionConnection",
            "kind": "LinkedField",
            "name": "repositoryDiscussions",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "repositoryDiscussions(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SponsorConnection",
            "kind": "LinkedField",
            "name": "sponsors",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "sponsors(first:1)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "SponsorConnection",
            "kind": "LinkedField",
            "name": "sponsoring",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": "sponsoring(first:1)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "11540771146442166f0cbfc46d62175b",
    "id": null,
    "metadata": {},
    "name": "UserPageQuery",
    "operationKind": "query",
    "text": "query UserPageQuery(\n  $login: String!\n) {\n  user(login: $login) {\n    ...UserInfo\n    ...UserStats\n    id\n  }\n}\n\nfragment UserInfo on User {\n  id\n  name\n  login\n  email\n  bio\n  avatarUrl\n  company\n  twitterUsername\n  createdAt\n  isFollowingViewer\n  viewerIsFollowing\n  isViewer\n  location\n  url\n}\n\nfragment UserStats on User {\n  repositories(first: 1) {\n    totalCount\n    totalDiskUsage\n  }\n  starredRepositories(first: 1) {\n    totalCount\n    isOverLimit\n  }\n  followers(first: 1) {\n    totalCount\n  }\n  following(first: 1) {\n    totalCount\n  }\n  watching(first: 1) {\n    totalCount\n  }\n  contributionsCollection {\n    totalCommitContributions\n    totalIssueContributions\n    totalPullRequestContributions\n    totalPullRequestReviewContributions\n    totalRepositoriesWithContributedIssues\n    totalRepositoriesWithContributedPullRequests\n    totalRepositoriesWithContributedCommits\n    totalRepositoriesWithContributedPullRequestReviews\n  }\n  issues(first: 1) {\n    totalCount\n  }\n  pullRequests(first: 1) {\n    totalCount\n  }\n  organizations(first: 1) {\n    totalCount\n  }\n  gists(first: 1) {\n    totalCount\n  }\n  packages(first: 1) {\n    totalCount\n  }\n  repositoryDiscussions(first: 1) {\n    totalCount\n  }\n  sponsors(first: 1) {\n    totalCount\n  }\n  sponsoring(first: 1) {\n    totalCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "ea80781ff906258232b05ec2cce3a310";

export default node;
