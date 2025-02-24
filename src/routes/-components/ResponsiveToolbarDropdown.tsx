import { MainNavbarUser } from "@/components/navigation/navbar/MainNavbarUser";
import { routes } from "@/components/navigation/routes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/ui/dropdown-menu";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { Link } from "@tanstack/react-router";
import { CircleEllipsis } from "lucide-react";

interface ResponsiveToolbarDropdownProps {

}

export function ResponsiveToolbarDropdown({}:ResponsiveToolbarDropdownProps){
return (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <CircleEllipsis className="size-7"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-fit w-fit px-2">
      <DropdownMenuLabel>Links</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {routes.map((route) => (
        <DropdownMenuItem key={route.name}>
          <Link className="w-full flex  gap-2" to={route.href}>
            {route.icon}
            {route.name}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <ThemeToggle />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="p-3">
        <MainNavbarUser />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
}
