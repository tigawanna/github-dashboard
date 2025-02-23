import { FiActivity } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { History, Lock } from "lucide-react";
import { RepositoryActions } from "./RepositoryActions";
import { FaGithub } from "react-icons/fa";
import { ItemList } from "../types";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { StarRepository } from "./StarRepository";
import { UserRepos_repositories$data } from "../__generated__/UserRepos_repositories.graphql";
import { getRelativeTimeString } from "@/utils/date";
import { GitHubViewer } from "@/lib/viewer/use-viewer";
import { Link } from "@tanstack/react-router";
import { VscVscodeInsiders } from "react-icons/vsc";
import { formatKilobytes } from "@/utils/bytes";
import { graphql } from "relay-runtime";
import { RepoCard_reposiotory$key } from "./__generated__/RepoCard_reposiotory.graphql";
import { useFragment } from "react-relay";

// type GetTypeAtIndex<Arr extends ReadonlyArray<T>,index extends number>
type RepoEdges = UserRepos_repositories$data["repositories"]["edges"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
export type OneRepoEdge = ReadonlyToRegular<RepoEdges>[number];
interface RepoCardProps {
  edge: OneRepoEdge | null | undefined;
  local_viewer?: Partial<GitHubViewer> | null;
  user: string;
  editing?: boolean;
  // selected: boolean;
  getSelected?: (id: string) => boolean;
  selectItem?: (item: ItemList) => void;
  unselectItem?: (item: ItemList) => void;
}

export function RepoCard({
  edge,
  local_viewer,
  editing,
  user,
  getSelected,
  // selected,
  selectItem,
  unselectItem,
}: RepoCardProps) {
  const fragData = useFragment<RepoCard_reposiotory$key>(RepoFragment, edge?.node);
  const repo = fragData;
  if (!repo) return null;
  const vslink = `https://vscode.dev/${repo.url}`;
  const selected = getSelected?.(repo.id);

  return (
    <li
      key={repo.id}
      className="bg-primary/10 relative  rounded-2xl border border-primary
        min-h-fit  md:h-[400px] w-[95%] @repos:w-[95%] @md/repos:lg:w-[45%] @2xl/repos:md:w-[45%] @2xl/repos:lg:w-[30%]  flex-col
        justify-between items-center  ">
      {/* <div className="text-3xl font-bold @2xl/repos:lg:bg-accent">uwu</div> */}
      <div
        className="w-full flex flex-col cursor-pointer gap-1 "
        onClick={() => {}}
        data-tip={repo.description}>
        {editing && (
          <div className="absolute  top-0 left-0 bg-base-300 rounded-2xl  z-50 p-3  ">
            <Checkbox
              className="h-7 w-7  border-6 border-accent"
              checked={selected}
              onClick={() => {
                if (selected) {
                  unselectItem?.(repo);
                } else {
                  selectItem?.(repo);
                }
              }}
            />
          </div>
        )}
        <img
          height={150}
          width={150}
          className="object-cover rounded-t-2xl aspect-video w-full max-h-[150px] @sm:h-[150px] dark:brightness-50 hover:brightness-75"
          loading="lazy"
          src={repo?.openGraphImageUrl}
          onError={(e) => {
            e.currentTarget.src = "/github-fallback.png"
          }}
        />
        <div className="w-full flex gap-3 p-2 brightness-75 hover:text-secondary h-full">
          {/* TODO  crate this page */}
          <Link
            to="/$user/repositories/$repo"
            preload={false}
            params={{ user:repo?.owner?.login, repo: repo.name }}
            className="w-full flex flex-col justify-center gap-2 p-2">
            <div className=" break-all flex flex-col justify-center ">
              <div className="text-2xl font-bold">{repo?.name}</div>
              <div className="text-sm line-clamp-1">{repo.description}</div>
            </div>
            {/* repository Languages */}
            <div className="flex flex-wrap w-full  gap-1">
              {repo?.languages?.edges?.map((item, idx) => {
                if (!item) return null;
                return (
                  <div
                    key={item.node.id + item.node.name + idx}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: item?.node?.color ?? "",
                    }}
                    className="p-[1px] m-[1px] rounded-lg text-xs  break-all px-1">
                    {item.node.name}
                  </div>
                );
              })}
            </div>
          </Link>

          {local_viewer && (
            <div className="p-2 gap-2 absolute right-[2%] z-40 bg-base-300 flex flex-col items-center justify-between">
              <RepositoryActions
                owner={repo.owner.login}
                local_viewer={local_viewer}
                viewerCanAdminister={repo.viewerCanAdminister}
                isFork={repo.isFork}
                forkingAllowed={repo.forkingAllowed}
                id={repo.id}
                nameWithOwner={repo.nameWithOwner}
              />
            </div>
          )}

          <div className="p-2 gap-2 flex flex-col items-center justify-between"></div>
        </div>
        {/*  description and last commit message */}
        <div className="w-full flex flex-col p-1 gap-2">
          {repo?.releases?.nodes?.[0] && (
            <div className="w-full text-sm flex gap-3  overflow-clip">
              <span>Release: {repo?.releases?.nodes?.[0]?.name}</span>
              <span>
                {" "}
                {/* {dayjs(repo?.releases?.nodes?.[0]?.publishedAt).fromNow()} */}
                {getRelativeTimeString(repo?.releases?.nodes?.[0]?.publishedAt)}
              </span>
            </div>
          )}

          <div className="w-full max-w-full text-sm flex gap-1">
            <div className="w-full flex gap-1 ">
              <div className="flex w-fit  gap-1  items-center justify-center">
                <History className="w-4 h-4 text-accent" />
                <div
                  className=" text-secondary hover:text-secondary/60 line-clamp-1"
                  data-tip={"last pushed to branch"}>
                  {repo?.refs?.edges?.[0]?.node?.name}:
                </div>
              </div>

              <div
                className="w-fit  hover:text-secondary line-clamp-1 "
                data-tip={"last commit message"}>
                {repo?.refs?.edges?.[0]?.node?.target?.history?.edges?.[0]?.node?.message.trim()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  text-[15px] text-sm  flex gap-3 flex-wrap items-center justify-evenly p-2">
        <div className="text-[12px] font-bold flex gap-1 justify-center items-center">
          <FiActivity /> {getRelativeTimeString(repo?.pushedAt)}
        </div>
        <div className="flex gap-1 justify-center items-center">
          <BiGitRepoForked className="" /> {repo?.forkCount}
        </div>
        <StarRepository
          id={repo.id}
          stargazerCount={repo?.stargazerCount}
          viewerHasStarred={repo?.viewerHasStarred}
        />
        {repo?.visibility === "PRIVATE" ? (
          <div className="flex gap-1 justify-center items-center">
            <Lock className="text-error" />
          </div>
        ) : null}

        {repo?.diskUsage && <div className="flex">{formatKilobytes(repo?.diskUsage)}</div>}
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
            href={repo.url}
            className="hover:text-accent border rounded-full border-base-content p-0.5">
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </li>
  );
}

export const RepoFragment = graphql`
  fragment RepoCard_reposiotory on Repository {
    id
    name
    nameWithOwner
    description
    pushedAt
    diskUsage
    url
    visibility
    forkCount
    openGraphImageUrl
    isInOrganization
    forkingAllowed
    isFork
    viewerHasStarred
    viewerPermission
    viewerCanAdminister

    owner {
      login
      id
      url
      avatarUrl
    }

    languages(first: 20) {
      edges {
        node {
          id
          color
          name
        }
      }
    }
    releases(first: 1) {
      nodes {
        name
        publishedAt
      }
    }
    stargazerCount
    refs(refPrefix: "refs/heads/", orderBy: { direction: DESC, field: TAG_COMMIT_DATE }, first: 2) {
      edges {
        node {
          name
          id
          target {
            ... on Commit {
              history(first: 1) {
                edges {
                  node {
                    committedDate
                    author {
                      name
                    }
                    message
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
