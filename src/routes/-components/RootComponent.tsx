import { Outlet } from "@tanstack/react-router";
import { TailwindIndicator } from "@/components/navigation/tailwind-indicator";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@/components/wrappers/RouterDevttols";
import { TigawannaFooter } from "@/components/navigation/TigawannaFooter";


export function RootComponent() {

  return (
    <div className="content min-h-screen w-full">
      <div className="size-8 fixed right-[2%] top-[1%] "> 
      <TailwindIndicator />
      </div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <Toaster reverseOrder />

    </div>
  );
}
