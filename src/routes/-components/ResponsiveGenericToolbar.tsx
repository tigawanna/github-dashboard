import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { Link } from "@tanstack/react-router";
import { MapPinHouse } from "lucide-react";

interface ResponsiveGenericToolbarProps {
children: React.ReactNode
}

export function ResponsiveGenericToolbar({children}:ResponsiveGenericToolbarProps){
return (
  <div className="drawer" data-test="sidebar-drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex h-full min-h-screen flex-col bg-base-300/70">
      {/* Navbar */}
      <div className="flex-none md:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
          data-test="homepage-side-drawer-toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <div
        data-test="homepage-toolbar"
        className="hidden w-full max-w-full items-center justify-between px-2 md:flex"
      >
        <div className="flex">
          <Link
            to="/"
            data-test="homepage-home-link"
            className="flex items-center gap-2 text-2xl font-bold hover:text-accent"
          >
            My property manager
            <MapPinHouse />
          </Link>
        </div>
        <ThemeToggle />
      </div>
      {/* Page content here */}
      {children}
    </div>
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul
        data-test="homepage-sidebar"
        className="menu min-h-full w-80 justify-between bg-base-300/70 p-4"
      >
        {/* Sidebar content here */}

        <Link
          to="/"
          data-test="sidebar-homepage-home-link"
          className="flex flex-col-reverse items-center gap-2 p-3 text-2xl font-bold hover:text-accent md:flex-row"
        >
          My property manager
          <MapPinHouse className="size-32 md:hidden" />
        </Link>

        <div>
          <ThemeToggle />
        </div>
      </ul>
    </div>
  </div>
);
}
