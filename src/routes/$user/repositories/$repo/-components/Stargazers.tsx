import React from "react";
import { Stargazers_stargazers$key } from "./__generated__/Stargazers_stargazers.graphql";
import { graphql, usePaginationFragment } from "react-relay";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
import { UserFragmentCard } from "@/routes/$user/-components/user/UserFragmentCard";
interface StargazersProps {
  stargazers_key: Stargazers_stargazers$key | null;
}

export const Stargazers: React.FC<StargazersProps> = ({ stargazers_key }) => {
  const fragData = usePaginationFragment<OneUserRepoPageQuery, Stargazers_stargazers$key>(
    StarGazersFragment,
    stargazers_key
  );

  const frags = fragData.data;
  console.log({frags})
  if (!frags) return null;
  return (
    <div className="w-full h-full flex-center-col">
      {frags.stargazers.edges?.map((stg, idx) => {
        if (!stg?.node) return
        console.log("  stg.node.__id ", stg.node);
        return <UserFragmentCard user_fragment_key={stg?.node} key={stg.cursor} />;
      })}
      {fragData.isLoadingNext ? <div className="w-full flex-center">loading more...</div> : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:primary shadow-lg hover:shadow-primary"
          onClick={() => {
            fragData.loadNext(5);
          }}>
          --- load more ---
        </button>
      ) : null}
    </div>
  );
};

const StarGazersFragment = graphql`
  fragment Stargazers_stargazers on Repository
  @argumentDefinitions(first: { type: "Int", defaultValue: 5 }, after: { type: "String" })
  @refetchable(queryName: "StargazersPaginationQuery") {
    stargazers(first: $first, after: $after) @connection(key: "Stargazers_stargazers") {
      edges {
        cursor
        node {
          ...UserFragmentCard_user
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
