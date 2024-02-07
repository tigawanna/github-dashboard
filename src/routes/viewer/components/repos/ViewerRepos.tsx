import { graphql, usePaginationFragment } from "@/lib/graphql/relay/modules";
import { ViewerRepos_repositories$key } from "./__generated__/ViewerRepos_repositories.graphql";
import { FilterRepos } from "./components";
import { LoadMoreButton } from "../shared";
import { RepoCard } from "./RepoCard";

interface ViewerReposProps {
  viewer: ViewerRepos_repositories$key;
}

export function ViewerRepos({ viewer }: ViewerReposProps) {
  const repo_fragment = usePaginationFragment<
    any,
    ViewerRepos_repositories$key
  >(RepositoriesFragment, viewer);

  const repo_response = repo_fragment.data?.repositories;
  const repos = repo_response?.edges;

  return (
    <div className="w-full h-full flex gap-2 flex-col  items-center justify-center">
      {/* add filter controls */}
      <div className="w-full border border-accent bg-base-200 sticky top-0">
        <FilterRepos />
      </div>

      <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            return <RepoCard key={edge?.node?.id} edge={edge} />;
          })}
      </ul>

      <LoadMoreButton frag={repo_fragment} />
    </div>
  );
}

export const RepositoriesFragment = graphql`
  fragment ViewerRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    orderBy: {
      type: "RepositoryOrder"
      defaultValue: { field: PUSHED_AT, direction: DESC }
    }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "RepositoriesPaginationQuery") {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      isFork: $isFork
    ) @connection(key: "Repositories_repositories") {
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
