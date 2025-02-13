import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { graphql } from "relay-runtime";
import { Branches } from "./Branches";
import { GeneralInfo } from "./GeneralInfo";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import { Navigate, redirect, useParams } from "@tanstack/react-router";
import { makeHotToast } from "@/components/toasters";
import { Stars } from "./Stars";

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
    return<Navigate to=".."/>
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full">
        <div className="w-full flex-col  ">
          <GeneralInfo data={query.repository} />

          <div className="  ">
            <Tabs defaultValue="branches" className="w-full h-full ">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="branches">Branches</TabsTrigger>
                <TabsTrigger value="stars">Stargazers</TabsTrigger>
              </TabsList>

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
      ...GeneralInfo_info
      ...Stars_stargazers
      ...Branches_refs
    }
  }
`;
