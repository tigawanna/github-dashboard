import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import { ClientSuspense, LayoutProps, useLocation } from "rakkasjs";
import "./index.css";
import { Sidebar } from "@/components/navigation/bars/sidebar";
import Toaster from "@/components/wrappers/DefaltExportedToaster";
import ErrorBoundaryComponent from "@/components/navigation/ErrorBoundaryComponent";
import BreadCrumbs from "@/components/navigation/BreadCrumbs";
import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // console.log(" page ctx ==== ",page_ctx.locals.pb)
  return (
    <ErrorBoundaryComponent>
      <div className="w-full h-screen  overflow-y-hidden  flex flex-col items-center ">
        {/* <Head description={"Resume building assistant"} /> */}
        <ClientSuspense fallback={<div></div>}>
          <Nprogress
            isAnimating={location && location?.pending ? true : false}
          />
        </ClientSuspense>
        <div className="w-full flex  gap-3">
          <div className="min-w-[5%] w-fit flex h-screen gap-2">
            <Sidebar />
          </div>
          <div className="w-full md:w-[90%]  max-h-[97vh] flex flex-col gap-2 pt-2">
            <div className="w-fit flex rounded-xl p-auto">
              <ClientSuspense fallback={<div className="h-5"></div>}>
                <BreadCrumbs />
              </ClientSuspense>
            </div>
            <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
          </div>
        </div>
        <ClientSuspense fallback={<div></div>}>
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
