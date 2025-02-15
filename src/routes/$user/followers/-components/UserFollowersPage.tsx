import { graphql } from "relay-runtime";
import { UserFollowersPageQuery } from "./__generated__/UserFollowersPageQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import { Navigate, useParams } from "@tanstack/react-router";
import { UserFollowersFragment } from "./UserFollowersFragment";

interface UserFollowersPageProps {}

export function UserFollowersPage({}: UserFollowersPageProps) {
  const { user } = useParams({ from: "/$user" });

  const query = useLazyLoadQuery<UserFollowersPageQuery>(
    userQuery,
    {
      login: user,
    },
    {
      fetchKey: "user/usrrtabs",
      fetchPolicy: "store-and-network",
    }
  );
  if(!query.user){
    return <Navigate to=".."/>
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <UserFollowersFragment followers_key={query.user}/>
    </div>
  );
}

export const userQuery = graphql`
  query UserFollowersPageQuery(
    $login: String! # $isFork: Boolean
  ) # $orderBy: RepositoryOrder
  # $starOrder: StarOrder
  {
    user(login: $login) {
      ...UserFollowersFragment
      #   ...Following_following
      #   ...Followers_followers
      #   ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      #   ...ViewerStarerdRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
