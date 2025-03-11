import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { ThemeToggle } from "@/components/themes/ThemeToggle";


interface DashboardThemeProps {}

export function DashboardTheme({}: DashboardThemeProps) {
  const { state } = useSidebar();
  return <ThemeToggle compact={state !== "expanded"} />;
}
