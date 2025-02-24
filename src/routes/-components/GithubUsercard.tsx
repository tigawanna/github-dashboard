import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { MapPin, Users, BookOpen, Link, LayoutDashboard, LogOut, LogIn, Loader } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {Link as TSRLink} from "@tanstack/react-router"
import { useViewer } from "@/lib/viewer/use-viewer";
import { LogoutButton } from "@/lib/viewer/LogoutButton";

type GithubUser = {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string|null;
  blog: string|null;
  public_repos: number;
  followers: number;
  following: number;
};

export  function GithubUserCard({ user }: { user: GithubUser }) {
  const {logoutMutation} = useViewer();
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">@{user.login}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.bio && <p className="text-sm">{user.bio}</p>}
        <div className="flex flex-wrap gap-2">
          {user.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user.location}
            </Badge>
          )}
          {user.blog && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Link className="w-3 h-3" />
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline">
                Website
              </a>
            </Badge>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{user.public_repos} repos</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{user.followers} followers</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{user.following} following</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <LogoutButton/>

        </div>
        <Button asChild>
          <TSRLink to="/$user" params={{ user: user.login }}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
            <LogIn />
          </TSRLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
