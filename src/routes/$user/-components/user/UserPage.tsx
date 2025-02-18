import { graphql } from "relay-runtime";
import { UserInfo } from "./UserInfo";
import { usePreloadedQuery } from "react-relay";
import { useLoaderData } from "@tanstack/react-router";
import { UserPageLoaderQuery } from "../../__generated__/UserPageLoaderQuery.graphql";
import { userQuery } from "../../layout";

interface UserPageProps {

}

export function UserPage({}:UserPageProps){
  const preloadedQueryRef = useLoaderData({from:"/$user"})
  const query = usePreloadedQuery < UserPageLoaderQuery>(userQuery, preloadedQueryRef);
  


return (
 <div className='w-full h-full min-h-screen flex flex-col items-center '>
    <UserInfo user_info_key={query.user}/>
    {/* <UserStats user_info_key={query.user}/> */}
 </div>
);
}

