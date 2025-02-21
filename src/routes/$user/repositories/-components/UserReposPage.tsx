import { useLoaderData} from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { UserRepos } from "./UserRepos";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { repositoriesUserPageLoaderQuery } from "../__generated__/repositoriesUserPageLoaderQuery.graphql";
import { Suspense } from "react";
import { userReposQuery } from "..";

interface UserReposPageProps {}

export function UserReposPage({}: UserReposPageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user/repositories/" });
  const query = usePreloadedQuery<repositoriesUserPageLoaderQuery>(
    userReposQuery,
    preloadedQueryRef
  );
  return (
    <div className="w-full h-full p-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserRepos user_repos_key={query.user} />
      </Suspense>
    </div>
  );
}
