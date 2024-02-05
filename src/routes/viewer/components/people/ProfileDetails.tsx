import { graphql, useFragment, useMutation } from "@/lib/graphql/relay/modules";
import { ProfileDetails$key } from "./__generated__/ProfileDetails.graphql";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { TbPoint, TbBrandTwitter } from "react-icons/tb";
import { MdCorporateFare } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

import { ProfileDetailsfollowMutation } from "./__generated__/ProfileDetailsfollowMutation.graphql";
import { ProfileDetailsunfollowMutation } from "./__generated__/ProfileDetailsunfollowMutation.graphql";
dayjs.extend(relativeTime);

interface ProfileDetailsProps {
  profile_details_key: ProfileDetails$key;
}

export function ProfileDetails({ profile_details_key }: ProfileDetailsProps) {
  const user = useFragment<ProfileDetails$key>(
    ProfileDetailsFragmant,
    profile_details_key,
  );
  const extradetails = {
    company: user?.company,
    email: user?.email,
    location: user?.location,
    twitter: user?.twitterUsername,
  };

  const [yes, setYes] = useState<any>(user?.viewerIsFollowing);
  const [followMutation] =
    useMutation<ProfileDetailsfollowMutation>(FOLLOWUSER);
  const [unfollowMutation] =
    useMutation<ProfileDetailsunfollowMutation>(UNFOLLOWUSER);
  // const [active, setActive] = useState<string>("");
  // const username = user?.login as string;
  const admin = user?.isViewer;
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
      <div className="w-full   p-2  ">
        <div className="p-1 h-full w-full flex flex-col md:flex-row items-center">
          <img
            className="
           h-[100%] w-[100%] md:w-[30%] lg:w-[20%] object-cover aspect-square rounded-[5%]  p-1"
            src={user?.avatarUrl as string}
            alt=""
            height={200}
            width={200}
          />

          <div
            className="text-[15px]  flex flex-col md:flex-row  items-center md:justify-evenly
           p-3  m-2 w-full  bg-base-200 rounded-lg shadow-lg
           font-sans  h-full"
          >
            <div className="text-[15px] w-full ">
              <div className=" text-[15px] md:text-xl font-bold  ">
                {user?.name}
              </div>
              <div className="text-[15px] md:text-lg ">@{user?.login}</div>
              <div className="text-[15px] max-w-[80%] bg-base-100  p-1">
                {user?.bio}
              </div>
              <div className="text-[15px]">
                Joined {" :"} {dayjs(user?.createdAt).fromNow()}
              </div>
            </div>

            <div className="text-[15px] w-full ">
              <ProfileInfoItemWrapper
                valkey="email"
                value={extradetails?.email}
              />
              <ProfileInfoItemWrapper
                valkey={"company"}
                value={extradetails?.company}
              />
              <ProfileInfoItemWrapper
                valkey="location"
                value={extradetails?.location}
              />
              <ProfileInfoItemWrapper
                valkey={"twitter"}
                value={extradetails?.twitter}
              />
            </div>
          </div>
        </div>

        <div className="w-[95%] flex">
          {!admin ? (
            <div>
              {yes ? (
                <button
                  onClick={() => unfollowThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit w-full "
                >
                  {"Unfollow"}
                </button>
              ) : (
                <button
                  onClick={() => followThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit "
                >
                  {user?.isFollowingViewer ? "Follow back" : "Follow"}
                </button>
              )}
            </div>
          ) : null}
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
  const ProfileDetailsIcons = WhatIcon();
  return (
    <div className="flex items-center justify-center gap-1">
      <ProfileDetailsIcons />
      <div className=" ">{value}</div>
    </div>
  );
};

export const ProfileDetailsFragmant = graphql`
  fragment ProfileDetails on User {
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
  mutation ProfileDetailsfollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
    }
  }
`;

export const UNFOLLOWUSER = graphql`
  mutation ProfileDetailsunfollowMutation($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      clientMutationId
    }
  }
`;
