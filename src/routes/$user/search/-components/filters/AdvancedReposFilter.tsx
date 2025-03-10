import { useEffect, useState, useTransition } from "react";
import { RepositoryRangesFilter } from "./RepositoryRangesFilter";
import { ListFilterPlus, Loader, X } from "lucide-react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { SearchType } from "../list/__generated__/SearchListQuery.graphql";
import { WordInFilters } from "./WordInFilters";
import { IsFilters } from "./IsFilters";
import { UserGroupFilter } from "./UserGroupFilter";

interface AdvancedReposFilterProps {
  isDebouncing: boolean;
  startTransition: React.TransitionStartFunction;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  debouncedValue: string;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function AdvancedReposFilter({setKeyword}: AdvancedReposFilterProps) {
  const { filters, ...rest } = useSearch({ from: "/$user/search/" });
  const navigate = useNavigate({ from: "/$user/search" });
  const { user: currentUser } = useParams({
    from: "/$user/search/",
  });
  const [pending, startTransition] = useTransition();
  const [allFilters, setAllFilters] = useState(filters ?? [""]);
  const validFilters = allFilters.filter((item) => item !== "");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setAllFilters((prev) => {
      const hasuser = prev.find((f) => f.startsWith("user:"))?.split(":")[1];
      if (!hasuser) {
        return [...prev, `user:${currentUser}`];
      }
      return prev;
    });
    // setKeyword((prev) => prev + rest.q + validFilters.join(" "));
    // startTransition(() => {
    //   navigate({
    //     search: {
    //       ...rest,
    //       filters: validFilters,
    //       q: validFilters.join(" "),
    //     },
    //   });
    // });
  }, []);
  function handleApplyFilters() {
    startTransition(() => {
      navigate({
        search: {
          ...rest,
          filters: validFilters,
        },
      });
      setOpen(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ListFilterPlus />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Advanced filters</DialogTitle>
          <DialogDescription>
            {"Uses github search syntax like created:>=2020-01-01 created:<2023-01-01"}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full p-2 flex flex-col gap-2 ">
          <div className="w-full p-5 flex flex-col gap-3 ">
            <div className="divider divider-primary">is filters</div>
            <UserGroupFilter allFilters={allFilters} setAllFilters={setAllFilters} />
            <div className="divider divider-primary">is filters</div>
            <IsFilters allFilters={allFilters} setAllFilters={setAllFilters} />
            <div className="divider divider-primary">text in filters</div>
            <WordInFilters allFilters={allFilters} setAllFilters={setAllFilters} />
            <div className="divider divider-primary">range filters</div>
            <RepositoryRangesFilter allFilters={allFilters} setAllFilters={setAllFilters} />
            {validFilters.length > 0 && <div className="divider divider-primary">filter list</div>}
            <div className="w-full flex flex-wrap gap-2">
              {validFilters.map((filter) => (
                <div key={filter} className="btn btn-sm  btn-outline rounded-2xl">
                  {filter}{" "}
                  <X
                    className="hover:scale-105 size-4 transition-all duration-200 hover:text-primary"
                    onClick={() =>
                      setAllFilters((prev) => {
                        console.log("prev", prev);
                        return prev.filter((item) => item !== filter);
                      })
                    }
                  />
                </div>
              ))}
            </div>
            {validFilters.length > 0 && (
              <Button
                variant="outline"
                disabled={pending}
                className=""
                onClick={handleApplyFilters}>
                Apply filters
                {pending && <Loader className="animate-spin" />}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
