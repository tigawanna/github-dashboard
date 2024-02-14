import { Star } from "lucide-react";
import { graphql, useMutation } from "@/lib/relay/modules";
import { hotToast } from "@/components/wrappers/toast";
import { StarRepositoryAddStarMutation } from "./__generated__/StarRepositoryAddStarMutation.graphql";
import { StarRepositoryRemoveStarMutation } from "./__generated__/StarRepositoryRemoveStarMutation.graphql";

interface StarRepositoryProps {
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number;
}

export function StarRepository({
  id,
  stargazerCount,
  viewerHasStarred,
}: StarRepositoryProps) {
  const [starMutation, isStarMutationInFlight] =
    useMutation<StarRepositoryAddStarMutation>(AddStarMutation);
  const [unStarMutation, isUnStarMutationInFlight] =
    useMutation<StarRepositoryRemoveStarMutation>(RemoveStarMutation);

  const is_starring = isStarMutationInFlight || isUnStarMutationInFlight;
  const star_classnames = viewerHasStarred ? "fill-yellow-400" : "";
  const is_starring_classname = is_starring ? "animate-spin" : "";
  return (
    <div className="flex gap-1 justify-center items-center ">
      <Star
        className={`w-5 h-5 ${star_classnames} ${is_starring_classname}`}
        onClick={() => {
          if (viewerHasStarred) {
            unStarMutation({
              variables: { starrableId: id },
              onError(error) {
                hotToast({
                  title: "Error starring",
                  type: "error",
                  description: error.message,
                  autoClose: false,
                });
              },
            });
          } else {
            starMutation({
              variables: { starrableId: id },
              onError: (error) => {
                hotToast({
                  title: "Error starring",
                  type: "error",
                  description: error.message,
                  autoClose: false,
                });
              },
            });
          }
        }}
      />
      {stargazerCount}
    </div>
  );
}

export const AddStarMutation = graphql`
  mutation StarRepositoryAddStarMutation($starrableId: ID!) {
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
  mutation StarRepositoryRemoveStarMutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId, clientMutationId: "" }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;
