import React from "react";
import { Commits_history$key } from "./__generated__/Commits_history.graphql";
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import { getRelativeTimeString } from "@/utils/date";
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";


interface CommitsProps {
  data?: Commits_history$key | null;
}

export function Commits({ data }: CommitsProps) {
  const fragData = usePaginationFragment<
    OneUserRepoPageQuery,
    Commits_history$key
  >(CommitsOnBranchFragment, data);
  const commits = fragData?.data;

  if (!commits) return null;
  return (
    <div className="w-full p-1 m-2 flex-center-col  ">
      <div className="w-full">
        {commits?.history?.edges?.length}/{commits.history.totalCount} Commits
      </div>

      {commits.history.edges?.map((commit, index) => {
        return (
          <Commit commit={commit} key={commit?.node?.pushedDate + index} />
        );
      })}
         <LoadMoreButton frag={fragData}/>
    </div>
  );
}

type CommitType = {
  readonly node:
    | {
        readonly author:
          | {
              readonly email: string | null | undefined;
              readonly name: string | null | undefined;
            }
          | null
          | undefined;
        readonly authoredDate: any;
        readonly committedDate: any;
        readonly message: string;
        readonly pushedDate: any;
        readonly url: any;
      }
    | null
    | undefined;
};
interface CommitProps {
  commit: CommitType | null | undefined;
}

export const Commit: React.FC<CommitProps> = ({ commit }) => {
  const vslink = `https://vscode.dev/${commit?.node?.url}`;
  return (
    <div className="w-full p-1 m-1 border rounded flex items-center  flex-wrap">
      <div className="w-fit mx-1  font-bold ">
        {commit?.node?.author?.name}
      </div>
      <div className="w-fit text-sm p-1">
        {getRelativeTimeString(commit?.node?.committedDate)}
      </div>

      <div className="w-fit  m-1 font-serif break-all  text-sm">
        {commit?.node?.message}
      </div>

      <div className="flex gap-3 justify-center items-center">
        <a
          target="_blank"
          rel="noreferrer"
          href={vslink}
          className="hover:text-accent"
        >
       <VscVscodeInsiders className="h-5 w-5" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={commit?.node?.url}
          className="hover:text-accent border rounded-full border-base-content p-0.5"
        >
          <FaGithub className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export const CommitsOnBranchFragment = graphql`
  fragment Commits_history on Commit
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "String" }
  )
  @refetchable(queryName: "CommitsPaginationQuery") {
    history(first: $first, after: $after) @connection(key: "Commits_history") {
      totalCount
      edges {
        node {
          committedDate
          author {
            name
            email
          }
          message
          url
          pushedDate
          authoredDate
          committedDate
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
