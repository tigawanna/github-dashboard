import { useSuspenseQuery } from "@tanstack/react-query";
import { Main } from "./types";
import { UserGthubEventsCard } from "./UserGthubEventsCard";

interface UserGthubEventsProps {
    user:string;
}

export function UserGthubEvents({user}:UserGthubEventsProps){
  const query =  useSuspenseQuery({
    queryKey:["events",user],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${user}/events`);
      return res.json() as Promise<Main[]>;
    }

  })
  const events = query.data
  console.log("=== events =========== ",events)
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">Github Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <UserGthubEventsCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);
}
