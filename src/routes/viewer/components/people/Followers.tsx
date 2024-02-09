import { FragmentRefs } from "relay-runtime";
import { Followers_followers$key } from "./__generated__/Followers_followers.graphql";
import { PersonCard } from "./PersonCard";
import { graphql,usePaginationFragment } from "@/lib/graphql/relay/modules";
import { LoadMoreButton } from "../shared";

interface FollowersProps {
  refs: {
    readonly " $fragmentSpreads": FragmentRefs<
      "Followers_followers" | "Following_following"
    >;
  } | null;
}

export function Followers({ refs }: FollowersProps) {
  const followers_fragment = usePaginationFragment<any, Followers_followers$key>(
    FollowersFragment,
    refs,
  );
  const followers = followers_fragment.data;

  return (
    <div className="w-full flex flex-col justify-start h-full  ">
      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        {followers?.followers?.edges?.map((follow, index) => {
          return <PersonCard key={index} personRef={follow?.node} />;
        })}
      </div>

      <LoadMoreButton frag={followers_fragment} />
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
