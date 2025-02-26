import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/shadcn/ui/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import { Separator } from "@/components/shadcn/ui/separator";
import { Link, Outlet, useLocation, useParams, useRouteContext } from "@tanstack/react-router";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarLinks } from "./DashboardSidebarLinks";
import { TSRBreadCrumbs } from "@/lib/tanstack/router/TSRBreadCrumbs";
import { DashboardTheme } from "./DashboardTheme";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { Suspense } from "react";
import { DashboardSidebarUser } from "./DashboardSidebarUser";
import { RouterPendingComponent } from "@/lib/tanstack/router/RouterPendingComponent";
import { RelayEnvironmentProvider } from "react-relay";
import { ExternalLink, Search } from "lucide-react";

interface DashboardLayoutProps {
  sidebar_props?: React.ComponentProps<typeof Sidebar>;
}

export function DashboardLayout({ sidebar_props }: DashboardLayoutProps) {
  const { user } = useParams({
    from: "/$user",
  });
  const { pathname } = useLocation();
  const { relayEnviroment } = useRouteContext({
    from: "/$user",
  });
  const ignoreList = ["/search"];
  const showSearchBar = !ignoreList.find((path) => pathname.includes(path));
  return (
    <SidebarProvider defaultOpen={false}>
      <Helmet title="Github| Dashboard" description="Dashboard for Github" />
      <Sidebar className="" collapsible="icon" {...sidebar_props}>
        <SidebarHeader>
          <DashboardSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <DashboardSidebarLinks />
        </SidebarContent>
        <SidebarFooter className="gap-5">
          {/* <ThemeToggle /> */}
          <DashboardTheme />
          <DashboardSidebarUser />
          <div className="h-10" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="fixed z-40 flex h-10 items-center gap-2 bg-base-100 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <TSRBreadCrumbs />
          </div>
        </header>
        {/* main content */}
        <div data-test="dashboard-layout" className="h-full  p-2 min-h-screen ">
          <RelayEnvironmentProvider environment={relayEnviroment!}>
            {showSearchBar && (
              <Link
                to="/$user/search"
                params={{ user }}
                className="w-full flex cursor-pointer items-center group hover:text-primary  justify-end gap-2 px-3 ">
                <div className="input border cursor-pointer border-base-200 group-hover:border-primary w-full md:w-[60%] relative">
                  Search <ExternalLink className="hidden size-3 group-hover:block " />
                </div>
                <Search className="absolute right-[3%]" />
              </Link>
            )}
            <Suspense fallback={<RouterPendingComponent />}>
              <Outlet />
            </Suspense>
          </RelayEnvironmentProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
