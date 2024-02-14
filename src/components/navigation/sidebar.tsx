import { Link } from "rakkasjs";
import { Github, Home, TestTube } from "lucide-react";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const routes = [
    { name: "home", url: "/", icon: <Home /> },
    { name: "viewer", url: "/viewer", icon: <Github /> },
    { name: "test", url: "/test", icon: <TestTube /> },
    { name: "pb", url: "/pb", icon: <TestTube /> },
  ];
  return (
    <header
      className=" h-screen  flex flex-col  justify-center items-center bg-base-300  
    z-30 gap-1 "
    >
      <div className="w-full h-full flex flex-col justify-center items-center p-2 pb-12 pt-3 gap-5">
        <div className="h-full flex flex-col gap-3 items-center justify-end divide-y-2">
          {routes.map((route) => {
            if (
              (route.name === "test" || route.name === "pb") &&
              !import.meta.env.DEV
            )
              return;
            return (
              <Link
                key={route.name}
                href={route.url}
                data-tip={route.name}
                className="text-3xl  items-center flex gap-3 
                hover:bg-base-300 
              rounded-lg p-2 lg:p-4 tooltip hover:tooltip-top"
              >
                {route.icon}
                {/* <div className="hidden lg:flex text-xl font-bold">
                  {route.name}
                </div> */}
              </Link>
            );
          })}
        </div>
        <MiniSettingsModal />
      </div>
    </header>
  );
}
