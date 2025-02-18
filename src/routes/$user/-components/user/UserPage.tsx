import { graphql } from "relay-runtime";
import { UserInfo } from "./UserInfo";
import { usePreloadedQuery } from "react-relay";
import { useLoaderData, useParams } from "@tanstack/react-router";
import { UserPageLoaderQuery } from "../../__generated__/UserPageLoaderQuery.graphql";
import { userQuery } from "../../layout";
import { UserGthubEvents } from "./user-events/UserGthubEvents";
import { Suspense } from "react";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";

interface UserPageProps {

}

export function UserPage({}:UserPageProps){
  const preloadedQueryRef = useLoaderData({from:"/$user"})
  const query = usePreloadedQuery < UserPageLoaderQuery>(userQuery, preloadedQueryRef);
  const {user} = useParams({
    from:"/$user"
  })


return (
 <div className='w-full h-full min-h-screen flex flex-col items-center '>
    <UserInfo user_info_key={query.user}/>
    <Suspense fallback={<CardsListSuspenseFallback />}>
    <UserGthubEvents user={user}/>
    </Suspense>
    {/* <UserStats user_info_key={query.user}/> */}
 </div>
);
}

