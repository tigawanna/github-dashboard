import { PageProps, Redirect } from "rakkasjs";
import { graphql, useLazyLoadQuery } from "@/lib/graphql/relay/modules";
import { RepoFullRepositoryQuery } from "./__generated__/RepoFullRepositoryQuery.graphql";
import { hotToast } from "@/components/wrappers/toast";
import { Languages } from "./components/Languages";
import { Branches } from "./components/Branches";
import { Stars } from "./components/Stars";
import { GeneralInfo } from "./components/GeneralInfo";
export default function GithubUserPage({ params }: PageProps) {
  const user = params?.user;
  const repo = params?.repo;
  if (user == null || repo == null) {
    hotToast({
      title: "Repository not found",
      description: "Please try again with a valid repository",
      type: "error",
    });
    return <Redirect href="/viewer" />;
  }
  const query = useLazyLoadQuery<RepoFullRepositoryQuery>(oneREPOquery, {
    reponame: repo,
    repoowner: user,
  });
  if (!query || !query.repository) {
    hotToast({
      title: "Repository not found",
      description: "Please try again with a valid repository",
      type: "error",
    });
    return <Redirect href="/viewer" />;
  }
  return (
    <div className="w-full h-full">


      <div className="w-full flex-col  ">
        <GeneralInfo data={query.repository} />
    
        <div className="  ">
          <Branches data={query.repository} />
          <Stars data={query.repository} />
        </div>
      </div>
    </div>
  );
}

export const oneREPOquery = graphql`
  query RepoFullRepositoryQuery($repoowner: String!, $reponame: String!) {
    repository(owner: $repoowner, name: $reponame) {
      ...GeneralInfo_info
      ...Stars_stargazers
      ...Branches_refs

    }
  }
`;
