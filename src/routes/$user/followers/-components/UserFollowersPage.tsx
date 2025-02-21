import { usePreloadedQuery } from "react-relay";
import { Navigate, useLoaderData } from "@tanstack/react-router";
import { UserFollowersFragment } from "./UserFollowersFragment";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { Suspense } from "react";
import { userFollowersReposQuery } from "..";
import { followersUserPageLoaderQuery } from "../__generated__/followersUserPageLoaderQuery.graphql";

interface UserFollowersPageProps {}

export function UserFollowersPage({}: UserFollowersPageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user/followers/" });
  const query = usePreloadedQuery<followersUserPageLoaderQuery>(
    userFollowersReposQuery,
    preloadedQueryRef
  );
  if (!query.user) {
    return <Navigate to=".." />;
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserFollowersFragment followers_key={query.user} />
      </Suspense>
    </div>
  );
}
