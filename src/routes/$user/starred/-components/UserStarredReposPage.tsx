import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { starredUserPageLoaderQuery } from "../__generated__/starredUserPageLoaderQuery.graphql";
import { useLoaderData } from "@tanstack/react-router";
import { Suspense } from "react";
import { usePreloadedQuery } from "react-relay";
import { UserStarredRepos } from "./UserStarredRepos";
import { userStarredReposQuery } from "..";


interface UserStarredRepospageProps {

}

export function UserStarredReposPage({}: UserStarredRepospageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user/starred/" });
  const query = usePreloadedQuery<starredUserPageLoaderQuery>(
    userStarredReposQuery,
    preloadedQueryRef
  );
  return (
    <div className="w-full h-full p-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserStarredRepos starred_repos_key={query.user} />
      </Suspense>
    </div>
  );
}

