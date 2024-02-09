import { SiVisualstudiocode } from "react-icons/si";
import { FiActivity } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { Link } from "rakkasjs";
import { Github, History, Info, Lock, Star } from "lucide-react";
import { ViewerRepos_repositories$data } from "./__generated__/ViewerRepos_repositories.graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LocalViewer } from "@/lib/graphql/relay/RelayEnvironment";
import { RepositoryActions } from "./RepositoryActions";
import { RepoCardStar } from "./RepoCardStar";

import { ItemList } from "./types";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
dayjs.extend(relativeTime);

// type GetTypeAtIndex<Arr extends ReadonlyArray<T>,index extends number>
type RepoEdges = ViewerRepos_repositories$data["repositories"]["edges"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
export type OneRepoEdge = ReadonlyToRegular<RepoEdges>[number];
interface RepoCardProps {
  edge: OneRepoEdge | null | undefined;
  local_viewer: LocalViewer | null;
  editing: boolean;
  selected: boolean;
  selectItem: (item: ItemList) => void;
  unselectItem: (item: ItemList) => void;
}

export function RepoCard({
  edge,
  local_viewer,
  editing,
  selected,
  selectItem,
  unselectItem,
}: RepoCardProps) {
  const repo = edge?.node;
  if (!repo) return null;
  const vslink = `https://vscode.dev/${repo.url}`;

  return (
    <li
      key={edge?.node?.id}
      className="bg-base-300 rounded-lg flex-grow
                min-h-fit  md:h-[420px] w-[95%] md:w-[40%] xl:w-[30%]  flex-col
                 justify-between items-center p-1 relative"
    >

      {editing &&
        !repo.isInOrganization &&
        repo.viewerPermission === "ADMIN" && (
          <div className="absolute left-[3%] bottom-[2%] z-40">
            <Checkbox
              className="h-7 w-7  border-2 border-accent"
              checked={selected}
              onClick={() => {
                if (selected) {
                  unselectItem(repo);
                } else {
                  selectItem(repo);
                }
              }}
            />
          </div>
        )}
      <div
        className="flex flex-col cursor-pointer  w-full gap-1 "
        onClick={() => {}}
        data-tip={repo.description}
      >
        <img
          height={300}
          width={300}
          className=" w-full md:h-[200px] object-cover dark:brightness-50 hover:brightness-75"
          loading="lazy"
          src={repo?.openGraphImageUrl}
        />
        <div className="flex gap-3 bg-base-200">
          <Link
            href={"/viewer/" + repo.nameWithOwner}
            className="w-full max-w-[92%]  p-2 hover:bg-accent/20 flex flex-col gap-2"
          >
            <div className=" break-all flex flex-col justify-center ">
              <div className="text-2xl font-bold">{repo?.name}</div>
              <div className="flex gap-1 items-center">
                <div className="text-sm line-clamp-1">{repo.description}</div>
              </div>
            </div>

            <div className="flex truncate  gap-1">
              {repo?.languages?.edges?.map((item) => {
                if (!item) return null;
                return (
                  <div
                    key={item.node.id}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: item?.node?.color ?? "",
                    }}
                    className="p-[1px] m-[1px] rounded-lg text-xs  break-all px-1"
                  >
                    {item.node.name}
                  </div>
                );
              })}
            </div>
          </Link>
          <RepositoryActions
            owner={repo.owner.login}
            local_viewer={local_viewer}
            viewerCanAdminister={repo.viewerCanAdminister}
            viewerHasStarred={repo.viewerHasStarred}
            isFork={repo.isFork}
            forkingAllowed={repo.forkingAllowed}
          />
        </div>
        {/*  description and last commit message */}
        <div className="w-full flex flex-col p-1 gap-2">
          {/* <div className="text-sm md:text-sm brightness-75 break-word overflow-y-clip line-clamp-3 ">
                      {repo?.description}
                    </div> */}
          {repo?.releases?.nodes?.[0] && (
            <div className="w-full text-sm flex gap-3  overflow-clip">
              <span>Release: {repo?.releases?.nodes?.[0]?.name}</span>
              <span>
                {" "}
                {dayjs(repo?.releases?.nodes?.[0]?.publishedAt).fromNow()}
              </span>
            </div>
          )}

          <div className="w-full max-w-full text-sm flex gap-1">
            <div className="w-full flex gap-1 ">
              <div className="flex w-fit  gap-1  items-center justify-center">
                <History className="w-4 h-4 text-accent" />
                <div
                  className=" text-secondary hover:text-secondary/60 line-clamp-1"
                  data-tip={"last pushed to branch"}
                >
                  {repo?.refs?.edges?.[0]?.node?.name}:
                </div>
              </div>

              <div
                className="w-fit  hover:text-secondary line-clamp-1 "
                data-tip={"last commit message"}
              >
                {repo?.refs?.edges?.[0]?.node?.target?.history?.edges?.[0]?.node?.message.trim()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  text-[15px] text-sm  flex justify-between p-2">
        <div className="text-[12px] font-bold flex gap-1 justify-center items-center">
          <FiActivity /> {dayjs(repo?.pushedAt).fromNow()}
        </div>
        <div className="flex gap-1 justify-center items-center">
          <BiGitRepoForked /> {repo?.forkCount}
        </div>
        <RepoCardStar edge={edge} />
        {repo?.visibility === "PRIVATE" ? (
          <div className="flex gap-1 justify-center items-center">
            <Lock className="text-error" />
          </div>
        ) : null}

        <div className="flex">{repo?.diskUsage} kbs</div>
        <div className="flex gap-3 justify-center items-center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={vslink}
            className="text-blue-500 hover:text-accent"
          >
            <SiVisualstudiocode className="h-5 w-5" />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={repo.url}
            className="hover:text-accent border rounded-full border-base-content p-0.5"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </li>
  );
}
