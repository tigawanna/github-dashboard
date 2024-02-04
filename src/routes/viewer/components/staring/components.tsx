import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useStarredRepoSearchQuery } from "./hooks";

interface FilterReposProps {}

export function FilterStarredRepos({}: FilterReposProps) {
  const { params, setParams } = useStarredRepoSearchQuery();

  return (
    <div className="w-full h-full flex items-center justify-center gap-3 px-2">

      <div className="w-full h-full flex items-center justify-center">
        <Select
          value={params.sDir}
          onValueChange={(value: "ASC" | "DESC") =>
            setParams({ ...params, sDir: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Direction</SelectLabel>
              <SelectItem value="ASC">ASC</SelectItem>
              <SelectItem value="DESC">DESC</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
