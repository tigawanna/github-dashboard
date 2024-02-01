import  Nprogress  from "@/components/navigation/nprogress/Nprogress";
import { ClientSuspense, LayoutProps, useLocation } from "rakkasjs";
import "./index.css";
import { Sidebar } from "@/components/navigation/bars/sidebar";
import Toaster from "@/components/wrappers/DefaltExportedToaster";
import ErrorBoundaryComponent from "@/components/navigation/ErrorBoundaryComponent";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";


function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // console.log(" page ctx ==== ",page_ctx.locals.pb)
  return (
    <ErrorBoundaryComponent>
      <div className="w-full h-screen  overflow-y-hidden  flex flex-col items-center ">
        {/* <Head description={"Resume building assistant"} /> */}
        <ClientSuspense fallback={null}>
          <Nprogress
            isAnimating={location && location?.pending ? true : false}
          />
        </ClientSuspense>
        <div className="w-full flex  gap-3">
          <div className="min-w-[5%] w-fit flex h-screen gap-2">
            <Sidebar />
          </div>
          <div className="w-full md:w-[90%]   flex flex-col o gap-2 ">
            <div className="w-fit flex rounded-xl p-2">
              <ClientSuspense fallback={null}>
                <BreadCrumbs />
              </ClientSuspense>
            </div>
             <div className="w-full  h-[95vh] flex flex-col overflow-auto gap-2 pt-2">
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
// Layout.preload = async(ctx: PreloadContext) => {
//   // const layout_preload_cookie = ctx.requestContext?.cookie
//   console.log(" ==== preload cookie  ===== ",ctx.requestContext?.cookie)

//   // await testGithubToken()
//   return {
//     head: {
//       title: "Github Dashboard",
//       description: "Github dashboard built with Rakkasjs (vite + SSR) + Relay + Github GraphQL API",
//     },
//   };
// };

export default Layout;
