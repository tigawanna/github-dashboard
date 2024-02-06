import { PageProps } from "rakkasjs";
import { OAuthproviders } from "./components/OAuthProviders";

interface ActionResultData {
  data: {
    gh_pat_cookie: string;
  };
  error?: string;
  success?: string;
}
export default function LoginPage({}: PageProps) {
  return (
    <div className="w-full flex flex-col   items-center justify-center overflow-auto">
      <div
        className="flex flex-col gap-5  
    items-center justify-center overflow-auto glass rounded-xl p-4"
      >
        <h1 className="text-3xl font-bold">Authenticate</h1>
        <OAuthproviders />
      </div>
    </div>
  );
}
