import { graphql } from "relay-runtime";
import { UserStats$key } from "./__generated__/UserStats.graphql";
import { useFragment } from "react-relay";
import { formatKilobytes } from "@/utils/bytes";

interface UserStatsProps {
  user_info_key?: UserStats$key | null;
}

export function UserStats({ user_info_key }: UserStatsProps) {
  const user_fragment = useFragment<UserStats$key>(UserStatsFragmant, user_info_key);
  const data = user_fragment!;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="stats  shadow gap-3">
        {/* Repository count */}
        <div className="stat">
          <div className="stat-title">Repository Count</div>
          <div className="stat-value">{data.repositories.totalCount} total</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Repository size</div>
          <div className="stat-value">
            {formatKilobytes(data.repositories.totalDiskUsage)}
          </div>
        </div>

        {/* Star count */}
        <div className="stat">
          <div className="stat-title">Starred Repos</div>
          <div className="stat-value">{data.starredRepositories.totalCount}</div>
        </div>
        {/* Following count */}
        <div className="stat">
          <div className="stat-title">Following</div>
          <div className="stat-value">{data.following.totalCount}</div>
        </div>

        {/* Followers count */}
        <div className="stat">
          <div className="stat-title">Followers</div>
          <div className="stat-value">{data.followers.totalCount}</div>
        </div>

        {/* Total commits */}
        <div className="stat">
          <div className="stat-title">Total commits</div>
          <div className="stat-value">{data.contributionsCollection.totalCommitContributions}</div>
        </div>

        {/* Total issues */}
        <div className="stat">
          <div className="stat-title">Total issues</div>
          <div className="stat-value">{data.contributionsCollection.totalIssueContributions}</div>
        </div>

        {/* Total pull requests */}
        <div className="stat">
          <div className="stat-title">Total pull requests</div>
          <div className="stat-value">
            {data.contributionsCollection.totalPullRequestContributions}
          </div>
        </div>

        {/* Total pull request reviews */}
        <div className="stat">
          <div className="stat-title">Total pull request reviews</div>
          <div className="stat-value">
            {data.contributionsCollection.totalPullRequestReviewContributions}
          </div>
        </div>

        {/* Total repositories with contributed issues */}
        <div className="stat">
          <div className="stat-title">Repos with issues contributed</div>
          <div className="stat-value">
            {data.contributionsCollection.totalRepositoriesWithContributedIssues}
          </div>
        </div>

        {/* Total repositories with contributed pull requests */}
        <div className="stat">
          <div className="stat-title">Repos with PRs contributed</div>
          <div className="stat-value">
            {data.contributionsCollection.totalRepositoriesWithContributedPullRequests}
          </div>
        </div>

        {/* Total repositories with contributed commits */}
        <div className="stat">
          <div className="stat-title">Repos with commits contributed</div>
          <div className="stat-value">
            {data.contributionsCollection.totalRepositoriesWithContributedCommits}
          </div>
        </div>

        {/* Total repositories with contributed pull request reviews */}
        <div className="stat">
          <div className="stat-title">Repos with PR reviews contributed</div>
          <div className="stat-value">
            {data.contributionsCollection.totalRepositoriesWithContributedPullRequestReviews}
          </div>
        </div>

        {/* Issues count */}
        <div className="stat">
          <div className="stat-title">Issues</div>
          <div className="stat-value">{data.issues.totalCount}</div>
        </div>

        {/* Pull requests count */}
        <div className="stat">
          <div className="stat-title">Pull requests</div>
          <div className="stat-value">{data.pullRequests.totalCount}</div>
        </div>

        {/* Organizations count */}
        <div className="stat">
          <div className="stat-title">Organizations</div>
          <div className="stat-value">{data.organizations.totalCount}</div>
        </div>

        {/* Gists count */}
        <div className="stat">
          <div className="stat-title">Gists</div>
          <div className="stat-value">{data.gists.totalCount}</div>
        </div>

        {/* Packages count */}
        <div className="stat">
          <div className="stat-title">Packages</div>
          <div className="stat-value">{data.packages.totalCount}</div>
        </div>

        {/* Repository discussions count */}
        <div className="stat">
          <div className="stat-title">Repository discussions</div>
          <div className="stat-value">{data.repositoryDiscussions.totalCount}</div>
        </div>

        {/* Sponsors count */}
        <div className="stat">
          <div className="stat-title">Sponsors</div>
          <div className="stat-value">{data.sponsors.totalCount}</div>
        </div>

        {/* Sponsoring count */}
        <div className="stat">
          <div className="stat-title">Sponsoring</div>
          <div className="stat-value">{data.sponsoring.totalCount}</div>
        </div>
      </div>
    </div>
  );
}
export const UserStatsFragmant = graphql`
  fragment UserStats on User {
    repositories(first: 1) {
      totalCount
      totalDiskUsage
    }

    starredRepositories(first: 1) {
      totalCount
      isOverLimit
    }

    followers(first: 1) {
      totalCount
    }
    following(first: 1) {
      totalCount
    }

    watching(first: 1) {
      totalCount
    }

    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalRepositoriesWithContributedIssues
      totalRepositoriesWithContributedPullRequests
      totalRepositoriesWithContributedCommits
      totalRepositoriesWithContributedPullRequestReviews
    }

    issues(first: 1) {
      totalCount
    }

    pullRequests(first: 1) {
      totalCount
    }

    organizations(first: 1) {
      totalCount
    }

    gists(first: 1) {
      totalCount
    }

    packages(first: 1) {
      totalCount
    }

    repositoryDiscussions(first: 1) {
      totalCount
    }

    sponsors(first: 1) {
      totalCount
    }
    sponsoring(first: 1) {
      totalCount
    }
  }
`;
