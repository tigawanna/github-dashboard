import { dashboard_routes } from "@/components/navigation/routes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/shadcn/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Link, useLocation } from "@tanstack/react-router";

interface DashboardSidebarLinksProps {}

export function DashboardSidebarLinks({}: DashboardSidebarLinksProps) {
  const { state, setOpen, setOpenMobile, isMobile } = useSidebar();
  const { pathname } = useLocation();
  return (
    <SidebarGroup className="h-full bg-base-100 ">
      <SidebarGroupLabel>House keeping</SidebarGroupLabel>
      <SidebarMenu className="gap-5">
        {dashboard_routes.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <TooltipProvider>
                  <Tooltip
                    defaultOpen={false}
                    delayDuration={10}
                    disableHoverableContent
                  >
                    <TooltipTrigger
                      asChild
                      className={
                        pathname === item.href
                          ? `flex w-full gap-3 rounded-lg bg-base-200 p-1 text-primary`
                          : `flex w-full gap-3 rounded-sm p-1 hover:bg-base-300`
                      }
                    >
                      <Link
                        className="flex items-center gap-[10%]"
                        to={item.href}
                        onClick={() => {
                          if (isMobile) {
                            setOpen(false);
                            setOpenMobile(false);
                          }
                        }}
                      >
                        <button className="size-6">{item.icon}</button>
                        {(state === "expanded" || isMobile) && (
                          <span className="text-center text-lg">
                            {" "}
                            {item.name}
                          </span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
