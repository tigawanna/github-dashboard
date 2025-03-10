import { FragmentRefs, graphql } from "relay-runtime";
import { SearchRepoResultsFraggment$key } from "./__generated__/SearchRepoResultsFraggment.graphql";
import { useFragment } from "react-relay";
import { Link } from "@tanstack/react-router";
import { StarRepository } from "@/routes/$user/repositories/-components/repo-card/StarRepository";
import { formatKilobytes } from "@/utils/bytes";
import { getRelativeTimeString } from "@/utils/date";
import { BiGitRepoForked } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { VscVscodeInsiders } from "react-icons/vsc";
import { History, Lock } from "lucide-react";


interface SearchRepoResultsProps {
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      "SearchRepoResultsFraggment" | "SearchUserResultsfragment"
    >;
  } | null;
}

export function SearchRepoResults({ refs }: SearchRepoResultsProps) {
  const query = useFragment<SearchRepoResultsFraggment$key>(searchRepoResultsFragment, refs);
  if (!query || !query.nameWithOwner) {
    return null;
  }

  const [user, repo] = query.nameWithOwner?.split("/");
  const vslink = `https://vscode.dev/${query.url}`;
  return (
    <li
      className="bg-primary/10 relative  rounded-2xl border border-primary
        min-h-fit  md:h-[300px] w-[95%] @repos:w-[95%] @md/repos:lg:w-[45%] @2xl/repos:md:w-[45%] @2xl/repos:lg:w-[30%]  flex-col
        justify-between items-center list-none">

      <Link
        className="w-full flex flex-col  gap-2"
        to={`/$user/repositories/$repo`}
        params={{ user, repo }}
        preload={false}>
        <div className="overflow-hidden w-full md:h-[180px ">
    
          <img
            height={300}
            width={300}
            className=" w-full md:h-[180px] object-fit transition duration-500 ease-in-out hover:scale-150  brightness-50 "
            loading="lazy"
            src={query?.openGraphImageUrl}
          />
        </div>
        <div className=" break-all flex flex-col justify-center px-2">
          <div className="text-xl font-bold line-clamp-1">{query?.nameWithOwner}</div>
          <div className="flex gap-1 items-center ">
            <div className="text-sm line-clamp-1">{query.description}</div>
          </div>
        </div>
      </Link>
      <div className="w-full  text-[15px] text-sm  flex gap-3 flex-wrap items-center justify-evenly p-2">
        <div className="text-[12px] font-bold flex gap-1 justify-center items-center">
          <FiActivity /> {getRelativeTimeString(query?.pushedAt)}
        </div>
        <div className="flex gap-1 justify-center items-center">
          <BiGitRepoForked className="" /> {query?.forkCount}
        </div>
        <StarRepository
          id={query.id}
          stargazerCount={query?.stargazerCount}
          viewerHasStarred={query?.viewerHasStarred}
        />
        {query?.visibility === "PRIVATE" ? (
          <div className="flex gap-1 justify-center items-center">
            <Lock className="text-error" />
          </div>
        ) : null}

        {query?.diskUsage && <div className="flex">{formatKilobytes(query?.diskUsage)}</div>}
        <div className="flex gap-3 justify-center items-center">
          <a
            target="_blank"
            rel="noreferrer"
            href={vslink}
            className="text-blue-500 hover:text-accent">
            <VscVscodeInsiders className="h-5 w-5" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={query.url}
            className="hover:text-accent border rounded-full border-base-content p-0.5">
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </li>
  );
}

export const searchRepoResultsFragment = graphql`
  fragment SearchRepoResultsFraggment on Repository {
    id
    nameWithOwner
    forkCount
    pushedAt
    diskUsage
    visibility
    url
    stargazerCount
    description
    openGraphImageUrl
    viewerHasStarred
    createdAt
  }
`;
