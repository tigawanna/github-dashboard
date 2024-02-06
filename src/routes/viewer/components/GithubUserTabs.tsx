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
import { ViewerReposSuspenseFallback } from "./repos/components";
import { Suspense } from "react";
import { ProfileDetails } from "./people/ProfileDetails";
import { Following, FollowingFragment } from "./people/Following";
import { Followers, FollowersFragment } from "./people/Followers";
import { FragmentRefs } from "relay-runtime";
import { Following_following$key } from "./people/__generated__/Following_following.graphql";
import { Followers_followers$key } from "./people/__generated__/Followers_followers.graphql";
interface GithubUserTabsProps {
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      | "ProfileDetails"
      | "Followers_followers"
      | "Following_following"
      | "ViewerRepos_repositories"
      | "ViewerStarerdRepos_repositories"
    >;
  } | null;
}

export function GithubUserTabs({ refs }: GithubUserTabsProps) {
  const repo_fragment = useFragment<ViewerRepos_repositories$key>(
    RepositoriesFragment,
    refs,
  );
  const starred_repo_fragment =
    useFragment<ViewerStarerdRepos_repositories$key>(
      ViewerStarerdReposFragment,
      refs,
    );
  const followers_fragment = useFragment<Followers_followers$key>(
    FollowersFragment,
    refs,
  );
  const following_fragment = useFragment<Following_following$key>(
    FollowingFragment,
    refs,
  );
  if (!refs) {
    return null;
  }
  return (
    <div className="w-full">
      {/* <Suspense fallback={<ViewerReposSuspenseFallback />}>
        <ViewerRepos />
      </Suspense> */}
      {refs && <ProfileDetails profile_details_key={refs} />}
      <Tabs defaultValue="repos" className="w-full h-full ">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="repos">
            Repositories {repo_fragment?.repositories?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="stars">
            Starring {starred_repo_fragment?.starredRepositories?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="following">
            Following {following_fragment?.following?.totalCount}
          </TabsTrigger>
          <TabsTrigger value="followers">
            Followers {followers_fragment?.followers?.totalCount}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="repos" className="">
          {refs && (
            <Suspense fallback={<ViewerReposSuspenseFallback />}>
              <ViewerRepos viewer={refs} />
            </Suspense>
          )}
        </TabsContent>
        <TabsContent value="stars">
          {refs && (
            <Suspense fallback={<ViewerReposSuspenseFallback />}>
              <ViewerStarerdRepos viewer={refs} />
            </Suspense>
          )}
        </TabsContent>

        <TabsContent value="following">
          <Following refs={refs} />
        </TabsContent>
        <TabsContent value="followers">
          <Followers refs={refs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
