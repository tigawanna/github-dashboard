import { graphql } from "relay-runtime";

import { useLazyLoadQuery } from "react-relay";
import { Navigate, useParams } from "@tanstack/react-router";
import { UserFollowingFragment } from "./UserFollowingFragment";
import { UserFollowingPageQuery } from "./__generated__/UserFollowingPageQuery.graphql";

interface UserFollowingPageProps {}

export function UserFollowingPage({}: UserFollowingPageProps) {
  const { user } = useParams({ from: "/$user" });

  const query = useLazyLoadQuery<UserFollowingPageQuery>(
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
      <UserFollowingFragment following_key={query.user} />
    </div>
  );
}

export const userQuery = graphql`
  query UserFollowingPageQuery(
    $login: String! # $isFork: Boolean
  ) # $orderBy: RepositoryOrder
  # $starOrder: StarOrder
  {
    user(login: $login) {
      ...UserFollowingFragment
      #   ...Following_following
      #   ...Followers_followers
      #   ...UserRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      #   ...ViewerStarerdRepos_repositories @arguments(orderByStarredRepos: $starOrder)
    }
  }
`;
