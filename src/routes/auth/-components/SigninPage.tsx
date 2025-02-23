import { Separator } from "@radix-ui/react-separator";
import { PATInput } from "./PATInput";
import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";

interface SigninPageProps {}

export function SigninPage({}: SigninPageProps) {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
        <Separator />
        <PATInput />
      </div>
    </MainDrawer>
  );
}
