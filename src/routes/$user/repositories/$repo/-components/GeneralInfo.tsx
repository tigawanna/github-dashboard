import { GeneralInfo_info$key } from "./__generated__/GeneralInfo_info.graphql";
import { Lock, BookDashed, Bolt, Globe, Star, GitForkIcon } from "lucide-react";
import { BiGitRepoForked } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { ImBlocked } from "react-icons/im";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import { useViewer } from "@/lib/viewer/use-viewer";
import { RepositoryActions } from "../../-components/repo-card/RepositoryActions";
import { BooleanStats } from "@/components/shared/BooleanStats";
import { getRelativeTimeString } from "@/utils/date";
import { formatKilobytes } from "@/utils/bytes";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/shadcn/ui/card";
import {
  GithubLanguages,
  OneGithubRepoLanguages,
} from "../../-components/github-rest-api-resources/OneGithubRepoLanguages";
import { Suspense } from "react";
import { StarRepository } from "../../-components/repo-card/StarRepository";
import { TailwindContainerIndicator, TailwindIndicator } from "@/components/navigation/tailwind-indicator";

interface GeneralInfoProps {
  data?: GeneralInfo_info$key | null;
}

export function GeneralInfo({ data }: GeneralInfoProps) {
  const reposirory = useFragment<GeneralInfo_info$key>(repoGeneralInfoFragment, data);
  const { viewer: local_viewer } = useViewer();

  const repository = reposirory;
  if (!repository) return null;
  const [repoowner, reponame] = repository.nameWithOwner.split("/");
  return (
    <div className="w-full h-full @container flex flex-col gap-3 divide-y divide-solid divide-base-200  p-5">
      <div className="flex gap-3 w-full justify-center">
            <TailwindIndicator />
            <TailwindContainerIndicator />

      </div>
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            {/* image and info */}
            <div className="flex flex-col @2xl:md:flex-row items-center gap-5 space-y-4">
              {/* image */}
              <img
                src={repository.openGraphImageUrl}
                height={150}
                alt={repository.nameWithOwner}
                className="h-56 w-full md:w-auto aspect-video "
              />

              {/* info */}
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  {repository.nameWithOwner}
                  {repository.visibility === "PRIVATE" && (
                    <Lock className="ml-2 inline-block h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {repository.description}
                </CardDescription>
                {/* repository topics */}
                {repository?.repositoryTopics?.nodes &&
                  repository?.repositoryTopics?.nodes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repository?.repositoryTopics?.nodes.map((topic) => (
                        <div
                          key={topic?.id}
                          className="text-xs text-primary border border-primary rounded-4xl px-1 py-0 ">
                          {topic?.topic.name}
                        </div>
                      ))}
                    </div>
                  )}
                {/* repository external links */}
                <div className="flex space-x-2">
                  {repository.homepageUrl && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={repository.homepageUrl} target="_blank" rel="noreferrer">
                        <Globe className="size-6" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://vscode.dev/${repository.url}`}
                      target="_blank"
                      rel="noreferrer">
                      <VscVscodeInsiders className="size-6" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={repository.url} target="_blank" rel="noreferrer">
                      <FaGithub className="size-6" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <StarRepository
              id={repository.id}
              stargazerCount={repository?.stargazerCount}
              viewerHasStarred={repository?.viewerHasStarred}
            />
            <div className="flex items-center space-x-1">
              <GitForkIcon className="h-4 w-4" />
              <span>{repository.forkCount}</span>
            </div>
            <div className="text-sm font-bold flex gap-1 justify-center items-center min-w-fit ">
              <FiActivity /> {getRelativeTimeString(reposirory?.pushedAt)}
            </div>
            {reposirory?.diskUsage && (
              <div className="text-sm font-bold flex gap-1 justify-center items-center min-w-fit">
                {formatKilobytes(reposirory?.diskUsage)}
              </div>
            )}
            {reposirory?.id && reposirory.nameWithOwner && local_viewer && (
              <RepositoryActions
                owner={local_viewer?.login}
                local_viewer={local_viewer}
                viewerCanAdminister={reposirory?.viewerCanAdminister ?? false}
                isFork={reposirory?.isFork ?? false}
                forkingAllowed={reposirory?.forkingAllowed ?? false}
                id={reposirory?.id}
                nameWithOwner={reposirory?.nameWithOwner}
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Suspense fallback={<GithubLanguages data={{ Markdown: 200 }} width={500} />}>
            <OneGithubRepoLanguages owner={repoowner} repo={reponame} />
          </Suspense>
          {/* is boolean fields */}
          <div className="flex flex-wrap gap-2 divide-accent ">
            {reposirory?.isArchived && (
              <BooleanStats
                stat={reposirory?.isArchived}
                description="Archived"
                className="bg-yellow-950"
              />
            )}
            {reposirory?.isFork && (
              <BooleanStats
                stat={reposirory?.isFork}
                description="Is Fork"
                className="bg-green-950"
                Icon={BiGitRepoForked}
              />
            )}
            {reposirory?.isLocked && (
              <BooleanStats
                stat={reposirory?.isLocked}
                description="Locker"
                className="bg-orange-950"
                Icon={Lock}
              />
            )}
            {reposirory?.isPrivate && (
              <BooleanStats stat={reposirory?.isPrivate} description="Private" Icon={ImBlocked} />
            )}
            {reposirory?.isDisabled && (
              <BooleanStats stat={reposirory?.isDisabled} description="Disabled" Icon={ImBlocked} />
            )}
            {reposirory?.isTemplate && (
              <BooleanStats
                stat={reposirory?.isTemplate}
                description="Template"
                Icon={BookDashed}
              />
            )}
            {reposirory?.isUserConfigurationRepository && (
              <BooleanStats
                stat={reposirory?.isUserConfigurationRepository}
                description="Config Repo"
                Icon={Bolt}
              />
            )}

            <BooleanStats
              stat={reposirory?.hasDiscussionsEnabled}
              description="Discussions Enabled"
            />
            <BooleanStats stat={reposirory?.hasIssuesEnabled} description="Issues Enabled" />
            <BooleanStats stat={reposirory?.hasProjectsEnabled} description="Project Enabled" />
            <BooleanStats stat={reposirory?.hasWikiEnabled} description="Wiki Enabled" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const repoGeneralInfoFragment = graphql`
  fragment GeneralInfo_info on Repository {
    # general fields
    id
    url
    description
    nameWithOwner
    description
    openGraphImageUrl
    projectsUrl
    projectsResourcePath
    pushedAt
    diskUsage
    homepageUrl
    resourcePath
    visibility
    viewerPermission
    # simple list

    repositoryTopics(first: 20) {
      nodes {
        id
        topic {
          name
        }
      }
    }
    languages(first: 20) {
      nodes {
        color
        name
        id
      }
    }
    primaryLanguage {
      color
      id
      name
    }

    # count fields
    forkCount
    stargazerCount

    # boolean fileds (has)
    hasDiscussionsEnabled
    hasIssuesEnabled
    hasProjectsEnabled
    hasWikiEnabled
    forkingAllowed
    # boolean fileds (is)
    isArchived
    isDisabled
    isFork
    isLocked
    isPrivate
    isTemplate
    isUserConfigurationRepository
    viewerHasStarred
    viewerCanAdminister
  }
`;
