import { graphql, usePaginationFragment } from "@/lib/graphql/relay/modules";
import { ViewerStarerdRepos_repositories$key } from "./__generated__/ViewerStarerdRepos_repositories.graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FilterStarredRepos } from "./components";
import { LoadMoreButton } from "../shared";
import { RepoCard } from "../repos/RepoCard";
dayjs.extend(relativeTime);

interface ViewerStarerdReposProps {
  viewer: ViewerStarerdRepos_repositories$key;
}

export function ViewerStarerdRepos({viewer}: ViewerStarerdReposProps) {
    const viewer_repo_fragment = usePaginationFragment<any,ViewerStarerdRepos_repositories$key>(ViewerStarerdReposFragment, viewer);
    const repo_response = viewer_repo_fragment.data?.starredRepositories
    const repos = repo_response?.edges;
  return (
    <div className="w-full h-full flex gap-2 flex-col  items-center justify-center">
      <FilterStarredRepos />
      <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            return <RepoCard key={edge?.node?.id} edge={edge} />;
          })}
      </ul>

      <LoadMoreButton frag={viewer_repo_fragment} />
    </div>
  );
}

export const ViewerStarerdReposFragment = graphql`
  fragment ViewerStarerdRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    orderBy: {
      type: "StarOrder"
      defaultValue: { field: STARRED_AT, direction: DESC }
    }
  )
  @refetchable(queryName: "StarredRepositoriesPaginationQuery") {
    starredRepositories(first: $first, after: $after, orderBy: $orderBy)
      @connection(key: "Viewer_starredRepositories") {
      totalCount
      edges {
        node {
          id
          name
          nameWithOwner
          description
          pushedAt
          diskUsage
          url
          visibility
          forkCount
          openGraphImageUrl

          viewerHasStarred
          viewerPermission
          viewerCanAdminister

          owner {
            login
            id
            url
            avatarUrl
          }

          languages(first: $first) {
            edges {
              node {
                id
                color
                name
              }
            }
          }
          releases(first: 1) {
            nodes {
              name
              publishedAt
            }
          }
          stargazerCount
          refs(
            refPrefix: "refs/heads/"
            orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
            first: 2
          ) {
            edges {
              node {
                name
                id
                target {
                  ... on Commit {
                    history(first: 1) {
                      edges {
                        node {
                          committedDate
                          author {
                            name
                          }
                          message
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
