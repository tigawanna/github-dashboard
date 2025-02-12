import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useState } from "react";
interface ViewTransitionSelectProps {
  compact?: boolean
}

export function ViewTransitionSelect({compact}: ViewTransitionSelectProps) {
  const [trns,setTrans] = useState("default")
  function changeTransition(value: string) {
    try {
      document.startViewTransition(() => {
        document.documentElement.dataset.style = value;
        setTrans(value);
      });
    } catch (error) {
      document.documentElement.dataset.style = value;
      setTrans(value);
    }
  }
    if (!import.meta.env.DEV || compact) {
        return
    }
      return (
        <Select
          defaultValue="default"
          value={trns}
          onValueChange={changeTransition}
          >
          <SelectTrigger className="select select-bordered select-sm max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-base-100">
            <SelectGroup>
              <SelectLabel>View Transitions</SelectLabel>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
              <SelectItem value="wipe">Wipe</SelectItem>
              <SelectItem value="angled">Angled</SelectItem>
              <SelectItem value="flip">Flip</SelectItem>
              <SelectItem value="slides">Slides</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
}
