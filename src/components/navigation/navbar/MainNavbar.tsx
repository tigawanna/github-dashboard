import { Link, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";
import Nprogress from "../nprogress/Nprogress";
import { ThemeToggle } from "../../themes/ThemeToggle";
import { MainNavbarUser } from "./MainNavbarUser";

interface MainNavbarProps {}

export function MainNavbar({}: MainNavbarProps) {
      const panding = useRouterState().status === "pending";
  return (
    <nav className="w-full sticky top-0  p-2 bg-base-200 flex flex-col items-center justify-center">
    <div className="w-full  flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-accent">
        <Home />
      </Link>
      <Link to="/about" className="text-lg">
        About
      </Link>
      <Link to="/dashboard" className="text-lg">
        About
      </Link>

      <ThemeToggle/>
      <MainNavbarUser/>
    </div>
    <Nprogress isAnimating={panding}/>
    </nav>
  );
}
