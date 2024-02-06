
import { useState } from "react";
import { PersonCardfollowMutation } from "./__generated__/PersonCardfollowMutation.graphql";
import { PersonCardunfollowMutation } from "./__generated__/PersonCardunfollowMutation.graphql";
import { PersonCard_user$data } from "./__generated__/PersonCard_user.graphql";
import { Link } from "rakkasjs";
import { graphql, useFragment, useMutation } from "@/lib/graphql/relay/modules";
import { Button } from "@/components/shadcn/ui/button";


interface PersonCardProps {
personRef:any 
}

export const PersonCard: React.FC<PersonCardProps> = ({ personRef}) => {
const data = useFragment(PersonCardFragment, personRef);
const dev = data as PersonCard_user$data
const [yes, setYes] = useState<any>(dev?.viewerIsFollowing);
  const [followMutation, isFollowMutationInFlight] = useMutation<PersonCardfollowMutation>(FOLLOWUSER)
  const [unfollowMutation, isUnFollowMutationInFlight] = useMutation<PersonCardunfollowMutation>(UNFOLLOWUSER)

  
const followThem = (their_id: string) => {
  setYes(true);
  followMutation({variables:{input: { userId: their_id }}})
 // followUser(their_name, token);
    // followMutation.mutate({input:{userId:their_id}})
};
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation({ variables: { input: { userId: their_id } } })
    // unfollowUser(their_name, token);
    // unfollowMutation.mutate({input:{userId:their_id}})
  };
// console.log("dev.login",dev.login)
  return (
    <div className="h-44 w-[99%] md:w-[31%] lg:w-[25%] m-2 md:m-2">
      <div
        className="w-full h-full flex flex-col 
      justify-between
       hover:shadow-md m-1 p-2 border-[1px] border-black dark:border-white rounded-sm"
      >
        <Link href={"/profile/" + dev?.login}>
          <div className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full">
            <div className="h-full w-16 mx-2">
              <img
                className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
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
              md:text-[13px] break-word w-[95%] text-ellipsis overflow-hidden"
              >
                {dev?.bio}
              </div>
            </div>
          </div>
        </Link>

        <div className="w-full  flex-center">
          {!dev?.isViewer ? (
            <div className="w-full  flex-center">
              {yes ? (
                <Button
                  onClick={() => unfollowThem(dev.id)}
                  className=" rounded-md  w-[90%]"
                >
                  {"Unfollow"}
                </Button>
              ) : (
                <Button
                  onClick={() => followThem(dev.id)}
                  className=" rounded-md  w-[90%]"
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
mutation PersonCardunfollowMutation($input:UnfollowUserInput!){
  unfollowUser(input:$input){
    clientMutationId
  }
}
`;
