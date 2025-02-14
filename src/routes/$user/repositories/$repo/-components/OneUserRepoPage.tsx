import { graphql } from "relay-runtime";
import { Branches } from "./Branches";
import { GeneralInfo } from "./GeneralInfo";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import { Navigate, useParams } from "@tanstack/react-router";
import { makeHotToast } from "@/components/toasters";
import { Stars } from "./Stars";
import { Suspense } from "react";
import { OneGithubRepoREADME } from "../../-components/github-rest-api-resources/OneGithubRepoREADME";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";

interface OneUserRepoPageProps {}

export function OneUserRepoPage({}: OneUserRepoPageProps) {
  const { repo, user } = useParams({ from: "/$user/repositories/$repo/" });
  const query = useLazyLoadQuery<OneUserRepoPageQuery>(oneREPOquery, {
    reponame: repo,
    repoowner: user,
  });
  if (!query || !query.repository) {
    makeHotToast({
      title: "Repository not found",
      description: "Please try again with a valid repository",
      variant: "error",
    });
    return <Navigate to=".." />;
  }
  const defaultBranchName = query.repository.defaultBranchRef?.name;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full">
        <div className="w-full flex-col  ">
          <GeneralInfo data={query.repository} />

          {/* <div className="w-full flex-col p-2 gap-2 ">
            <Branches data={query.repository} />
            <Stars data={query.repository} />
          </div> */}

          <div className="  ">
            <Tabs defaultValue="branches" className="w-full h-full ">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="readme">README</TabsTrigger>
                <TabsTrigger value="branches">Branches</TabsTrigger>
                <TabsTrigger value="stars">Stargazers</TabsTrigger>
              </TabsList>

              <TabsContent value="readme" className="">
                <Suspense fallback={<div className="w-full h-full bg-base-200 skeleton">.</div>}>
                  <OneGithubRepoREADME owner={user} repo={repo} branch={defaultBranchName} />
                </Suspense>
              </TabsContent>

              <TabsContent value="branches" className="">
                <Branches data={query.repository} />
              </TabsContent>

              <TabsContent value="stars">
                <Stars data={query.repository} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export const oneREPOquery = graphql`
  query OneUserRepoPageQuery($repoowner: String!, $reponame: String!) {
    repository(owner: $repoowner, name: $reponame) {
      defaultBranchRef {
        name
        id
      }
      ...GeneralInfo_info
      ...Stars_stargazers
      ...Branches_refs
    }
  }
`;
