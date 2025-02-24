import { useViewer } from "@/lib/viewer/use-viewer";
import { BadgeCheck, Bell, ChevronsUpDown, ShieldCheck, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { LogoutButton } from "@/lib/viewer/LogoutButton";
interface MainNavbarUserProps {
  compact?: boolean;
}

export function MainNavbarUser({ compact }: MainNavbarUserProps) {
  const { viewer, logoutMutation } = useViewer();
  if (!viewer) {
    return (
      <Link to="/auth" search={{ returnTo: window.location.pathname }}>
        <User />
      </Link>
    );
  }
  const avatarUrl = viewer.avatar_url;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <SidebarMenuButton size="lg" className=""> */}
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8 rounded-full bg-base-content hover:bg-base-300">
            <AvatarImage src={avatarUrl} alt={viewer.login} />
            <AvatarFallback className="rounded-lg">{viewer.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {!compact && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{viewer.login}</span>
              <span className="truncate text-xs">{viewer.email}</span>
            </div>
          )}
          {/* <ChevronsUpDown className="ml-auto size-4" /> */}
        </div>
        {/* </SidebarMenuButton> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-base-300 p-2 text-base-content"
        //   side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatarUrl} alt={viewer.login} />
              <AvatarFallback className="rounded-lg">{viewer.login?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="flex items-center gap-1 truncate font-semibold">{viewer.name} </span>
              <span className="truncate text-xs">{viewer.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/profile" className="w-full">
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* <MutationButton
              className="btn-error max-w-[98%]"
              onClick={() => {
                logoutMutation.mutate();
                tsrNavigate({ to: "/auth", search: { returnTo: "/" } });
              }}
              label="Logout"
              mutation={logoutMutation}
            /> */}
        <div className="flex gap-3 w-full">
          <LogoutButton/>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
