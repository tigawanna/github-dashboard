import { graphql, usePaginationFragment } from "@/lib/graphql/relay/modules";
import { ViewerRepos_repositories$key } from "./__generated__/ViewerRepos_repositories.graphql";
import { SiVisualstudiocode } from "react-icons/si";
import { FiActivity } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { Link } from "rakkasjs";
import { Github, History, Info, Lock, Star } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FilterRepos } from "./components";

dayjs.extend(relativeTime);
interface ViewerReposProps {
  viewer: ViewerRepos_repositories$key;
}

export function ViewerRepos({ viewer }: ViewerReposProps) {
  const repo_fragment = usePaginationFragment<
    any,
    ViewerRepos_repositories$key
  >(RepositoriesFragment, viewer);

  const repo_response = repo_fragment.data?.repositories;
  const repos = repo_response?.edges;

  return (
    <div className="w-full h-full flex gap-2 flex-col  items-center justify-center">
      {/* add filter controls */}
      <div className="w-full border border-accent bg-base-200 sticky top-0">
        <FilterRepos />
      </div>

      <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            const repo = edge?.node;
            if (!repo) return null;
            const vslink = `https://vscode.dev/${repo.url}`;
            return (
              <li
                key={edge?.node?.id}
                className="bg-base-300 rounded-lg flex-grow
                min-h-fit  md:h-50 w-[95%] md:w-[40%] xl:w-[30%]  flex-col
                 justify-between items-center"
              >
                <div
                  onClick={() => {}}
                  className="flex flex-col cursor-pointer h-[85%] w-full gap-1 "
                  data-tip={repo.description}
                >
                  {/* <img
                    height={300}
                    width={300}
                    className=" w-full md:h-40 object-cover"
                    loading="lazy"
                    src={repo?.openGraphImageUrl}
                  /> */}
                  <Link
                    href={"/repo/" + repo?.name + "--```--" + repo?.owner.login}
                    className="w-full bg-base-200 p-2 hover:bg-accent/20 flex flex-col gap-2"
                  >
                    <div className="   break-all flex flex-col justify-center ">
                      <div className="text-2xl font-bold">{repo?.name}</div>
                      <div className="flex gap-1 items-center">
                        <div className="text-sm line-clamp-1">
                          {repo.description}
                        </div>
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
                  {/*  description and last commit message */}
                  <div className="w-full flex flex-col p-1 gap-2">
                    {/* <div className="text-sm md:text-sm brightness-75 break-word overflow-y-clip line-clamp-3 ">
                      {repo?.description}
                    </div> */}
                    <div className="w-full max-w-full text-sm flex gap-1 ">
                      <div className="w-full flex flex-wrap gap-1 ">
                        <div className="flex w-fit  gap-1  items-center justify-center">
                          <History className="w-4 h-4 text-accent" />
                          <div
                            className=" text-secondary hover:text-secondary/60"
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
                  {repo?.stargazerCount > 0 ? (
                    <div className="flex gap-1 justify-center items-center">
                      <Star />
                      {repo?.stargazerCount}
                    </div>
                  ) : null}
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
          })}
      </ul>
      {repo_fragment.hasNext ? (
        <button
          className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
          onClick={() => {
            repo_fragment.loadNext(10);
          }}
        >
          {repo_fragment.isLoadingNext ? "loading..." : "  --- load more ---"}
        </button>
      ) : null}
    </div>
  );
}

export const RepositoriesFragment = graphql`
  fragment ViewerRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    orderBy: {
      type: "RepositoryOrder"
      defaultValue: { field: PUSHED_AT, direction: DESC }
    }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "RepositoriesPaginationQuery") {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      isFork: $isFork
    ) @connection(key: "Repositories_repositories") {
      totalCount
      edges {
        node {
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
          owner {
            login
            id
            url
            avatarUrl
          }

          languages(first: $first) {
            edges {
              node {
                id
                color
                name
              }
            }
          }
          stargazerCount
          refs(
            refPrefix: "refs/heads/"
            orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
            first: 2
          ) {
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
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;