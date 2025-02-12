import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/shadcn/ui/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import { Separator } from "@/components/shadcn/ui/separator";
import { Outlet, useRouteContext } from "@tanstack/react-router";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarLinks } from "./DashboardSidebarLinks";
// import { DashboardSidebarUser } from "./DashboardSidebarUser";
import { TSRBreadCrumbs } from "@/lib/tanstack/router/TSRBreadCrumbs";
import { DashboardTheme } from "./DashboardTheme";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { useIsographEnviroment } from "@/lib/isograph/client";
import { IsographEnvironmentProvider } from "@isograph/react";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { DashboardSidebarUser } from "./DashboardSidebarUser";
import { RouterPendingComponent } from "@/lib/tanstack/router/RouterPendingComponent";

interface DashboardLayoutProps {
  sidebar_props?: React.ComponentProps<typeof Sidebar>;
}

export function DashboardLayout({ sidebar_props }: DashboardLayoutProps) {
  const {PAT} = useRouteContext({from:"__root__"});
  const environment = useIsographEnviroment(PAT!);
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
        <header className="fixed z-30 flex h-10 items-center gap-2 bg-base-100 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <TSRBreadCrumbs />
          </div>
        </header>
        {/* main content */}
        <div data-test="dashboard-layout" className="h-full mt-12 p-2 min-h-screen bg-accent/10">
          <IsographEnvironmentProvider environment={environment}>
            <Suspense fallback={<RouterPendingComponent/>}>
              <Outlet />
            </Suspense>
          </IsographEnvironmentProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
