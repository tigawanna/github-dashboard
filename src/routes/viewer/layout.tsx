import { LayoutProps } from "rakkasjs";
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
