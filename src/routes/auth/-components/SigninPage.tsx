import { PATInput } from "./PATInput";
import { PBOauthSignIn } from "./PBOauthSignIn";
import { Suspense } from "react";
import { ResponsiveGenericToolbar } from "@/routes/-components/ResponsiveGenericToolbar";

interface SigninPageProps {}

export function SigninPage({}: SigninPageProps) {
  return (
    <ResponsiveGenericToolbar>
      <div className="w-full h-full min-h-screen flex flex-col items-center pt-[10%] gap-5">
        <Suspense fallback={<div className="w-full h-[20vh] bg-base-200 skeleton"></div>}>
          <PBOauthSignIn />
        </Suspense>
        <div className="w-[60%]  flex flex-col items-center justify-center">
          <div className="divider ">OR</div>
        </div>
        <PATInput />

      </div>
    </ResponsiveGenericToolbar>
  );
}
