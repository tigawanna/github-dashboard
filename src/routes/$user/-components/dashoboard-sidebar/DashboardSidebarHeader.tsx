import { Castle, LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import SiteIcon from "@/components/icons/Siteicon";
import { useViewer } from "@/lib/viewer/use-viewer";
interface DashboardSidebarHeaderProps {}

export function DashboardSidebarHeader({}: DashboardSidebarHeaderProps) {
  const { state, setOpenMobile, isMobile } = useSidebar();
  const { pathname } = useLocation();
  const { viewer } = useViewer();
  return (
    <div
      className="flex flex-col gap-3 "
      onClick={() => {
        setOpenMobile(false);
      }}>
      <Link
        to="/"
        className="flex w-full items-center justify-center border-b border-primary py-4 hover:bg-primary/20">
        <SiteIcon height={50} />
      </Link>
      {viewer && (
        <Link
          to="/$user"
          params={{ user: viewer?.login }}
          className={
            pathname === "/$user"
              ? ` flex w-full cursor-pointer items-center gap-2 rounded-lg  text-primary p-1 underline-offset-2 `
              : `flex w-full cursor-pointer items-center gap-2 rounded-sm p-1 underline-offset-2 hover:bg-base-300 hover:underline`
          }>
          <LayoutDashboard />
          {(state === "expanded" || isMobile) && <h1 className="text-xl font-bold">Dashboard</h1>}
        </Link>
      )}
    </div>
  );
}
