import { PATInput } from "./PATInput";
import { PBOauthSignIn } from "./PBOauthSignIn";
import { Suspense } from "react";
import { ResponsiveGenericToolbar } from "@/routes/-components/ResponsiveGenericToolbar";

interface SigninPageProps {}

export function SigninPage({}: SigninPageProps) {
  return (
    <ResponsiveGenericToolbar>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <Suspense fallback={<div className="w-full h-[20vh] bg-base-200 skeleton"></div>}>
        <PBOauthSignIn />
        </Suspense>
        <PATInput />
      </div>
    </ResponsiveGenericToolbar>
  );
}
