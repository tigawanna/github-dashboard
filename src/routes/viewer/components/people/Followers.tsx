import React from "react";
import { FragmentRefs } from "relay-runtime";
import { usePaginationFragment } from "react-relay";
import { FollowersPaginationQuery } from "./__generated__/FollowersPaginationQuery.graphql";
import {
  Followers_followers$data,
  Followers_followers$key,
} from "./__generated__/Followers_followers.graphql";
import { PersonCard } from "./PersonCard";
import { graphql, useFragment, useMutation } from "@/lib/graphql/relay/modules";

interface FollowersProps {
  refs: {
    readonly " $fragmentSpreads": FragmentRefs<
      | "Followers_followers"
      | "Following_following"
      | "Repositories_repositories"
    >;
  } | null;
}

export function Followers({ refs }: FollowersProps) {
  const followers_data = usePaginationFragment<any, Followers_followers$key>(
    FollowersFragment,
    refs,
  );
  const followers = followers_data.data;

  return (
    <div className="min-h-screen w-full flex flex-col justify-start h-full mb-5 ">
      <div className="h-fit w-full flex-center  flex-wrap">
        {followers?.followers?.edges?.map((follow, index) => {
          return <PersonCard key={index} personRef={follow?.node} />;
        })}
      </div>
      {followers_data.hasNext && !followers_data.isLoadingNext ? (
        <button
          className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
          onClick={() => {
            followers_data.loadNext(10);
          }}
        >
          --- load more --- {followers_data.isLoadingNext ? "loading..." : ""}
        </button>
      ) : null}
    </div>
  );
}

export const FollowersFragment = graphql`
  fragment Followers_followers on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "FollowersPaginationQuery") {
    followers(first: $first, after: $after)
      @connection(key: "Followers_followers") {
      edges {
        node {
          ...PersonCard_user
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
