import React from "react";
import { Stargazers_stargazers$key } from "./__generated__/Stargazers_stargazers.graphql";
import { graphql, usePaginationFragment } from "react-relay";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";
import { UserFragmentCard } from "@/routes/$user/-components/user/UserFragmentCard";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";
interface StargazersProps {
  stargazers_key: Stargazers_stargazers$key | null;
}

export const Stargazers: React.FC<StargazersProps> = ({ stargazers_key }) => {
  const fragData = usePaginationFragment<OneUserRepoPageQuery, Stargazers_stargazers$key>(
    StarGazersFragment,
    stargazers_key
  );

  const frags = fragData.data;
  if (!frags) return null;
  return (
    <div className="w-full h-full flex justify-center flex-wrap @container/stars gap-2">
      {frags.stargazers.edges?.map((stg, idx) => {
        if (!stg?.node) return
        return <UserFragmentCard user_fragment_key={stg?.node} key={stg.cursor} />;
      })}
      <LoadMoreButton frag={fragData}/>
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
