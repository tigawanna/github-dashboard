import { useTheme } from "@/lib/tanstack/router/use-theme";
import { Moon, Sun } from "lucide-react";
import { ViewTransitionSelect } from "./ViewTransitionSelect";
import { AllDaisyUiThemes } from "./AllDaisyUiThemes";

interface ThemeToggleProps {
  compact?: boolean;
}

const darkTheme = "forest"
const lightTheme = "wireframe"
export function ThemeToggle({ compact }: ThemeToggleProps) {
  const { theme, updateTheme } = useTheme();

  function transitionColors() {
    if (typeof window !== "undefined") {
      try {
        document.startViewTransition(() => {
          const newTheme = theme === lightTheme ? darkTheme : lightTheme;
          document.documentElement.dataset.theme = newTheme;
          updateTheme(newTheme);
        });
      } catch (error) {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        document.documentElement.dataset.theme = newTheme;
        updateTheme(newTheme);
      }
    }
  }
  return (
    <div
      data-compact={compact}
      className="flex flex-wrap w-full items-center justify-between gap-4 p-3 data-compact:p-0.5">
      <div className="flex w-full items-center justify-between gap-4 ">
        <ViewTransitionSelect compact={compact} />
        <button onClick={() => transitionColors()} className="">
          {theme === lightTheme ? <Moon /> : <Sun />}
        </button>
      </div>
      {/* <AllDaisyUiThemes compact={compact} /> */}
    </div>
  );
}
