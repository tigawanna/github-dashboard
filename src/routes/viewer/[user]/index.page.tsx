import { graphql, useLazyLoadQuery } from "@/lib/graphql/relay/modules";
import { PageProps, useLocation } from "rakkasjs";
import {
  RepositoryOrderField,
  UserQuery,
} from "./__generated__/UserQuery.graphql";
import { GithubUserTabs } from "../components/GithubUserTabs";

export default function ViewerPage({ params }: PageProps) {
  const user = params.user;
  const { current } = useLocation();
  const is_fork =
    current.searchParams.get("ifk") ?? ("false" as "true" | "false");
  const order_by = current.searchParams.get("oBy") as RepositoryOrderField;
  const order_by_dir = current.searchParams.get("dir") as "ASC" | "DESC";
  const isFork = is_fork === "true" ? true : false;
  const star_order_by_dir = current.searchParams.get("sDir") as "ASC" | "DESC";
  const query = useLazyLoadQuery<UserQuery>(
    userQuery,
    {
      login: user,
      isFork,
      orderBy: {
        field: order_by ?? "PUSHED_AT",
        direction: order_by_dir ?? "DESC",
      },
      starOrder: {
        direction: star_order_by_dir ?? "DESC",
        field: "STARRED_AT",
      },
    },
    {
      fetchKey:"user/usrrtabs",
      fetchPolicy: "store-and-network"
    },
  );

  return (
    <div className="w-full h-full   overflow-auto ">
      <GithubUserTabs
      profile_info_key={query.user}
        user_info$key={query.user}
        viewerRepos_repositories$key={query.user}
        viewerStarerdRepos_repositories$key={query.user}
        key="user/usrrtabs"
      />
    </div>
  );
}

export const userQuery = graphql`
  query UserQuery(
    $login: String!
    $isFork: Boolean
    $orderBy: RepositoryOrder
    $starOrder: StarOrder
  ) {
    user(login: $login) {
      ...viewer_info
      ...ProfileDetails
      ...ViewerRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      ...ViewerStarerdRepos_repositories @arguments(orderBy: $starOrder)
    }
  }
`;
