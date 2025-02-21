import { usePreloadedQuery } from "react-relay";
import { Navigate, useLoaderData } from "@tanstack/react-router";
import { UserFollowingFragment } from "./UserFollowingFragment";
import { UserPageLoaderQuery } from "../../__generated__/UserPageLoaderQuery.graphql";

import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { Suspense } from "react";
import { userFollowingReposQuery } from "..";

interface UserFollowingPageProps {}

export function UserFollowingPage({}: UserFollowingPageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user/following/" });
  const query = usePreloadedQuery<UserPageLoaderQuery>(userFollowingReposQuery, preloadedQueryRef);
  if (!query.user) {
    return <Navigate to=".." />;
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserFollowingFragment following_key={query.user} />
      </Suspense>
    </div>
  );
}
