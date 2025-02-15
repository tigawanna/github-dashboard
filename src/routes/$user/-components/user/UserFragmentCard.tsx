import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/shadcn/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Mail, MapPin, Building, Calendar, LinkIcon, Loader } from "lucide-react";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { UserFragmentCard_user$key } from "./__generated__/UserFragmentCard_user.graphql";
import { FaTwitter } from "react-icons/fa";
import { UserFragmentCardfollowMutation } from "./__generated__/UserFragmentCardfollowMutation.graphql";
import { UserFragmentCardunfollowMutation } from "./__generated__/UserFragmentCardunfollowMutation.graphql";
import { useState } from "react";
import { makeHotToast } from "@/components/toasters";
import { getRelativeTimeString } from "@/utils/date";
import { Link } from "@tanstack/react-router";
import { TailwindContainerIndicator } from "@/components/navigation/tailwind-indicator";

interface UserFragmentCardProps {
  user_fragment_key: UserFragmentCard_user$key;
}

export function UserFragmentCard({ user_fragment_key }: UserFragmentCardProps) {
  const data = useFragment(UserFragment, user_fragment_key);
  const [yes, setYes] = useState<any>(data?.viewerIsFollowing);
  const [followMutation, isFollowMutationInFlight] =
    useMutation<UserFragmentCardfollowMutation>(FOLLOWUSER);
  const [unfollowMutation, isUnFollowMutationInFlight] =
    useMutation<UserFragmentCardunfollowMutation>(UNFOLLOWUSER);

  const followThem = (their_id: string) => {
    setYes(true);
    followMutation({
      variables: { input: { userId: their_id } },
      onError(error) {
        makeHotToast({
          title: "Error Following",
          variant: "error",
          description: error.message,
        });
      },
    });
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation({
      variables: { input: { userId: their_id } },
      onError(error) {
        makeHotToast({
          title: "Error Unfollowing",
          variant: "error",
          description: error.message,
        });
      },
    });
  };

  if (!data) return null;
  const oneuser = data;

  return (
    <Card className="flex flex-col justify-between p-1 md:@2xl:w-[48%] flex-grow xl:w-[30%]  @2xl:lg:w-[48%] rounded-2xl border-primary/30  bg-primary/10  transition-colors [&:has(a:hover)]:bg-secondary/10 ">
      <CardHeader className="flex   justify-between items-srart p-0 gap-4 pr-3">
        <Link
          className="hover:text-secondary flex gap-2 group"
          to="/$user"
          params={{ user: oneuser.login }}>
          <Avatar className="h-24 w-24">
            <AvatarImage src={oneuser.avatarUrl} alt={oneuser.login} />
            <AvatarFallback>{oneuser.login.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col p-1">
            <CardTitle className="text-2xl">{oneuser.name}</CardTitle>
            <p className="text-sm text-muted-foreground group-hover:text-secondary/60">
              @{oneuser.login}
            </p>
            {oneuser.email && (
              <div className="flex items-center gap-2 text-xs">
                <Mail className="h-4 w-4 text-muted-foreground " />
                <span>{oneuser.email}</span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex  flex-col justify-between gap-4 p-1 px-2 ">
        {oneuser.bio && (
          <CardDescription className="text-sm text-muted-foreground line-clamp-1">
            {oneuser.bio}
          </CardDescription>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ">
          {oneuser.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{oneuser.location}</span>
            </div>
          )}
          {oneuser.company && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{oneuser.company}</span>
            </div>
          )}
          {oneuser.twitterUsername && (
            <div className="flex items-center gap-2">
              <FaTwitter className="h-4 w-4 text-muted-foreground" />
              <a
                href={`https://twitter.com/${oneuser.twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline">
                @{oneuser.twitterUsername}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {getRelativeTimeString(oneuser.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            <a
              href={oneuser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline">
              GitHub Profile
            </a>
          </div>
        </div>
        <div className="w-full ">
          {!oneuser.isViewer ? (
            <div className="w-full  flex-center">
              {yes ? (
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => unfollowThem(oneuser.id)}
                  className=" rounded-md hover:bg-warning  hover:brightness-90 w-full">
                  {"Unfollow"} {isUnFollowMutationInFlight && <Loader className="animate-spin" />}
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => followThem(oneuser.id)}
                  className=" rounded-md hover:bg-success hover:brightness-90 w-full">
                  {oneuser.isFollowingViewer ? "Follow back" : "Follow"}

                  {isFollowMutationInFlight && <Loader className="animate-spin" />}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export const UserFragment = graphql`
  fragment UserFragmentCard_user on User {
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
  mutation UserFragmentCardfollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = graphql`
  mutation UserFragmentCardunfollowMutation($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      clientMutationId
    }
  }
`;
