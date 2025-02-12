import { graphql } from "relay-runtime";
import {  UserRepos_repositories$key } from "./__generated__/UserRepos_repositories.graphql";
import { usePaginationFragment } from "react-relay";
import { UserReposPageQuery } from "./__generated__/UserReposPageQuery.graphql";

interface UserReposProps {
  user_repos_key?: UserRepos_repositories$key | null;
}

export function UserRepos({user_repos_key}:UserReposProps){
      const repo_fragment = usePaginationFragment<UserReposPageQuery, UserRepos_repositories$key>(
        RepositoriesFragment,
        user_repos_key
      );

      const repo_response = repo_fragment.data?.repositories;
      const repos = repo_response?.edges;
      const is_all_selected = selected && selected.length === repos?.length ? true : false;
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
      {repos &&
        repos.map((edge) => {
          return (
            <RepoCard
              key={edge?.node?.id}
              edge={edge}
              local_viewer={local_viewer}
              editing={editing}
              selected={selected ? selected.some((i) => i.id === edge?.node?.id) : false}
              selectItem={selectItem}
              unselectItem={unselectItem}
            />
          );
        })}
    </ul>
  </div>
);
}
export const RepositoriesFragment = graphql`
  fragment UserRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    orderBy: { type: "RepositoryOrder", defaultValue: { field: PUSHED_AT, direction: DESC } }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "RepositoriesPaginationQuery") {
    repositories(first: $first, after: $after, orderBy: $orderBy, isFork: $isFork)
      @connection(key: "Repositories_repositories") {
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
          isInOrganization
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

