import { MainNavbar } from "@/components/navigation/navbar/MainNavbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MainDrawer } from "../components/navigation/drawer/MainDrawer";
import { MainDrawerLinks } from "../components/navigation/drawer/MainDrawerLinks";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
          <h3 className="text-5xl font-bold">Welcome Home!</h3>
        </div>
      </div>
    </MainDrawer>
  );
}
