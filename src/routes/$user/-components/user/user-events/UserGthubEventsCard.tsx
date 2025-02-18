import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { UserIcon, GitBranchIcon, CalendarIcon } from "lucide-react";
import { Main } from "./types";

interface UserGthubEventsCardProps {
  event: Main;
}

export function UserGthubEventsCard({event}:UserGthubEventsCardProps){
return (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>{event.type}</span>
        <Badge variant="outline">{event.public ? "Public" : "Private"}</Badge>
      </CardTitle>
      <CardDescription className="flex items-center space-x-2">
        <UserIcon className="w-4 h-4" />
        <span>{event.actor.login}</span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <GitBranchIcon className="w-4 h-4" />
          <span className="text-sm">{event.repo.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">{new Date(event.created_at).toLocaleString()}</span>
        </div>
        {event.payload.action && <Badge>{event.payload.action}</Badge>}
        {event.payload.pull_request && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Pull Request:</p>
            <p className="text-sm">{event.payload.pull_request.title}</p>
            <Badge variant={event.payload.pull_request.state === "open" ? "default" : "secondary"}>
              {event.payload.pull_request.state}
            </Badge>
          </div>
        )}
        {event.payload.issue && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Issue:</p>
            <p className="text-sm">{event.payload.issue.title}</p>
            <Badge variant={event.payload.issue.state === "open" ? "default" : "secondary"}>
              {event.payload.issue.state}
            </Badge>
          </div>
        )}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        View Details
      </Button>
    </CardFooter>
  </Card>
);
}
