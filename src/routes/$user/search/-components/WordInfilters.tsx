import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useTransition } from "react";

const searchFilters = [
  { value: "name", label: "Repository Name" },
  { value: "description", label: "Description" },
  { value: "topics", label: "Topics" },
  { value: "readme", label: "README" },
] as const;

type SearchFilter = (typeof searchFilters)[number]["value"];
interface WordInfiltersProps {}

export function WordInfilters({}: WordInfiltersProps) {
  const [isPending, startTransition] = useTransition();
  const {user} = useParams({ from: "/$user/search/" });
  const { in: currentFilter } = useSearch({ from: "/$user/search/" });
  const navigate = useNavigate({ from: "/$user/search" });

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="search-filter">Search In</Label>
      <Select
        value={currentFilter}
        onValueChange={(value: SearchFilter) => {
          startTransition(() => {
            navigate({
              search: (prev) => ({
                ...prev,
                in: value,
              }),
              viewTransition: false,
            });
          });
        }}>
        <SelectTrigger id="search-filter" className="w-full">
          <SelectValue placeholder="Select where to search" />
        </SelectTrigger>
        <SelectContent>
          {searchFilters.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        {isPending ? "Updating..." : "Select where to search in repositories"}
      </p>
    </div>
  );
}
