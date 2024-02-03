import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";
import { preloadGuards } from "@/lib/rakkas/prealod";
import { LayoutProps, PreloadContext } from "rakkasjs";
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full ">
      {children}
    </div>
  );
}
// Layout.preload = async (ctx: PreloadContext) => {
//   return await preloadGuards(ctx, "viewer");
// };
