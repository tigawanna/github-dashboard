import { routes } from "@/components/navigation/routes";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

interface MainDrawerLinksProps {}

export function MainDrawerLinks({}: MainDrawerLinksProps) {
  const { state ,isMobile } = useSidebar();
  const { pathname } = useLocation();
  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex h-full p-1 w-full flex-col items-center gap-5 px-3">
        {routes.map((route) => (
          <TooltipProvider key={route.name}>
            <Tooltip defaultOpen={false} delayDuration={10} disableHoverableContent>
              <TooltipTrigger
                asChild
                className={
                  pathname === route.href
                    ? `flex w-full gap-3 rounded-lg bg-base-200 text-primary`
                    : `flex w-full gap-3 rounded-sm hover:bg-base-300`
                }>
                <Link
                  key={route.name}
                  to={route.href}
                  className=" w-full  hover:text-primary  gap-3 flex items-center justify-between  bg-base-300">
                  {route.icon}
                  {(state === "expanded" || isMobile) && <div className="flex w-full p-2">{route.name}</div>}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{route.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
