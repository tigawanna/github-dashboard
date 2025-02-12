import { Droplet, Home, LayoutDashboard, NotepadText, SearchSlash, ShieldCheck, Store, User, Users, Wallet, Zap } from "lucide-react";

export const dashboard_routes = [
  { name: "repositories", href: "/dashboard/repositories", icon: <Store /> },
  { name: "gists", href: "/dashboard/gists", icon: <Store /> },
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
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
    children: dashboard_routes,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
    children: undefined,
  },
] as const;


