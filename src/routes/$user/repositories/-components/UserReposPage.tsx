import { useParams, useSearch } from "@tanstack/react-router";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { UserReposPageQuery } from "./__generated__/UserReposPageQuery.graphql";
import { UserRepos } from "./UserRepos";

interface UserReposPageProps {}

export function UserReposPage({}: UserReposPageProps) {
      const {user} = useParams({from:"/$user"})
      const {isFork,orderBy} = useSearch({
        from:"/$user/repositories/"
      });
      const query = useLazyLoadQuery<UserReposPageQuery>(
        userQuery,
        {
          login: user,
          isFork,
          orderBy: {
            field: orderBy?.field ?? "PUSHED_AT",
            direction: orderBy?.direction ?? "DESC",
          }
        },{
            fetchKey: "user/usrrtabs",
            fetchPolicy: "store-and-network",
        }
      );
  return (
  <div className="w-full h-full p-3">
    <UserRepos user_repos_key={query.user}/>
  </div>
);
}

export const userQuery = graphql`
  query UserReposPageQuery(
    $login: String!
    $isFork: Boolean
    $orderBy: RepositoryOrder
    # $starOrder: StarOrder
  ) {
    user(login: $login) {
      #   ...Following_following
      #   ...Followers_followers
      ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      #   ...ViewerStarerdRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
