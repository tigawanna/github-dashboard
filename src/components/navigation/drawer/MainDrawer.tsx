import { Separator } from "@/components/shadcn/ui/separator";
import {
  SidebarHeader,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import { TSRBreadCrumbs } from "@/lib/tanstack/router/TSRBreadCrumbs";
import { MainDrawerHeader } from "./MainDrawerHeader";
import { OpenCloseDrawerIcons } from "./OpenCloseDrawerIcons";

interface MainDrawerProps {
  sidebar_props?: React.ComponentProps<typeof Sidebar>;
  children: React.ReactNode;
  header?: React.ReactNode;
  links?: React.ReactNode;
  footer?: React.ReactNode;
}

export function MainDrawer({ sidebar_props, children, links, header,footer }: MainDrawerProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className="" collapsible="icon" {...sidebar_props}>
        <SidebarHeader>
          {/* {header} */}
          {header||<MainDrawerHeader />}
        </SidebarHeader>
        <SidebarContent>{links}</SidebarContent>
        <SidebarFooter className="gap-5">
          {footer}
          <div className="h-10" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="fixed z-30 flex h-10 items-center gap-2 bg-base-100 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="" icon={<OpenCloseDrawerIcons />} />
            <Separator orientation="vertical" className="h-4" />
            <TSRBreadCrumbs />
          </div>
        </header>
        {/* main content */}
        <div data-test="dashboard-layout" className="h-full w-full justify-center p-2 min-h-screen ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
