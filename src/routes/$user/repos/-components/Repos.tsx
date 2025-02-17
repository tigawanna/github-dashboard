import { graphql } from "relay-runtime";
import { usePaginationFragment } from "react-relay";
import { UserReposPageQuery } from "./__generated__/UserReposPageQuery.graphql";
import { useRepoSelector } from "./use-repo-selector";
import { RepoCard } from "./repo-card/RepoCard";
import { useState } from "react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Edit } from "lucide-react";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";
import {  UserRepos_repositories$key } from "./__generated__/UserRepos_repositories.graphql";
import { useViewer } from "@/lib/viewer/use-viewer";
import { DeleteRepository } from "./repo-card/DeleteRepository";
import { useParams } from "@tanstack/react-router";

interface ReposProps {
  user_repos_key?: UserRepos_repositories$key | null;
}

export function Repos({ user_repos_key }: ReposProps) {
  const { user } = useParams({ from: "/$user" });
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const { deselectAll, selectAll, selected, unselectItem, selectItem, setSelected } =
    useRepoSelector();
  const { viewer } = useViewer();
  const fragData = usePaginationFragment<UserReposPageQuery, UserRepos_repositories$key>(
    RepositoriesFragment,
    user_repos_key
  );
    if (!viewer) {
      return null;
    }
  const repo_response = fragData.data?.repositories;
  const repos = repo_response?.edges;
  const is_all_selected = selected && selected.length === repos?.length ? true : false;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full bg-base-200 sticky -top-2 flex flex-wrap justify-evenly z-30 p-1">
        {/* <FilterRepos /> */}
        <div className=" flex flex-wrap w-full items-center justify-center gap-[5%]">
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
            <div className="border border-primary p-1 text-xl rounded-xl">{selected?.length}</div>
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
      <ul className="flex flex-wrap gap-5 w-full @container/repos items-center justify-center">
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
  fragment Repos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 2 }
    after: { type: "String" }
    orderBy: { type: "RepositoryOrder", defaultValue: { field: PUSHED_AT, direction: DESC } }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "ReposPaginationQuery") {
    repositories(first: $first, after: $after, orderBy: $orderBy, isFork: $isFork)
      @connection(key: "Repos_repositories", filters: ["orderBy", "isFork"]) {
      edges {
        cursor
        node {
          ...RepoCardTest_reposiotory
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
