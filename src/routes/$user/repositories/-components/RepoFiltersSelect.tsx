import { useNavigate, useSearch } from "@tanstack/react-router";
import { repositoryOrderOptions, directionOptions } from "../../layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";
import { Switch } from "@/components/shadcn/ui/switch";
import { useTransition } from "react";
interface RepoFiltersSelectProps {}
interface RepoFiltersProps {
  startTransition: React.TransitionStartFunction;
}

export function RepoFiltersSelect({}: RepoFiltersSelectProps) {
  const [transitioning, startTransition] = useTransition();
  return (
    <div
      data-trans={transitioning}
      className="flex flex-wrap items-center gap-3 justify-center data-[&[data-trans=true]]:animate-pulse ">
      <RepoOrderSelect  />
      <RepoIsForkSwitch  />
    </div>
  );
}
export function RepoOrderSelect() {
    const [transitioning, startTransition] = useTransition();
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
          startTransition(() =>
            navigate({
              search: {
                orderBy: {
                  direction: orderByDirection,
                  field: value as (typeof repositoryOrderOptions)[number],
                },
              },
              viewTransition:false
            })
          )
        }>
        <SelectTrigger className="max-w-[180px] w-fit">
          <SelectValue placeholder={repositoryOrderOptions[0]} />
        </SelectTrigger>
        <SelectContent>
          {repositoryOrderOptions.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
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
    const [transitioning, startTransition] = useTransition();
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
          startTransition(() => navigate({ search: { isFork: value }, viewTransition: false }));
        }}
        id="is_fork_switch"
      />
      <Label htmlFor="is_fork_switch">Is Fork</Label>
    </div>
  );
}
