import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { RepositoriesFragment, ViewerRepos } from "./repos/ViewerRepos";
import {
  ViewerStarerdRepos,
  ViewerStarerdReposFragment,
} from "./staring/ViewerStarerdRepos";
import { ViewerRepos_repositories$key } from "./repos/__generated__/ViewerRepos_repositories.graphql";
import { ViewerStarerdRepos_repositories$key } from "./staring/__generated__/ViewerStarerdRepos_repositories.graphql";
import { useFragment } from "@/lib/graphql/relay/modules";
import { viewer_info$key } from "../__generated__/viewer_info.graphql";
import { viewerVIEWERfragmant } from "../index.page";


interface GithubUserTabsProps {
  user_info$key: viewer_info$key  | null | undefined;
  viewerRepos_repositories$key: ViewerRepos_repositories$key | null | undefined;
  viewerStarerdRepos_repositories$key:
    | ViewerStarerdRepos_repositories$key
    | null
    | undefined;
}

export function GithubUserTabs({
  user_info$key,viewerRepos_repositories$key,viewerStarerdRepos_repositories$key,
}: GithubUserTabsProps) {
  const repo_fragment = useFragment<ViewerRepos_repositories$key>(
    RepositoriesFragment,
    viewerRepos_repositories$key,
  );
  const starred_repo_fragment =
    useFragment<ViewerStarerdRepos_repositories$key>(
      ViewerStarerdReposFragment,
      viewerStarerdRepos_repositories$key,
    );
  const data = useFragment<viewer_info$key>(
    viewerVIEWERfragmant,
    user_info$key,
  );
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
            Starring {starred_repo_fragment?.starredRepositories?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="following">
            Following {data?.following?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="followers">
            Followers {data?.followers?.totalCount}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="repos" className="">
          {viewerRepos_repositories$key && (
            <ViewerRepos viewer={viewerRepos_repositories$key} />
          )}
        </TabsContent>
        <TabsContent value="stars">
          {viewerStarerdRepos_repositories$key && (
            <ViewerStarerdRepos viewer={viewerStarerdRepos_repositories$key} />
          )}
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
