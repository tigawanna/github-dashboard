import { testGithubToken } from "@/lib/graphql/relay/RelayEnvironment";
import { LayoutProps, PreloadContext } from "rakkasjs";
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

// Layout.preload = async (ctx: PreloadContext) => {
//   const gh_pat_cookie = ctx.queryClient.getQueryData("gh_pat_cookie");
//   console.log("===  auth route guard cookie ===== ", gh_pat_cookie);
//   if (!(gh_pat_cookie == null)) {
//     const valid_token = await testGithubToken(gh_pat_cookie);
//       if (valid_token) {
//         const redirect = ctx.url.searchParams.get("redirect");
//         console.log(" =========== redirect ========= ", redirect);
//         return {
//           redirect: redirect ?? ctx.url.origin,
//         };
//       }

//   }
// };
