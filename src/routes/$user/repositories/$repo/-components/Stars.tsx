import React from "react";
import { Stars_stargazers$key } from "./__generated__/Stars_stargazers.graphql";
import { graphql, usePaginationFragment } from "react-relay";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
interface StarsProps {
  data: Stars_stargazers$key | null;
}

export const Stars: React.FC<StarsProps> = ({ data }) => {
  const fragData = usePaginationFragment<
    OneUserRepoPageQuery,
    Stars_stargazers$key
  >(StarGazersFragment, data);

  const frags = fragData.data;
  if (!frags) return null;
  return (
    <div className="w-full h-full flex-center-col">
      {frags.stargazers.edges?.map((stg, idx) => {
        return (
          <div key={idx} className="w-full p-2 border flex-center m-1 rounded">
            <div className=" shadow-lg">
              <img className="w-10 h-10" src={stg?.node.avatarUrl} alt=".." />
            </div>
            <div className="w-full shadow-lg"> {stg?.node.name}</div>
          </div>
        );
      })}
      {fragData.isLoadingNext ? (
        <div className="w-full flex-center">loading more...</div>
      ) : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
          onClick={() => {
            fragData.loadNext(5);
          }}
        >
          --- load more ---
        </button>
      ) : null}
    </div>
  );
};

const StarGazersFragment = graphql`
  fragment Stars_stargazers on Repository
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "String" }
  )
  @refetchable(queryName: "StarsPaginationQuery") {
    stargazers(first: $first, after: $after)
      @connection(key: "Stars_stargazers") {
      edges {
        cursor
        node {
          name
          email
          avatarUrl
        }
      }

      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
