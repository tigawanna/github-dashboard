import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { queryClient, router } from "./main";
import { themeChange } from "theme-change";
import { getPAT, useViewer, viewerQueryOptions } from "./lib/viewer/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
export function App() {
  useEffect(() => {
    document.documentElement.dataset.style = "vertical";
    themeChange(false);
  }, []);
  const PAT = getPAT()
  const {data:viewer} = useSuspenseQuery(viewerQueryOptions(PAT ?? ""))
  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{
        queryClient,
        viewer
      }}
    />
  );
}
