import { useLoaderData} from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { UserRepos } from "./UserRepos";
import { userQuery } from "../../layout";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { Suspense } from "react";
import { layoutUserPageLoaderQuery } from "../../__generated__/layoutUserPageLoaderQuery.graphql";

interface UserReposPageProps {}

export function UserReposPage({}: UserReposPageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user/repositories/" });
  const query = usePreloadedQuery<layoutUserPageLoaderQuery>(userQuery, preloadedQueryRef);
  return (
    <div className="w-full h-full p-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserRepos user_repos_key={query.user} />
      </Suspense>
    </div>
  );
}
