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
import { RepoFiltersSelect, RepoIsForkSwitch, RepoOrderSelect } from "./RepoFiltersSelect";

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
  const validRepos = repos?.filter((i) => i?.node && i?.node?.viewerPermission === "ADMIN");
  const is_all_selected = selected && selected.length === validRepos?.length ? true : false;
  if (!viewer) {
    return null;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full bg-base-200 sticky mb-4 -top-1 left-0 right-0 flex flex-wrap justify-evenly z-40 md:z-30 ">
        {/* <FilterRepos /> */}
        <div className=" flex flex-wrap w-full  items-center justify-center md:justify-end gap-5 rounded-2xl py-2">
          <RepoOrderSelect />
          <RepoIsForkSwitch />
          <Edit onClick={() => setEditing(!editing)} className="size-6 hover:text-primary" />

          {editing && selected && selected?.length > 0 && (
            <div className=" p-1  rounded-xl">{selected?.length}</div>
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
        </div>
      </div>
      <ul className="flex flex-wrap gap-5 w-full h-full @container/repos items-center justify-center">
        {repos &&
          repos.map((edge, idx) => {
            if (!edge?.node) return;
            return (
              <RepoCard
                user={user}
                key={edge?.node?.id}
                edge={edge}
                local_viewer={viewer}
                editing={editing}
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
