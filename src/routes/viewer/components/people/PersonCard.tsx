import { useState } from "react";
import { PersonCardfollowMutation } from "./__generated__/PersonCardfollowMutation.graphql";
import { PersonCardunfollowMutation } from "./__generated__/PersonCardunfollowMutation.graphql";
import { PersonCard_user$data } from "./__generated__/PersonCard_user.graphql";
import { Link } from "rakkasjs";
import { graphql, useFragment, useMutation } from "@/lib/relay/modules";
import { Button } from "@/components/shadcn/ui/button";
import { FragmentRefs } from "relay-runtime";

interface PersonCardProps {
  personRef?: {
    readonly " $fragmentSpreads": FragmentRefs<"PersonCard_user">;
  } | null;
}

export const PersonCard: React.FC<PersonCardProps> = ({ personRef }) => {
  const data = useFragment(PersonCardFragment, personRef);
  const dev = data as PersonCard_user$data;
  const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);
  const [followMutation, isFollowMutationInFlight] =
    useMutation<PersonCardfollowMutation>(FOLLOWUSER);
  const [unfollowMutation, isUnFollowMutationInFlight] =
    useMutation<PersonCardunfollowMutation>(UNFOLLOWUSER);

  const followThem = (their_id: string) => {
    setYes(true);
    followMutation({ variables: { input: { userId: their_id } } });
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation({ variables: { input: { userId: their_id } } });
  };

  return (
    <div
      className="bg-base-300 rounded-lg flex-grow  w-[95%] md:w-[40%] xl:w-[30%]  flex-wrap
    justify-between items-center p-2"
    >
      <div
        className="h-full flex flex-col 
      justify-between
       hover:shadow-md border-[1px]  rounded-sm"
      >
        <Link
          href={"/viewer/" + dev?.login}
          className="hover:text-secondary hover:bg-base-200 p-2"
        >
          <div className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full">
            <div className="h-full w-16 mx-2">
              <img
                className="h-[80%] w-fit rounded-[50%] m-1 b"
                src={dev?.avatarUrl as string}
                alt=""
                height={"10px"}
                width={"10px"}
              />
            </div>
            <div className="flex flex-col  w-[80%] ">
              <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
                @{dev?.login}
              </div>
              <div
                className="text-[12px]  max-h-[100px] font-normal 
              md:text-[13px] break-word w-[95%] line-clamp-3"
              >
                {dev?.bio}
              </div>
            </div>
          </div>
        </Link>

        <div className="flex-center">
          {!dev?.isViewer ? (
            <div className="w-full  flex-center">
              {yes ? (
                <Button
                  size={"sm"}
                  onClick={() => unfollowThem(dev.id)}
                  className=" rounded-md hover:bg-warning  hover:brightness-90 w-full"
                >
                  {"Unfollow"}
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => followThem(dev.id)}
                  className=" rounded-md hover:bg-success hover:brightness-90 w-full"
                >
                  {dev?.isFollowingViewer ? "Follow back" : "Follow"}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const PersonCardFragment = graphql`
  fragment PersonCard_user on User {
    id
    name
    login
    email
    bio
    avatarUrl
    company
    twitterUsername
    createdAt
    isFollowingViewer
    viewerIsFollowing
    isViewer
    location
    url
  }
`;

export const FOLLOWUSER = graphql`
  mutation PersonCardfollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = graphql`
  mutation PersonCardunfollowMutation($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      clientMutationId
    }
  }
`;
