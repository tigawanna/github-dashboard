import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { UserFragmentCard } from "../../-components/user/UserFragmentCard";
import { UserFollowingFragment$key } from "./__generated__/UserFollowingFragment.graphql";
import { UserFollowingPageQuery } from "./__generated__/UserFollowingPageQuery.graphql";
import { TailwindIndicator, TailwindContainerIndicator } from "@/components/navigation/tailwind-indicator";
import { LoadMoreButton } from "@/lib/relay/LoadMoreButton";


interface UserFollowingFragmentProps {
following_key: UserFollowingFragment$key
}

export function UserFollowingFragment({following_key}:UserFollowingFragmentProps){

    const fragData = usePaginationFragment<UserFollowingPageQuery, UserFollowingFragment$key>(
      FollowingFragment,
      following_key
    );
    const frags = fragData.data;
    if (!frags) return null;
return (
    <div className="w-full h-full flex justify-center flex-wrap @container gap-2">
    {/* <div className="w-full  flex justify-center">
      <TailwindIndicator/>
      <TailwindContainerIndicator/>
      </div> */}
      {frags.following.edges?.map((stg, idx) => {
        if (!stg?.node) return
        return <UserFragmentCard user_fragment_key={stg?.node} key={stg.cursor} />;
      })}
    <LoadMoreButton frag={fragData}/>
    </div>
);
}

export const FollowingFragment = graphql`
  fragment UserFollowingFragment on User
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FollowingPaginationQuery") {
    following(first: $first, after: $after) @connection(key: "UserFollowingFragment_following") {
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


