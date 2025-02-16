
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";

import { Repos } from "./Repos";
import { UserReposPageQuery } from "./__generated__/UserReposPageQuery.graphql";

interface ReposPageProps {}


export function ReposPage({}: ReposPageProps) {
     const user = "tigawanna"
      const query = useLazyLoadQuery<UserReposPageQuery>(
        userQuery,
        {
          login: user,
          isFork: false,
          orderBy: {
            field:  "PUSHED_AT",
            direction:  "DESC",
          }
        },{
            fetchKey: "user/repos",
            fetchPolicy: "store-and-network",
        }
      );
  return (
  <div className="w-full h-full p-3 @container">
    <Repos user_repos_key={query.user}/>
  </div>
);
}

export const userQuery = graphql`
  query ReposPageQuery(
    $login: String!
    $isFork: Boolean
    $orderBy: RepositoryOrder
    # $starOrder: StarOrder
  ) {
    user(login: $login) {
      #   ...Following_following
      #   ...Followers_followers
      ...Repos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      #   ...ViewerStarerdRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
