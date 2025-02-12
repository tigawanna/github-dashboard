import { graphql } from "relay-runtime";
import { UserInfo } from "./UserInfo";
import { useLazyLoadQuery } from "react-relay";
import { UserPageQuery } from "./__generated__/UserPageQuery.graphql";
import { useParams } from "@tanstack/react-router";
import { UserStats } from "./UserStats";

interface UserPageProps {

}

export function UserPage({}:UserPageProps){
  const {user} = useParams({from:"/$user"})
  const query = useLazyLoadQuery<UserPageQuery>(
    userQuery,
    {
      login: user,
    //   isFork,
    //   orderBy: {
    //     field: order_by ?? "PUSHED_AT",
    //     direction: order_by_dir ?? "DESC",
    //   },
    //   starOrder: {
    //     direction: star_order_by_dir ?? "DESC",
    //     field: "STARRED_AT",
    //   },
    // },
    // {
    //   fetchKey: "user/usrrtabs",
    //   fetchPolicy: "store-and-network",
    }
  );

return (
 <div className='w-full h-full min-h-screen flex flex-col items-center '>
    <UserInfo user_info_key={query.user}/>
    <UserStats user_info_key={query.user}/>
 </div>
);
}

export const userQuery = graphql`
  query UserPageQuery($login: String!) # $isFork: Boolean
  # $orderBy: RepositoryOrder
  # $starOrder: StarOrder
  {
    user(login: $login) {
      ...UserInfo
      ...UserStats
      #   ...Following_following
      #   ...Followers_followers
      #   ...ViewerRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      #   ...ViewerStarerdRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
