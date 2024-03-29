import { Following_following$key } from "./__generated__/Following_following.graphql";
import { PersonCard } from "./PersonCard";
import { FragmentRefs } from "relay-runtime";
import { graphql, usePaginationFragment } from "@/lib/relay/modules";
import { LoadMoreButton } from "../shared";
import { viewerVIEWERQuery } from "../../__generated__/viewerVIEWERQuery.graphql";
interface FollowingProps {
  refs: {
    readonly " $fragmentSpreads": FragmentRefs<
      "Followers_followers" | "Following_following"
    >;
  } | null;
}

export function Following({ refs }: FollowingProps) {
  const following_fragment = usePaginationFragment<
    viewerVIEWERQuery,
    Following_following$key
  >(FollowingFragment, refs);
  const following = following_fragment.data;

  return (
    <div className=" w-full flex flex-col justify-start h-full ">
      <div className="flex flex-wrap gap-5 w-full items-center justify-center">
        {following?.following?.edges?.map((follow, index) => {
          return (
            <PersonCard
              key={index}
              // dev={follow?.node}
              personRef={follow?.node}
            />
          );
        })}
      </div>
    <LoadMoreButton frag={following_fragment} />
    </div>
  );
}

export const FollowingFragment = graphql`
  fragment Following_following on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "FollowingPaginationQuery") {
    following(first: $first, after: $after)
      @connection(key: "Following_following") {
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
