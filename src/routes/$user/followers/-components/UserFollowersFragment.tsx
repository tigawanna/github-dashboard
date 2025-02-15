import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { UserFollowersPageQuery } from "./__generated__/UserFollowersPageQuery.graphql";
import { UserFragmentCard } from "../../-components/user/UserFragmentCard";
import { UserFollowersFragment$key } from "./__generated__/UserFollowersFragment.graphql";

interface UserFollowersFragmentProps {
followers_key: UserFollowersFragment$key
}

export function UserFollowersFragment({followers_key}:UserFollowersFragmentProps){
    const fragData = usePaginationFragment<UserFollowersPageQuery, UserFollowersFragment$key>(
      FollowersFragment,
      followers_key
    );
    const frags = fragData.data;
    if (!frags) return null;
return (
    <div className="w-full h-full flex justify-center flex-wrap @container gap-2">
    {/* <div className="w-full  flex justify-center">
      <TailwindIndicator/>
      <TailwindContainerIndicator/>
      </div> */}
      {frags.followers.edges?.map((stg, idx) => {
        if (!stg?.node) return
        return <UserFragmentCard user_fragment_key={stg?.node} key={stg.cursor} />;
      })}

      <div className="w-full flex justify-center items-center p-2">
      {fragData.isLoadingNext ? <div className="w-full flex justify-center text-center">loading more...</div> : null}
      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="btn btn-wide btn-sm btn-ghost"
          onClick={() => {
            fragData.loadNext(5);
          }}>
          --- load more ---
        </button>
      ) : null}
      </div>
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


