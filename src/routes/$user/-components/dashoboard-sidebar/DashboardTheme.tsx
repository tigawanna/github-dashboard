import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { AllDaisyUiThemes } from "@/components/themes/AllDaisyUiThemes";
import { ViewTransitionSelect } from "@/components/themes/ViewTransitionSelect";
import { useTheme } from "@/lib/tanstack/router/use-theme";
import { Sun, Moon } from "lucide-react";
interface DashboardThemeProps {}

export function DashboardTheme({}: DashboardThemeProps) {
  const { theme, updateTheme } = useTheme();
  const { state } = useSidebar();
  function transitionColors() {
    if (typeof window !== "undefined") {
      try {
        document.startViewTransition(() => {
          const newTheme = theme === "light" ? "dark" : "light";
          document.documentElement.dataset.theme = newTheme;
          updateTheme(newTheme);
        });
      } catch (error) {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = newTheme;
        updateTheme(newTheme);
      }
    }
  }
  return (
    <div className="flex flex-wrap w-full items-center justify-between gap-4 px-2">
      <div className="flex w-full items-center justify-between gap-4">
        {import.meta.env.DEV && state === "expanded" && (
          <ViewTransitionSelect compact={state !== "expanded"} />
        )}
        <button onClick={() => transitionColors()} className="">
          {theme === "light" ? <Moon className="size-" /> : <Sun className="size-" />}
        </button>
      </div>
      <AllDaisyUiThemes compact={state !== "expanded"} />
    </div>
  );
}
