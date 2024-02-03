import { graphql, useFragment } from "@/lib/graphql/relay/modules";
import { GeneralInfo_info$key } from "./__generated__/GeneralInfo_info.graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Star, Github, Lock, BookDashed, Bolt } from "lucide-react";
import { BiGitRepoForked } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { SiVisualstudiocode } from "react-icons/si";
import { Link } from "rakkasjs";
import { NumberStats } from "@/components/shared/NumberStats";
import { BooleanStats } from "@/components/shared/BooleanStats";
import { ImBlocked } from "react-icons/im";

dayjs.extend(relativeTime);

interface GeneralInfoProps {
  data?: GeneralInfo_info$key | null;
}

export function GeneralInfo({ data }: GeneralInfoProps) {
  const fragData = useFragment<GeneralInfo_info$key>(
    repoGeneralInfoFragment,
    data,
  );
  // console.log({ fragData });
  return (
    <div className="w-full h-full flex flex-col gap-3 divide-y divide-solid divide-base-200 py-2">
      <div className="w-full h-full flex flex-col md:flex-row gap-2 px-2 ">
        <div className="w-full h-full flex flex-col gap-2 ">
          {/* name with owner */}
          <h1 className="text-2xl ">{fragData?.nameWithOwner}</h1>
          <p>{fragData?.description}</p>
          {/* recent activity ,fork count,star count ,visibility  */}
          <div
            className="w-full  text-sm  flex flex-col md:flex-row md:flex-wrap
            md:items-center justify-start items-start p-2 gap-1 md:gap-3"
          >
            <div className=" flex items-center justify-evenly gap-3">
              <NumberStats Icon={BiGitRepoForked} stat={fragData?.forkCount} />
              <NumberStats Icon={Star} stat={fragData?.stargazerCount} />

              {fragData?.diskUsage && (
                <div className="flex">{fragData?.diskUsage} kbs</div>
              )}
            </div>

            <div className="flex gap-2 justify-evenly"></div>

            <div className="text-sm font-bold flex gap-1 justify-center items-center min-w-fit ">
              <FiActivity /> {dayjs(fragData?.pushedAt).fromNow()}
            </div>

            <div className="flex gap-3 justify-evenly items-center">
              {fragData?.visibility === "PRIVATE" ? (
                <Lock className="text-error" />
              ) : null}
              {fragData?.url && (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`https://vscode.dev/${fragData?.url}`}
                  className="text-blue-500 hover:text-accent"
                >
                  <SiVisualstudiocode className="h-5 w-5" />
                </Link>
              )}
              {fragData?.url && (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={fragData?.url}
                  className="hover:text-accent border rounded-full border-base-content p-0.5"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
          {/* is boolean fields */}
          <div className="flex flex-wrap gap-2 divide-accent ">
            {fragData?.isArchived && (
              <BooleanStats
                stat={fragData?.isArchived}
                description="Archived"
                className="bg-yellow-950"
              />
            )}
            {fragData?.isFork && (
              <BooleanStats
                stat={fragData?.isFork}
                description="Fork"
                className="bg-green-950"
                Icon={BiGitRepoForked}
              />
            )}
            {fragData?.isLocked && (
              <BooleanStats
                stat={fragData?.isLocked}
                description="Locker"
                className="bg-orange-950"
                Icon={Lock}
              />
            )}
            {fragData?.isPrivate && (
              <BooleanStats
                stat={fragData?.isPrivate}
                description="Private"
                Icon={ImBlocked}
              />
            )}
            {fragData?.isDisabled && (
              <BooleanStats
                stat={fragData?.isDisabled}
                description="Disabled"
                Icon={ImBlocked}
              />
            )}
            {fragData?.isTemplate && (
              <BooleanStats
                stat={fragData?.isTemplate}
                description="Template"
                Icon={BookDashed}
              />
            )}
            {fragData?.isUserConfigurationRepository && (
              <BooleanStats
                stat={fragData?.isUserConfigurationRepository}
                description="Config Repo"
                Icon={Bolt}
              />
            )}
          </div>
          {/* is boolean fields */}
          <div className="flex flex-wrap gap-2 divide-accent *:bg-base-300 *:px-2 *:py-1 *:rounded-lg">
            <BooleanStats
              stat={fragData?.hasDiscussionsEnabled}
              description="Discussions Enabled"
            />
            <BooleanStats
              stat={fragData?.hasIssuesEnabled}
              description="Issues Enabled"
            />
            <BooleanStats
              stat={fragData?.hasProjectsEnabled}
              description="Project Enabled"
            />
            <BooleanStats
              stat={fragData?.hasWikiEnabled}
              description="Wiki Enabled"
            />
          </div>
        </div>
        {/* image */}
        <img
          className="w-full md:w-[40%] h-auto aspect-square md:aspect-video object-fit rounded-lg dark:brightness-50"
          height={200}
          width={200}
          src={fragData?.openGraphImageUrl}
        />
      </div>
      {fragData?.languages?.nodes && fragData?.languages?.nodes?.length > 0 && (
        <div className="h-full flex flex-wrap gap-2 px-2">
          {fragData?.languages?.nodes?.map((item) => {
            if (!item) return null;
            return (
              <div
                key={item?.id}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: item?.color ?? "",
                }}
                className=" rounded-lg text-xs  break-all px-2"
              >
                {item?.name}
              </div>
            );
          })}
        </div>
      )}
      {fragData?.repositoryTopics?.nodes &&
        fragData?.repositoryTopics?.nodes?.length > 0 && (
          <div className="h-full flex flex-wrap items-center gap-2 px-2">
            <h3 className="font-bold text-secondary">topics :</h3>
            {fragData?.repositoryTopics?.nodes?.map((item) => {
              if (!item) return null;
              return (
                <div
                  key={item?.id}
                  className=" rounded-lg text-xs  break-all px-2 badge bg-base-300"
                >
                  {item?.topic?.name}
                </div>
              );
            })}
          </div>
        )}
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
