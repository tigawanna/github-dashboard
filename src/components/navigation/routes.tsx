import { Home, SearchSlash, Star, Store, User } from "lucide-react";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { TbUsersGroup, TbUsers } from "react-icons/tb";

export const dashboard_routes = [
  { name: "profile", href: "/$user", icon: <User /> },
  { name: "repositories", href: "/$user/repositories", icon: <RiGitRepositoryCommitsLine /> },
  {
    name: "starred",
    href: "/$user/starred",
    icon: (
      <div className="flex gap-2 justify-center items-center">
        <RiGitRepositoryCommitsLine />
        <Star className="fill-warning" />
      </div>
    ),
  },
  { name: "followinf", href: "/$user/following", icon: <TbUsers /> },
  { name: "followers", href: "/$user/followers", icon: <TbUsersGroup /> },
] as const;

export const routes = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
    children: undefined,
  },
  {
    name: "About",
    href: "/about",
    icon: <SearchSlash />,
    children: undefined,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
    children: undefined,
  },
] as const;
