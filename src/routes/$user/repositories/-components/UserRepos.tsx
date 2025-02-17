import { graphql } from "relay-runtime";
import { UserRepos_repositories$key } from "./__generated__/UserRepos_repositories.graphql";
import { usePaginationFragment } from "react-relay";
import { UserReposPageQuery } from "./__generated__/UserReposPageQuery.graphql";
import { useRepoSelector } from "./use-repo-selector";
import { RepoCard } from "./repo-card/RepoCard";
import { useState } from "react";
import { useViewer } from "@/lib/viewer/use-viewer";
import { DeleteRepository } from "./repo-card/DeleteRepository";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Edit } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";
import { RepoFiltersSelect } from "./RepoFiltersSelect";

interface UserReposProps {
  user_repos_key?: UserRepos_repositories$key | null;
}

export function UserRepos({ user_repos_key }: UserReposProps) {
  const { user } = useParams({ from: "/$user" });
  const { viewer } = useViewer();
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const { deselectAll, selectAll, selected, unselectItem, selectItem, setSelected } =
    useRepoSelector();

  const fragData = usePaginationFragment<UserReposPageQuery, UserRepos_repositories$key>(
    RepositoriesFragment,
    user_repos_key
  );
  const repo_response = fragData.data?.repositories;
  const repos = repo_response?.edges;
  const is_all_selected = selected && selected.length === repos?.length ? true : false;
  if (!viewer) {
    return null;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full bg-base-200 sticky -top-1 left-0 right-0 flex flex-wrap justify-evenly z-30 ">
        {/* <FilterRepos /> */}
        <div className=" flex flex-wrap w-full bg-primary/10 items-center justify-center md:justify-end gap-[2%] rounded-2xl py-2">
          <RepoFiltersSelect />
          <Edit onClick={() => setEditing(!editing)} className="h-7 w-7 hover:text-orange-500" />
          {editing && (
            <Checkbox
              className="h-7 w-7 border-6 border-accent  "
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
            <div className=" p-1 text-xl rounded-xl">{selected?.length}</div>
          )}

          <div className="flex items-center justify-center gap-3">
            {editing && selected && selected.length > 0 && (
              <DeleteRepository
                open={open}
                setOpen={setOpen}
                setSelected={setSelected}
                selected={selected}
              />
            )}
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-5 w-full h-full @container/repos items-center justify-center">
        {repos &&
          repos.map((edge) => {
            // console.log("repo", edge?.node?.id);
            return (
              <RepoCard
                user={user}
                // @ts-expect-error
                key={edge?.node?.id + edge?.cursor}
                edge={edge}
                local_viewer={viewer}
                editing={editing}
                // selected={selected ? selected.some((i) => i.id === edge?.node?.id) : false}
                getSelected={(id) => selected?.some((i) => i.id === id) ?? false}
                selectItem={selectItem}
                unselectItem={unselectItem}
              />
            );
          })}
        <LoadMoreButton frag={fragData} />
      </ul>
    </div>
  );
}
export const RepositoriesFragment = graphql`
  fragment UserRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 24 }
    after: { type: "String" }
    orderBy: { type: "RepositoryOrder", defaultValue: { field: PUSHED_AT, direction: DESC } }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "UserReposPaginationQuery") {
    repositories(first: $first, after: $after, orderBy: $orderBy, isFork: $isFork)
      @connection(key: "UserRepos_repositories", filters: ["orderBy", "isFork"]) {
      edges {
        cursor
        node {
          id
          name
          nameWithOwner
          viewerPermission
          ...RepoCard_reposiotory
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
