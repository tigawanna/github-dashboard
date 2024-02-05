import { GithubOauthResponse } from "@/lib/pb/database";
import { PageProps, useSSQ } from "rakkasjs";
export default function Page({}: PageProps) {
  const query =useSSQ((ctx) => {
    const user = ctx.locals.pb.authStore.model as GithubOauthResponse
    console.log(" ==== user in /pb  === ",user)
    return user
  });
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {query.data.accessToken}
    </div>
  );
}
