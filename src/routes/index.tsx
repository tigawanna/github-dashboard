import { createFileRoute, useRouteContext} from "@tanstack/react-router";
import GithubUserCard from "./-components/GithubUsercard";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {viewer} = useRouteContext({
    from:"/"
  })
  const user = viewer
  return (
    // <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
    <div className="min-h-screen flex flex-col items-center gap-3">
      <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
        <div className="flex h-full min-h-screen flex-col w-full justify-center items-center gap-3">
          <GithubUserCard user={viewer} />
        </div>
      </div>
    </div>
    // </MainDrawer>
  );
}
