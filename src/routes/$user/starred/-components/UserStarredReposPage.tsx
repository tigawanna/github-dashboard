import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { useLoaderData } from "@tanstack/react-router";
import { Suspense } from "react";
import { usePreloadedQuery } from "react-relay";
import { userQuery } from "../../layout";
import { UserStarredRepos } from "./UserStarredRepos";
import { layoutUserPageLoaderQuery } from "../../__generated__/layoutUserPageLoaderQuery.graphql";


interface UserStarredRepospageProps {

}

export function UserStarredReposPage({}: UserStarredRepospageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user" });
  const query = usePreloadedQuery<layoutUserPageLoaderQuery>(userQuery, preloadedQueryRef);
  return (
    <div className="w-full h-full p-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserStarredRepos starred_repos_key={query.user} />
      </Suspense>
    </div>
  );
}

