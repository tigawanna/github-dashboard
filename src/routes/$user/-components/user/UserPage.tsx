
import { UserInfo } from "./UserInfo";
import { usePreloadedQuery } from "react-relay";
import {  useLoaderData } from "@tanstack/react-router";
import { Suspense, useState, useTransition } from "react";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { UserRepos } from "../../repositories/-components/UserRepos";
import { UserStarredRepos } from "../../starred/-components/UserStarredRepos";
import { UserFollowersFragment } from "../../followers/-components/UserFollowersFragment";
import { UserFollowingFragment } from "../../following/-components/UserFollowingFragment";
import { layoutUserPageLoaderQuery } from "../../__generated__/layoutUserPageLoaderQuery.graphql";
import { userQuery } from "../../layout";


interface UserPageProps {

}

export function UserPage({}:UserPageProps){
const [pending, startTransition] = useTransition();
const [tab, setTab] = useState("repos");
const preloadedQueryRef = useLoaderData({from:"/$user"})
const query = usePreloadedQuery<layoutUserPageLoaderQuery>(userQuery, preloadedQueryRef);

return (
  <div className="w-full h-full min-h-screen flex flex-col items-center ">
    <UserInfo user_info_key={query.user} />
    <Tabs
      defaultValue={tab ?? "repos"}
      onValueChange={(value) => {
        startTransition(() => setTab(value));
      }}
      className="w-full h-full ">
      <TabsList className="grid w-full grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1 ">
        <TabsTrigger value="repos">Repos</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>

      <TabsContent value="repos" className="">
        <Suspense fallback={<div className="w-full h-full bg-base-200 skeleton">.</div>}>
          {/* <OneGithubRepoREADME owner={user} repo={repo} branch={defaultBranchName} /> */}
          <UserRepos user_repos_key={query.user} />
        </Suspense>
      </TabsContent>

      <TabsContent value="starred" className="">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          {/* <Branches data={query.repository} /> */}
          <UserStarredRepos starred_repos_key={query.user} />
        </Suspense>
      </TabsContent>

      <TabsContent value="followers" className="">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          {query.user && <UserFollowersFragment followers_key={query.user} />}
        </Suspense>
      </TabsContent>
      <TabsContent value="following" className="">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          {query.user && <UserFollowingFragment following_key={query.user} />}
        </Suspense>
      </TabsContent>
    </Tabs>
  </div>
);
}


