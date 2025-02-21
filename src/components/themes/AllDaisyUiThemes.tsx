import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useState } from "react";
interface AllDaisyUiThemesProps {
  compact?: boolean
}

export function AllDaisyUiThemes({compact}: AllDaisyUiThemesProps) {
  const allDaisyUiThems = [
    "forest",
    "cupacake",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "luxury",
    "dracula",
    "night",
    "cmyk",
    "autumn",
    "winter",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
  ];
  // const { theme, updateTheme } = useTheme();
  const [theme, setTheme] = useState(allDaisyUiThems[0]);
    function changeTheme(theme: string) {
      try {
        document.startViewTransition(() => {
          document.documentElement.dataset.theme = theme;
          setTheme(theme);
        });
      } catch (error) {
        document.documentElement.dataset.theme = theme;
        setTheme(theme);
      }
    }
    if(compact){
      return
    }
  return (
    <Select value={theme} onValueChange={changeTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="bg-base-100">
        {allDaisyUiThems.map((thm) => {
          return (
            <SelectItem
              data-selected={thm === theme ? true : false}
              className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-content"
              key={thm}
              value={thm}
              onClick={() => {
                changeTheme(thm);
              }}>
              {thm}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
