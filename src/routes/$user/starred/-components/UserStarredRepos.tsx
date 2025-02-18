import { graphql } from "relay-runtime";
import { UserStarredRepos_repositories$key } from "./__generated__/UserStarredRepos_repositories.graphql";
import { usePaginationFragment } from "react-relay";
import { UserReposPageQuery } from "../../repositories/-components/__generated__/UserReposPageQuery.graphql";
import { RepoCard } from "../../repositories/-components/repo-card/RepoCard";
import { useParams } from "@tanstack/react-router";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";

interface UserStarredReposProps {
  starred_repos_key?: UserStarredRepos_repositories$key | null;
}

export function UserStarredRepos({ starred_repos_key }: UserStarredReposProps) {
const { user } = useParams({ from: "/$user" });
  const fragData = usePaginationFragment<UserReposPageQuery, UserStarredRepos_repositories$key>(
    UserStarredReposFragment,
    starred_repos_key
  );
    const repo_response = fragData.data?.starredRepositories;
    const repos = repo_response?.edges;


  return(
  <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-wrap gap-5 w-full h-full @container/repos items-center justify-center">
        {repos &&
          repos.map((edge, idx) => {
            if (!edge?.node) return;
            return (
              <RepoCard
                user={user}
                key={edge?.node?.id}
                edge={edge}
                // local_viewer={viewer}
                // editing={editing}
                // getSelected={(id) => selected?.some((i) => i.id === id) ?? false}
                // selectItem={selectItem}
                // unselectItem={unselectItem}
              />
            );
          })}
        <LoadMoreButton frag={fragData} />
      </ul>
  </div>
  );
}


export const UserStarredReposFragment = graphql`
  fragment UserStarredRepos_repositories on User
  @argumentDefinitions(
    firstStarredRepos: { type: "Int", defaultValue: 24 }
    afterStarredRepo: { type: "String" }
    orderByStarredRepos: { type: "StarOrder", defaultValue: { field: STARRED_AT, direction: DESC } }
  )
  @refetchable(queryName: "StarredRepositoriesPaginationQuery") {
    starredRepositories(
      first: $firstStarredRepos
      after: $afterStarredRepo
      orderBy: $orderByStarredRepos
    ) @connection(key: "UserStarredRepos_starredRepositories") {
      totalCount
      edges {
        cursor
        node {
          id
          name
          nameWithOwner
          viewerPermission
          ...RepoCard_reposiotory
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
