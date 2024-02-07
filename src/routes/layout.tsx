import Nprogress from "@/components/navigation/nprogress/Nprogress";
import { ClientSuspense, LayoutProps, useLocation,Head, PreloadContext } from "rakkasjs";
import "./index.css";
import { Sidebar } from "@/components/navigation/bars/sidebar";
import Toaster from "@/components/wrappers/DefaltExportedToaster";
import ErrorBoundaryComponent from "@/components/navigation/ErrorBoundaryComponent";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";

function Layout({ children }: LayoutProps) {
  const location = useLocation();


  return (
    <ErrorBoundaryComponent>
      <div className="w-full h-screen  overflow-y-hidden  flex flex-col items-center ">
        {/* <Head
          title={"Github dashboard"}
          description={"Github dashboard built with react , rakkasjs and relay"}
          og:title={"Github dashboard"}
          og:description={
            "Github dashboard built with react , rakkasjs and relay"
          }
          og:image={"/og.jpeg"}
        /> */}
        
        <ClientSuspense fallback={null}>
          <Nprogress
            isAnimating={location && location?.pending ? true : false}
          />
        </ClientSuspense>
        <div className="w-full flex  gap-3">
          <div className="min-w-[5%] w-fit flex h-screen gap-2">
            <Sidebar />
          </div>
          <div className="w-full    flex flex-col  gap-2 ">
            <div className="w-fit flex rounded-xl">
              <ClientSuspense fallback={null}>
                <BreadCrumbs />
              </ClientSuspense>
            </div>
            <div className="w-full  h-[95vh] md:pl-6 px-1 flex flex-col overflow-y-auto gap-2 ">
              <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
            </div>
          </div>
        </div>
        <ClientSuspense fallback={null}>
          <Toaster />
        </ClientSuspense>
      </div>
    </ErrorBoundaryComponent>
  );
}
Layout.preload = async(ctx: PreloadContext) => {

  return {
    head: {
      title: "Github Dashboard",
      "og:title":"Github dashboard",
      description: "Github dashboard built with Rakkasjs (vite + SSR) + Relay + Github GraphQL API",
      "og:description": "Github dashboard built with Rakkasjs (vite + SSR) + Relay + Github GraphQL API",
      "og:image": "/og.jpeg",
    },
  };
};

export default Layout;
