import { LayoutProps } from "rakkasjs";
import ViewerErrorBoundaryComponent from "./components/ErrorBoundaryComponent";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full ">
      <ViewerErrorBoundaryComponent>{children}</ViewerErrorBoundaryComponent>
    </div>
  );
}
// Layout.preload = async (ctx: PreloadContext) => {
//   return {
//     head: { title: "Github dashboard" },

//   };
// };
