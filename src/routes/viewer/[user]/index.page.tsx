import { PageProps } from "rakkasjs";
export default function GithubUserPage({params}: PageProps) {
  const user  = params.user
  return (
    <div className="w-full  flex items-center justify-center">
      <h1 className="text-3xl">{user}</h1>
    </div>
  );
}
