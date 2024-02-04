import {
  graphql,
  useFragment,
  useLazyLoadQuery,
} from "@/lib/graphql/relay/modules";
import { PageProps, useLocation } from "rakkasjs";
import {
  RepositoriesFragment,
  ViewerRepos,
} from "./components/repos/ViewerRepos";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

import {
  RepositoryOrderField,
  viewerVIEWERQuery,
} from "./__generated__/viewerVIEWERQuery.graphql";
import { viewer_info$key } from "./__generated__/viewer_info.graphql";

import { ViewerRepos_repositories$key } from "./components/repos/__generated__/ViewerRepos_repositories.graphql";
import {
  ViewerStarerdRepos,
  ViewerStarerdReposFragment,
} from "./components/staring/ViewerStarerdRepos";
import {
  ViewerStarerdRepos_repositories$data,
  ViewerStarerdRepos_repositories$key,
} from "./components/staring/__generated__/ViewerStarerdRepos_repositories.graphql";
import { GithubUserTabs } from "./components/GithubUserTabs";
export default function ViewerPage({}: PageProps) {
  const { current } = useLocation();

  const is_fork =
    current.searchParams.get("ifk") ?? ("false" as "true" | "false");
  const order_by = current.searchParams.get("oBy") as RepositoryOrderField;
  const order_by_dir = current.searchParams.get("dir") as "ASC" | "DESC";
  const isFork = is_fork === "true" ? true : false;

  const query = useLazyLoadQuery<viewerVIEWERQuery>(
    rootViewerquery,
    {
      isFork,
      orderBy: {
        field: order_by ?? "PUSHED_AT",
        direction: order_by_dir ?? "DESC",
      },
    },
    {
      // fetchKey,
      // fetchPolicy: "store-and-network"
    },
  );

  return (
    <div className="w-full h-full   overflow-auto ">
    <GithubUserTabs
        user_info$key={query.viewer}
        viewerRepos_repositories$key={query.viewer}
        viewerStarerdRepos_repositories$key={query.viewer}
      />
    </div>
  );
}

export const rootViewerquery = graphql`
  query viewerVIEWERQuery($isFork: Boolean, $orderBy: RepositoryOrder) {
    viewer {
      ...viewer_info
      ...ViewerRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
      ...ViewerStarerdRepos_repositories
    }
  }
`;

export const viewerVIEWERfragmant = graphql`
  fragment viewer_info on User {
    followers(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    following(first: 1) {
      totalCount
      nodes {
        id
      }
    }
  }
`;
