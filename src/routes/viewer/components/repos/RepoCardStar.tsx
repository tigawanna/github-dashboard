import { Star } from "lucide-react";
import { OneRepoEdge } from "./RepoCard";
import { graphql, useMutation } from "@/lib/relay/modules";
import { RepoCardStardAddStarMutation } from "./__generated__/RepoCardStardAddStarMutation.graphql";
import { RepoCardStardRemoveStarMutation } from "./__generated__/RepoCardStardRemoveStarMutation.graphql";

interface RepoCardStarProps {

  id: string;
  viewerHasStarred: boolean;
  stargazerCount:number;
}

export function RepoCardStar({ id,stargazerCount,viewerHasStarred }: RepoCardStarProps) {
  const [starMutation, isStarMutationInFlight] =
    useMutation<RepoCardStardAddStarMutation>(AddStarMutation);
  const [unStarMutation, isUnStarMutationInFlight] =
    useMutation<RepoCardStardRemoveStarMutation>(RemoveStarMutation);


  const is_starring = isStarMutationInFlight || isUnStarMutationInFlight;
  const star_classnames = viewerHasStarred ? "fill-yellow-400" : "";
  const is_starring_classname = is_starring ? "animate-spin" : "";
  return (
    <div className="flex gap-1 justify-center items-center ">
      <Star
        className={`w-5 h-5 ${star_classnames} ${is_starring_classname}`}
        onClick={() => {
          if (viewerHasStarred) {
            unStarMutation({ variables: { starrableId:id } });
          } else {
            starMutation({ variables: { starrableId:id } });
          }
        }}
      />
      {stargazerCount}
    </div>
  );
}

export const AddStarMutation = graphql`
  mutation RepoCardStardAddStarMutation($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId, clientMutationId: "" }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;

export const RemoveStarMutation = graphql`
  mutation RepoCardStardRemoveStarMutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId, clientMutationId: "" }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;
