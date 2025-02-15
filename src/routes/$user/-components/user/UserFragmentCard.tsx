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
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link className="hover:text-primary" to="/$user" params={{ user: oneuser.login }}>
          <Avatar className="h-24 w-24">
            <AvatarImage src={oneuser.avatarUrl} alt={oneuser.login} />
            <AvatarFallback>{oneuser.login.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-2xl">{oneuser.name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{oneuser.login}</p>
            <CardDescription className="text-sm text-muted-foreground">
              {oneuser.bio}
            </CardDescription>
          </div>
        </Link>
        <div className="flex-center">
          {!oneuser.isViewer ? (
            <div className="w-full  flex-center">
              {yes ? (
                <Button
                  size={"sm"}
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
      </CardHeader>
      <CardContent className="grid gap-4">
        {oneuser.bio && <p className="text-sm">{oneuser.bio}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {oneuser.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{oneuser.email}</span>
            </div>
          )}
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
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{oneuser.isFollowingViewer ? "Follows you" : "Doesn't follow you"}</span>
          <span>•</span>
          <span>{oneuser.viewerIsFollowing ? "You're following" : "You're not following"}</span>
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
