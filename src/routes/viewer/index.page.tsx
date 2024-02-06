import { graphql, useLazyLoadQuery } from "@/lib/graphql/relay/modules";
import { PageProps, useLocation } from "rakkasjs";
import {
  RepositoryOrderField,
  viewerVIEWERQuery,
} from "./__generated__/viewerVIEWERQuery.graphql";
import { GithubUserTabs } from "./components/GithubUserTabs";

export default function ViewerPage({}: PageProps) {
  const { current } = useLocation();

  const is_fork =
    current.searchParams.get("ifk") ?? ("false" as "true" | "false");
  const order_by = current.searchParams.get("oBy") as RepositoryOrderField;
  const order_by_dir = current.searchParams.get("dir") as "ASC" | "DESC";
  const star_order_by_dir = current.searchParams.get("sDir") as "ASC" | "DESC";
  const isFork = is_fork === "true" ? true : false;

  const query = useLazyLoadQuery<viewerVIEWERQuery>(
    rootViewerquery,
    {
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
      fetchKey: "viewer/usrrtabs",
      fetchPolicy: "store-and-network",
    },
  );

  return (
    <div className="w-full h-full   ">
      <GithubUserTabs key="viewer/usrrtabs" refs={query.viewer} />
    </div>
  );
}

export const rootViewerquery = graphql`
  query viewerVIEWERQuery(
    $isFork: Boolean
    $orderBy: RepositoryOrder
    $starOrder: StarOrder
  ) {
    viewer {
      ...ProfileDetails
      ...Following_following
      ...Followers_followers
      ...ViewerRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      ...ViewerStarerdRepos_repositories @arguments(orderBy: $starOrder)
    }
  }
`;
