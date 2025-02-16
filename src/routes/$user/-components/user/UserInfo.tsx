import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { TbPoint, TbBrandTwitter } from "react-icons/tb";
import { MdCorporateFare } from "react-icons/md";

import { useState } from "react";

import { Button } from "@/components/shadcn/ui/button";
import { graphql, useFragment, useMutation } from "react-relay";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { getRelativeTimeString } from "@/utils/date";
import { UserInfofollowMutation } from "./__generated__/UserInfofollowMutation.graphql";
import { UserInfounfollowMutation } from "./__generated__/UserInfounfollowMutation.graphql";
import { UserInfo$key } from "./__generated__/UserInfo.graphql";
// dayjs.extend(relativeTime);

interface UserInfoProps {
  user_info_key?: UserInfo$key | null;
}

export function UserInfo({ user_info_key }: UserInfoProps) {
  const fragData = useFragment<UserInfo$key>(UserInfoFragmant, user_info_key);
  const extradetails = {
    company: fragData?.company,
    email: fragData?.email,
    location: fragData?.location,
    twitter: fragData?.twitterUsername,
  };

  const [yes, setYes] = useState<any>(fragData?.viewerIsFollowing);
  const [followMutation] = useMutation<UserInfofollowMutation>(FOLLOWUSER);
  const [unfollowMutation] = useMutation<UserInfounfollowMutation>(UNFOLLOWUSER);
  // const [active, setActive] = useState<string>("");
  // const username = user?.login as string;
  const admin = fragData?.isViewer;
  //console.log("og user",admin)
  const followThem = (their_id: string) => {
    setYes(true);
    followMutation({ variables: { input: { userId: their_id } } });
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation({ variables: { input: { userId: their_id } } });
  };
  return (
    <div className="w-full flex">
      <Helmet
        title={fragData?.login}
        description={fragData?.bio ?? "Github user profile"}
        // og:title={fragData?.login}
        // og:description={fragData?.bio ?? "Github user profile"}
        // og:image={fragData?.avatarUrl}
      />
      <div className="w-full flex flex-col items-center justify-center  p-2  ">
        <div className="p-1 h-full w-full flex flex-col md:flex-row items-center">
          <img
            className="
           h-[100%] w-[100%] md:w-[30%] lg:w-[20%] object-cover aspect-square rounded-[5%]  p-1"
            src={fragData?.avatarUrl as string}
            alt=""
            height={200}
            width={200}
          />

          <div
            className="text-[15px]  flex flex-col md:flex-row  items-center md:justify-evenly
           p-3  m-2 w-full  bg-base-200 rounded-lg shadow-lg
           font-sans  h-full">
            <div className="text-[15px] w-full ">
              <div className=" text-[15px] md:text-xl font-bold  ">{fragData?.name}</div>
              <div className="text-[15px] md:text-lg ">@{fragData?.login}</div>
              <div className="text-[15px] max-w-[80%] bg-base-100  p-1">{fragData?.bio}</div>
              <div className="text-[15px]">
                Joined {" :"} {getRelativeTimeString(fragData?.createdAt)}
              </div>
            </div>

            <div className="w-full flex flex-wrap md:justify-center items-center gap-3 md:gap-2">
              <ProfileInfoItemWrapper valkey="email" value={extradetails?.email} />
              <ProfileInfoItemWrapper valkey={"company"} value={extradetails?.company} />
              <ProfileInfoItemWrapper valkey="location" value={extradetails?.location} />
              <ProfileInfoItemWrapper valkey={"twitter"} value={extradetails?.twitter} />
              <div className="flex">
                {!admin ? (
                  <div>
                    {yes ? (
                      <Button
                        onClick={() => unfollowThem(fragData?.id as string)}
                        className="
                rounded-md   hover:bg-error">
                        {"Unfollow"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => followThem(fragData?.id as string)}
                        className="
                   rounded-md hover:bg-success">
                        {fragData?.isFollowingViewer ? "Follow back" : "Follow"}
                      </Button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfileInfoItemWrapperProps {
  value: string | null | undefined;
  valkey: string;
}

export const ProfileInfoItemWrapper: React.FC<ProfileInfoItemWrapperProps> = ({
  valkey,
  value,
}) => {
  // console.log("kyett",valkey,value)
  if (!value) {
    return null;
  }

  const WhatIcon = () => {
    // console.log("kye",valkey,value)
    switch (valkey) {
      case "company":
        return MdCorporateFare;
      case "email":
        return AiOutlineMail;
      case "twitter":
        return TbBrandTwitter;
      case "location":
        return IoLocationOutline;
      default:
        return TbPoint;
    }
  };
  const UserInfoIcons = WhatIcon();
  return (
    <div className="flex items-center justify-center gap-1">
      <UserInfoIcons />
      <div className=" ">{value}</div>
    </div>
  );
};

export const UserInfoFragmant = graphql`
  fragment UserInfo on User {
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
  mutation UserInfofollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = graphql`
  mutation UserInfounfollowMutation($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      clientMutationId
    }
  }
`;
