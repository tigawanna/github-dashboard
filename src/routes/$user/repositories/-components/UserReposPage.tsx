import { useLoaderData} from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { UserRepos } from "./UserRepos";

import { UserPageLoaderQuery } from "../../__generated__/UserPageLoaderQuery.graphql";
import { userQuery } from "../../layout";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { Suspense } from "react";

interface UserReposPageProps {}

export function UserReposPage({}: UserReposPageProps) {
  const preloadedQueryRef = useLoaderData({ from: "/$user" });
  const query = usePreloadedQuery<UserPageLoaderQuery>(userQuery, preloadedQueryRef);
  // const query = useLazyLoadQuery<UserReposPageQuery>(
  //   userQuery,
  //   {
  //     login: user,
  //     isFork,
  //     orderBy: {
  //       field: orderBy?.field ?? "PUSHED_AT",
  //       direction: orderBy?.direction ?? "DESC",
  //     }
  //   },{
  //       fetchKey: "user/repos",
  //       fetchPolicy: "store-and-network",
  //   }
  // );
  return (
    <div className="w-full h-full p-3">
      <Suspense fallback={<CardsListSuspenseFallback />}>
        <UserRepos user_repos_key={query.user} />
      </Suspense>
    </div>
  );
}
