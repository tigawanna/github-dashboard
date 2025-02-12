/**
 * @generated SignedSource<<49e71821bf605cf67bd5b6313f4b3c94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserStats$data = {
  readonly contributionsCollection: {
    readonly totalCommitContributions: number;
    readonly totalIssueContributions: number;
    readonly totalPullRequestContributions: number;
    readonly totalPullRequestReviewContributions: number;
    readonly totalRepositoriesWithContributedCommits: number;
    readonly totalRepositoriesWithContributedIssues: number;
    readonly totalRepositoriesWithContributedPullRequestReviews: number;
    readonly totalRepositoriesWithContributedPullRequests: number;
  };
  readonly followers: {
    readonly totalCount: number;
  };
  readonly following: {
    readonly totalCount: number;
  };
  readonly gists: {
    readonly totalCount: number;
  };
  readonly issues: {
    readonly totalCount: number;
  };
  readonly organizations: {
    readonly totalCount: number;
  };
  readonly packages: {
    readonly totalCount: number;
  };
  readonly pullRequests: {
    readonly totalCount: number;
  };
  readonly repositories: {
    readonly totalCount: number;
    readonly totalDiskUsage: number;
  };
  readonly repositoryDiscussions: {
    readonly totalCount: number;
  };
  readonly sponsoring: {
    readonly totalCount: number;
  };
  readonly sponsors: {
    readonly totalCount: number;
  };
  readonly starredRepositories: {
    readonly isOverLimit: boolean;
    readonly totalCount: number;
  };
  readonly watching: {
    readonly totalCount: number;
  };
  readonly " $fragmentType": "UserStats";
};
export type UserStats$key = {
  readonly " $data"?: UserStats$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserStats">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserStats",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "RepositoryConnection",
      "kind": "LinkedField",
      "name": "repositories",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
      "args": (v0/*: any*/),
      "concreteType": "StarredRepositoryConnection",
      "kind": "LinkedField",
      "name": "starredRepositories",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
      "args": (v0/*: any*/),
      "concreteType": "FollowerConnection",
      "kind": "LinkedField",
      "name": "followers",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "followers(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "FollowingConnection",
      "kind": "LinkedField",
      "name": "following",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "following(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "RepositoryConnection",
      "kind": "LinkedField",
      "name": "watching",
      "plural": false,
      "selections": (v2/*: any*/),
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
      "args": (v0/*: any*/),
      "concreteType": "IssueConnection",
      "kind": "LinkedField",
      "name": "issues",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "issues(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "PullRequestConnection",
      "kind": "LinkedField",
      "name": "pullRequests",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "pullRequests(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "OrganizationConnection",
      "kind": "LinkedField",
      "name": "organizations",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "organizations(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "GistConnection",
      "kind": "LinkedField",
      "name": "gists",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "gists(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "PackageConnection",
      "kind": "LinkedField",
      "name": "packages",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "packages(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "DiscussionConnection",
      "kind": "LinkedField",
      "name": "repositoryDiscussions",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "repositoryDiscussions(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "SponsorConnection",
      "kind": "LinkedField",
      "name": "sponsors",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "sponsors(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "SponsorConnection",
      "kind": "LinkedField",
      "name": "sponsoring",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "sponsoring(first:1)"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "230fa0bfa2227f2da79ce7dcff4b539d";

export default node;
