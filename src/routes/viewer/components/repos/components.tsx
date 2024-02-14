import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

import { RepositoryOrderField } from "./__generated__/RepositoriesPaginationQuery.graphql";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useRepoSearchQuery, useStarredRepoSearchQuery } from "./hooks/searchRepos";

export function ViewerReposSuspenseFallback() {
  return (
    <div className="w-full h-full">
      <ul className="flex flex-wrap gap-2 w-full items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <li
              key={i}
              className="bg-base-200 p-5 rounded-lg h-60 w-[95%] md:w-[40%]
               xl:w-[30%] flex-grow flex flex-col justify-between gap-2"
            >
              <div className="h-5 w-[60%] bg-base-100 rounded-md skeleton">
                {i}
              </div>
              <div className="h-5 w-[80%] bg-base-100 rounded-md skeleton"></div>
              <div className="h-7 w-[80%] bg-base-100 rounded-lg skeleton"></div>
              <div className="h-24 -[80%] bg-base-100 rounded-lg skeleton"></div>
              <div className="w-full flex gap-2 justify-evenly items-center">
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface FilterReposProps {}

export function FilterRepos({}: FilterReposProps) {
  const { params, setParams } = useRepoSearchQuery();
  const order_by_selects: { value: RepositoryOrderField; label: string }[] = [
    { label: "PUSHED AT", value: "PUSHED_AT" },
    { label: "NAME", value: "NAME" },
    { label: "STARs", value: "STARGAZERS" },
    { label: "UPDATED", value: "UPDATED_AT" },
    { label: "CREATED", value: "CREATED_AT" },
  ];
  const checked = params.ifk === "true";
  return (
    <div className="min-w-[60%] h-full flex items-center justify-center gap-3 px-2">
      <div className="w-full h-full flex items-center justify-center">
        <Select
          value={params.oBy}
          onValueChange={(value: RepositoryOrderField) =>
            setParams({ ...params, oBy: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Order by</SelectLabel>
              {order_by_selects.map((item) => {
                return (
                  <SelectItem value={item.value} key={item.label} className="capitalize">
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Select
          value={params.dir}
          onValueChange={(value: "ASC" | "DESC") =>
            setParams({ ...params, dir: value })
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
      <div className="flex justify-center items-center gap-3 w-full ">
        <Checkbox
          id="is_fork"
          className="h-7 w-7 border border-accent"
          checked={checked}
          onCheckedChange={(value: boolean) => {
            setParams({ ...params, ifk: value ? "true" : "false" });
          }}
        />
        <label
          htmlFor="is_fork"
          className="font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is Fork
        </label>
      </div>
    </div>
  );
}


export function FilterStarredRepos({}: FilterReposProps) {
  const { params, setParams } = useStarredRepoSearchQuery();

  return (
    <div className="min-w-[60%] h-full flex items-center justify-center gap-3 px-2">
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
