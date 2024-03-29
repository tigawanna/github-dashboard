import { graphql, usePaginationFragment } from "@/lib/relay/modules";
import { ViewerStarerdRepos_repositories$key } from "./__generated__/ViewerStarerdRepos_repositories.graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FilterStarredRepos } from "./components";
import { LoadMoreButton } from "../shared";
import { RepoCard } from "./RepoCard";
import { LocalViewer } from "@/lib/relay/RelayEnvironment";
import { useRepoSelector } from "./hooks/selectRepos";
import { viewerVIEWERQuery } from "../../__generated__/viewerVIEWERQuery.graphql";

dayjs.extend(relativeTime);

interface ViewerStarerdReposProps {
  viewer: ViewerStarerdRepos_repositories$key;
  local_viewer: LocalViewer | null;
}

export function ViewerStarerdRepos({
  viewer,
  local_viewer,
}: ViewerStarerdReposProps) {
  const viewer_repo_fragment = usePaginationFragment<
    viewerVIEWERQuery,
    ViewerStarerdRepos_repositories$key
  >(ViewerStarerdReposFragment, viewer);
  const repo_response = viewer_repo_fragment.data?.starredRepositories;
  const repos = repo_response?.edges;

  const { unselectItem, selectItem } = useRepoSelector();

  return (
    <div className="w-full h-full flex gap-2 flex-col  items-center justify-center">
      <div className="w-full bg-base-200 sticky top-0 flex flex-wrap justify-evenly">
        <FilterStarredRepos />
      </div>
      <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            return (
              <RepoCard
                key={edge?.node?.id}
                edge={edge}
                local_viewer={local_viewer}
                editing={false}
                selected={false}
                selectItem={selectItem}
                unselectItem={unselectItem}
              />
            );
          })}
      </ul>

      <LoadMoreButton frag={viewer_repo_fragment} />
    </div>
  );
}

export const ViewerStarerdReposFragment = graphql`
  fragment ViewerStarerdRepos_repositories on User
  @argumentDefinitions(
    firstStarredRepos: { type: "Int", defaultValue: 10 }
    afterStarredRepo: { type: "String" }
    orderByStarredRepos: {
      type: "StarOrder"
      defaultValue: { field: STARRED_AT, direction: DESC }
    }
  )
  @refetchable(queryName: "StarredRepositoriesPaginationQuery") {
    starredRepositories(
      first: $firstStarredRepos
      after: $afterStarredRepo
      orderBy: $orderByStarredRepos
    ) @connection(key: "Viewer_starredRepositories") {
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
          isInOrganization
          forkCount
          openGraphImageUrl
          forkingAllowed
          isFork
          viewerHasStarred
          viewerPermission
          viewerCanAdminister

          owner {
            login
            id
            url
            avatarUrl
          }

          languages(first: 20) {
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
