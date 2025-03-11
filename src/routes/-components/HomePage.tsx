import { Helmet } from "@/components/wrappers/custom-helmet";
import { ResponsiveGenericToolbar } from "./ResponsiveGenericToolbar";
import { useRouteContext } from "@tanstack/react-router";
import { GithubUserCard } from "./GithubUsercard";

export function HomePage() {
  const { viewer } = useRouteContext({
    from: "/",
  });
  return (
    <div
      data-test="homepage"
      className="justify-center flex h-full min-h-screen w-full flex-col items-center overflow-auto bg-linear-to-br from-primary/60 via-red/60 to-primary/30">
      <Helmet title="Github Dashboard" description="Relay powered github dashboard" />
      <ResponsiveGenericToolbar>
        <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
          <div className="flex h-full min-h-screen flex-col w-full justify-center items-center gap-3">
            <GithubUserCard user={viewer} />
          </div>
        </div>
      </ResponsiveGenericToolbar>
    </div>
  );
}
