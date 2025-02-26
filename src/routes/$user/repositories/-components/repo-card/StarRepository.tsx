import { Star } from "lucide-react";
import { graphql, useMutation } from "react-relay";
import { StarRepositoryAddStarMutation } from "./__generated__/StarRepositoryAddStarMutation.graphql";
import { StarRepositoryRemoveStarMutation } from "./__generated__/StarRepositoryRemoveStarMutation.graphql";
import { makeHotToast } from "@/components/toasters";
import { humanReadableGQLError } from "@/lib/github/string";

interface StarRepositoryProps {
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number;
}

export function StarRepository({ id, stargazerCount, viewerHasStarred }: StarRepositoryProps) {
  const [starMutation, isStarMutationInFlight] =
    useMutation<StarRepositoryAddStarMutation>(AddStarMutation);
  const [unStarMutation, isUnStarMutationInFlight] =
    useMutation<StarRepositoryRemoveStarMutation>(RemoveStarMutation);

  const is_starring = isStarMutationInFlight || isUnStarMutationInFlight;
  const star_classnames = viewerHasStarred ? "fill-yellow-400" : "";
  const is_starring_classname = is_starring ? "animate-spin" : "";

  return (
    <div className="flex h-full gap-1 text-lg justify-center items-center ">
      <Star
        className={`size-5 outline-0 border-0 hover:size-7 cursor-pointer ${star_classnames} ${is_starring_classname}`}
        onClick={() => {
          if (viewerHasStarred) {
            unStarMutation({
              variables: { starrableId: id },
              onError(error) {
                makeHotToast({
                  title: "Error unstarring",
                  variant: "error",
                  description: humanReadableGQLError(error),
                  duration: 7000,
                });
              },
            });
          } else {
            starMutation({
              variables: { starrableId: id },
              onError: (error) => {
                makeHotToast({
                  title: "Error starring",
                  variant: "error",
                  description: humanReadableGQLError(error),
                  duration:7000,
                });
              },
            });
          }
        }}
      />
      <div className="h-full flex  justify-center items-center">{stargazerCount}</div>
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
