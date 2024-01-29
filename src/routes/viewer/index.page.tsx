import { graphql, useFragment, useLazyLoadQuery } from "@/lib/graphql/relay/modules";
import { PageProps} from "rakkasjs";
import {
  RepositoriesFragment,
  ViewerRepos,
  ViewerReposSuspenseFallback,
} from "./components/ViewerRepos";
import { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

import { viewerVIEWERQuery } from "./__generated__/viewerVIEWERQuery.graphql";
import { viewer_info$key} from "./__generated__/viewer_info.graphql";
import { ViewerRepos_repositories$key } from "./components/__generated__/ViewerRepos_repositories.graphql";
export default function ViewerPage({}: PageProps) {
  const query = useLazyLoadQuery<viewerVIEWERQuery>(rootViewerquery, {});
  const data = useFragment<viewer_info$key>(
    viewerVIEWERfragmant,
    query?.viewer,
  );
  const repo_fragment = useFragment<ViewerRepos_repositories$key>(
    RepositoriesFragment,
    query?.viewer,
  );
  const counts = data 
  // console.log("counts ==== ", counts);
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">Viewer Page</div>
      {/* <Suspense fallback={<ViewerReposSuspenseFallback />}>
        <ViewerRepos />
      </Suspense> */}
      <Tabs defaultValue="repos" className="w-full h-full overflow-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="repos">Repositories {repo_fragment?.repositories?.totalCount}</TabsTrigger>
          <TabsTrigger value="stars">Staring {counts?.starredRepositories?.totalCount}</TabsTrigger>
            <TabsTrigger value="following">Following {counts?.following?.totalCount}</TabsTrigger>
          <TabsTrigger value="followers">Followers {counts?.followers?.totalCount}</TabsTrigger>
        </TabsList>
        <TabsContent value="repos">
          <h1 className="text-4xl font-bold ">Repositories</h1>
          <ViewerRepos viewer={query?.viewer}/>
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

// export const HomeViewerQuery = graphql`
// query viewerVIEWERQuery {
//     viewer {
//       ...Repositories_repositories
//       ...Following_following
//       ...Followers_followers
//     }
//   }
// `;

export const rootViewerquery = graphql`
  query viewerVIEWERQuery {
    viewer {
      ...viewer_info
      ...ViewerRepos_repositories
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

