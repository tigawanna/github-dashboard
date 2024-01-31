import { graphql } from "@/lib/graphql/relay/modules";

interface GeneralInfoProps {

}

export function GeneralInfo({}: GeneralInfoProps) {
return (
 <div className='w-full flex flex-col gap-2'>

 </div>
);
}

export const repoGeneralInfoFragment = graphql`
  fragment GeneralInfo_info on Repository {
    forkingAllowed
    hasDiscussionsEnabled
    hasIssuesEnabled
    hasProjectsEnabled
    hasWikiEnabled
    homepageUrl
    id
    isArchived
    isDisabled
    isFork
    isLocked
    isPrivate
    isTemplate
    isUserConfigurationRepository
    nameWithOwner
    openGraphImageUrl
    projectsUrl
    projectsResourcePath
    pushedAt
    resourcePath
    stargazerCount
    visibility
    viewerPermission
    viewerHasStarred
    viewerCanAdminister
    url
  }
`;
