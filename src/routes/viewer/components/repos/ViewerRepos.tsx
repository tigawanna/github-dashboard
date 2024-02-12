import {
  graphql,
  usePaginationFragment,
  useRelayEnvironment,
  commitLocalUpdate,
} from "@/lib/relay/modules";
import { ViewerRepos_repositories$key } from "./__generated__/ViewerRepos_repositories.graphql";
import { FilterRepos } from "./components";
import { LoadMoreButton } from "../shared";
import { RepoCard } from "./RepoCard";
import { LocalViewer } from "@/lib/relay/RelayEnvironment";
import { useState } from "react";
import { Edit } from "lucide-react";
import { RepoCardDelete } from "./RepoCardDelete";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useRepoSelector } from "./hooks/selectRepos";
import { useInvalidateRelayStore } from "./hooks/store";

interface ViewerReposProps {
  viewer: ViewerRepos_repositories$key;
  local_viewer: LocalViewer | null;
}

export function ViewerRepos({ viewer, local_viewer }: ViewerReposProps) {
  const [editing, setEditing] = useState(true);
  const [open, setOpen] = useState(false);
  const invalidate = useInvalidateRelayStore()
  const {
    deselectAll,
    selectAll,
    selected,
    unselectItem,
    selectItem,
    setSelected,
  } = useRepoSelector();
  const repo_fragment = usePaginationFragment<
    any,
    ViewerRepos_repositories$key
  >(RepositoriesFragment, viewer);

  const enviroment = useRelayEnvironment();
 

  const repo_response = repo_fragment.data?.repositories;
  const repos = repo_response?.edges;
  const is_all_selected =
    selected && selected.length === repos?.length ? true : false;

  return (
    <div className="w-full h-full flex gap-2 flex-col  items-center justify-center">
      {/* add filter controls */}

      <div className="w-full bg-base-200 sticky top-0 flex flex-wrap justify-evenly z-30 p-1">
        <FilterRepos />
        <div className=" flex flex-wrap items-center justify-center gap-3">
          <Edit
            onClick={() => setEditing(!editing)}
            className="h-7 w-7 hover:text-orange-500"
          />
          {editing && (
            <Checkbox
              className="h-7 w-7 border border-accent"
              checked={is_all_selected}
              onClick={() => {
                if (is_all_selected) {
                  deselectAll();
                } else {
                  // @ts-expect-error
                  selectAll(repos);
                }
              }}
            />
          )}
          {editing && selected && selected?.length > 0 && (
            <div className="badge badge-sm">{selected?.length}</div>
          )}

          <div className="flex items-center justify-center gap-3">
            {selected && selected.length > 0 && (
              <RepoCardDelete
                open={open}
                setOpen={setOpen}
                setSelected={setSelected}
                selected={selected}
              />
            )}
          </div>
        </div>
        
      </div>

      <ul className="flex flex-wrap gap-5 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            return (
              <RepoCard
                key={edge?.node?.id}
                edge={edge}
                local_viewer={local_viewer}
                editing={editing}
                selected={
                  selected
                    ? selected.some((i) => i.id === edge?.node?.id)
                    : false
                }
                selectItem={selectItem}
                unselectItem={unselectItem}
              />
            );
          })}
      </ul>

      <LoadMoreButton frag={repo_fragment} />
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
