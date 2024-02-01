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
  const data = useFragment<viewer_info$key>(
    viewerVIEWERfragmant,
    query?.viewer,
  );
  const repo_fragment = useFragment<ViewerRepos_repositories$key>(
    RepositoriesFragment,
    query?.viewer,
  );
  const counts = data;
  // console.log("counts ==== ", counts);
  return (
    <div className="w-full h-full   overflow-auto ">
      {/* <Suspense fallback={<ViewerReposSuspenseFallback />}>
        <ViewerRepos />
      </Suspense> */}
      <Tabs defaultValue="repos" className="w-full h-full ">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="repos">
            Repositories {repo_fragment?.repositories?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="stars">
            Staring {counts?.starredRepositories?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="following">
            Following {counts?.following?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="followers">
            Followers {counts?.followers?.totalCount}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="repos" className="">
          <ViewerRepos viewer={query?.viewer} />
        </TabsContent>
        <TabsContent value="stars">
          <h1 className="text-4xl font-bold ">Stars</h1>
        </TabsContent>

        <TabsContent value="following">
          <h1 className="text-4xl font-bold ">Following who</h1>
        </TabsContent>
        <TabsContent value="followers">
          <h1 className="text-4xl font-bold ">Followers</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}



export const rootViewerquery = graphql`
  query viewerVIEWERQuery($isFork: Boolean, $orderBy: RepositoryOrder) {
    viewer {
      ...viewer_info
      ...ViewerRepos_repositories @arguments(isFork: $isFork, orderBy: $orderBy)
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

    starredRepositories(first: 1) {
      totalCount
      nodes {
        id
      }
    }
  }
`;
