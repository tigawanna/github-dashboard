import { Separator } from "@radix-ui/react-separator";
import { PATInput } from "./PATInput";
import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { PBOauthSignIn } from "./PBOauthSignIn";
import { Suspense } from "react";

interface SigninPageProps {}

export function SigninPage({}: SigninPageProps) {
  return (
      <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <Suspense fallback={<div className="w-full h-[20vh] bg-base-200 skeleton"></div>}>
        <PBOauthSignIn />
        </Suspense>
        <PATInput />
      </div>
    </MainDrawer>
  );
}
