import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { UserFollowersPageQuery } from "./__generated__/UserFollowersPageQuery.graphql";
import { UserFragmentCard } from "../../-components/user/UserFragmentCard";
import { UserFollowersFragment$key } from "./__generated__/UserFollowersFragment.graphql";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";
import { EmptyList } from "@/components/shared/EmptyList";

interface UserFollowersFragmentProps {
  followers_key: UserFollowersFragment$key;
}

export function UserFollowersFragment({ followers_key }: UserFollowersFragmentProps) {
  const frags = usePaginationFragment<UserFollowersPageQuery, UserFollowersFragment$key>(
    FollowersFragment,
    followers_key
  );

  const followers = frags?.data?.followers?.edges;
  if (!followers || followers?.length === 0) {
    return <EmptyList message="No followers found" />;
  }
  return (
    <div className="w-full h-full flex justify-center flex-wrap @container gap-2">
      {followers?.map((stg, idx) => {
        if (!stg?.node) return;
        return <UserFragmentCard user_fragment_key={stg?.node} key={stg.cursor} />;
      })}
      <LoadMoreButton frag={frags} />
    </div>
  );
}

export const FollowersFragment = graphql`
  fragment UserFollowersFragment on User
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FollowersPaginationQuery") {
    followers(first: $first, after: $after) @connection(key: "UserFollowersFragment_followers") {
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
      totalCount
    }
  }
`;
