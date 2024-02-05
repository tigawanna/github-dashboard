import { LayoutProps, usePageContext } from "rakkasjs";
import ViewerErrorBoundaryComponent from "./components/ErrorBoundaryComponent";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { RelayEnvironmentProvider } from "@/lib/graphql/relay/modules";
import { fetchFn } from "@/lib/graphql/relay/RelayEnvironment";
export default function Layout({ children }: LayoutProps) {


  return (
    <div className="w-full ">
      <ViewerErrorBoundaryComponent>{children}</ViewerErrorBoundaryComponent>
    </div>
  );
}
// Layout.preload = async (ctx: PreloadContext) => {
//   return await preloadGuards(ctx, "viewer");
// };
