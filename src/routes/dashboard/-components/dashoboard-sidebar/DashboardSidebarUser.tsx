"use client";
import { BadgeCheck, Bell, ChevronsUpDown, ShieldCheck } from "lucide-react";
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/ui/sidebar";
import { useViewer } from "@/lib/viewer/use-viewer";
import { Link, useNavigate } from "@tanstack/react-router";
export function DashboardSidebarUser() {
  const tsrNavigate = useNavigate();
  const { isMobile } = useSidebar();
  const { viewer, logoutMutation } = useViewer();

  if (!viewer) {
    return null;
  }
//   const avatarUrl = getFileURL({
//     collection_id_or_name: "property_user",
//     fallback: "/avatar.png",
//     record_id: viewer.id,
//     file_name: viewer.avatar,
//   });
const avatarUrl = viewer.avatar_url
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="">
              <Avatar className="h-8 w-8 rounded-full bg-base-content hover:bg-base-300">
                <AvatarImage src={avatarUrl} alt={viewer.login} />
                <AvatarFallback className="rounded-lg">
                  {viewer.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{viewer.login}</span>
                <span className="truncate text-xs">{viewer.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg p-2 text-base-content"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={viewer.login} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="flex items-center gap-1 truncate font-semibold">
                    {viewer.name}{" "}
                  </span>
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
            <div>
                <button
                  className="btn-error max-w-[98%]"
                  onClick={() => {
                    logoutMutation();
                  }}
                >
                  Logout
                </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
