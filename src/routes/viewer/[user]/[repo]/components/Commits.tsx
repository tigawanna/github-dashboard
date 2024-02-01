import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SiVisualstudiocode } from "react-icons/si";
import { Commits_history$key } from "./__generated__/Commits_history.graphql";
import { Link } from "rakkasjs";
import { Github } from "lucide-react";

import { usePaginationFragment, graphql } from "@/lib/graphql/relay/modules";

dayjs.extend(relativeTime);
interface CommitsProps {
  data?: Commits_history$key | null;
}

export function Commits({ data }: CommitsProps) {
  const fragData = usePaginationFragment<any, Commits_history$key>(
    CommitsOnBranchFragment,
    data,
  );
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
      {fragData.isLoadingNext ? (
        <div className="w-full flex-center">loading more...</div>
      ) : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:text-accent shadow-lg hover:shadow-base-300"
          onClick={() => {
            fragData.loadNext(5);
          }}
        >
          --- load more ---
        </button>
      ) : null}
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
      <div className="w-fit mx-1  font-bold text-purple-900 dark:text-purple-200">
        {commit?.node?.author?.name}
      </div>
      <div className="w-fit text-sm p-1">
        {dayjs(commit?.node?.committedDate).fromNow()}
      </div>

      <div className="w-fit  m-1 font-serif break-all text-purple-900 dark:text-purple-200 text-sm">
        {commit?.node?.message}
      </div>

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
          href={commit?.node?.url}
          className="hover:text-accent border rounded-full border-base-content p-0.5"
        >
          <Github className="h-5 w-5" />
        </Link>
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
