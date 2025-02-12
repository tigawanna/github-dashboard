import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { Link } from "@tanstack/react-router";
import { MapPinHouse } from "lucide-react";

interface GenericToolbarProps {}

export function GenericToolbar({}: GenericToolbarProps) {
  return (
    <div className="flex w-full items-center justify-between px-2 ">
      <div className="flex  b">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold hover:text-accent"
        >
          My property manager
          <MapPinHouse />
        </Link>
      </div>
      <ThemeToggle />
    </div>
  );
}
