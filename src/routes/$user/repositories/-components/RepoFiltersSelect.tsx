import { useNavigate, useSearch } from "@tanstack/react-router";
import { repositoryOrderOptions, directionOptions, starOrderOptions } from "../../layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";
import { Switch } from "@/components/shadcn/ui/switch";
interface RepoFiltersSelectProps {}

export function RepoFiltersSelect({}: RepoFiltersSelectProps) {
  return <div className="  flex flex-wrap items-center gap-2 justify-center">
    <RepoOrderSelect/>
    <RepoIsForkSwitch/>
  </div>;
}
export function RepoOrderSelect() {
  const { orderBy } = useSearch({
    from: "/$user",
  });
  const navigate = useNavigate({
    from: "/$user",
  });
  const orderByDirection = orderBy?.direction ?? "DESC";
  const orderByField = orderBy?.field ?? "PUSHED_AT";
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Order by */}
      <Select
        onValueChange={(value) =>
          navigate({
            search: {
              orderBy: {
                direction: orderByDirection,
                field: value as (typeof repositoryOrderOptions)[number],
              },
            },
          })
        }>
        <SelectTrigger className="max-w-[180px] w-fit">
          <SelectValue placeholder={repositoryOrderOptions[0]} />
        </SelectTrigger>
        <SelectContent>
          {repositoryOrderOptions.map((item) => {
            return <SelectItem key={item} value={item}>{item}</SelectItem>;
          })}
        </SelectContent>
      </Select>
      {/* Order direction*/}
      <Select
        onValueChange={(value) =>
          navigate({
            search: {
              orderBy: {
                direction: value as (typeof directionOptions)[number],
                field: orderByField,
              },
            },
          })
        }>
        <SelectTrigger className="max-w-[180px] w-fit">
          <SelectValue placeholder={repositoryOrderOptions[0]} />
        </SelectTrigger>
        <SelectContent>
          {directionOptions.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export function RepoIsForkSwitch() {
  const { isFork } = useSearch({
    from: "/$user",
  });
  const navigate = useNavigate({
    from: "/$user",
  });

  return (
    <div className="flex items-center space-x-2">
      <Switch
      checked={isFork}
      className="border border-primary"
      onCheckedChange={(value) => {
        navigate({ search: { isFork: value } })
        }} id="is_fork_switch" />
      <Label htmlFor="is_fork_switch">Is Fork</Label>
    </div>
  );
}


