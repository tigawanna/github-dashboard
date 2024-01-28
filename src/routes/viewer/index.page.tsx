import { graphql } from "@/lib/graphql/relay/modules";
import { PageProps,PreloadContext } from "rakkasjs";
import { ViewerRepos, ViewerReposSuspenseFallback } from "./components/ViewerRepos";
import { Suspense } from "react";
export default function  ViewerPage({}: PageProps){
  const REPOS_QUERY = graphql`
    query viewerQuery {
      viewer {
        repositories(first: 20) {
          edges {
            cursor
            node {
              name
              nameWithOwner
              url
            }
          }
        }
      }
    }
  `;

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">Viewer Page</div>
      <Suspense fallback={<ViewerReposSuspenseFallback/>}>
        <ViewerRepos />
      </Suspense>
    </div>
  );
}

// export default ViewerPage


// ViewerPage.preload = (ctx:PreloadContext) => {
//   // Prefetch a query to avoid waterfalls caused by late discovery of data
//   // dependencies.
//   console.log("= viewer preloading  === ",ctx.queryClient)

//   return {
//     // Set head meta tags. Unlike a Head component rendered in a page,
//     // it is guaranteed to be rendered on the server when rendered in the
//     // preload function.
//     head: { title: "Preload example" },
//   };
// };
