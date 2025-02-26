import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { githubLanguages } from "@/lib/github/languages";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog"


interface GithubLanguagesFilterProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function GithubLanguagesFilter({ allFilters, setAllFilters }: GithubLanguagesFilterProps) {
  const [langs, setLangs] = useState(githubLanguages);
  const selectedLaguage = allFilters.find((item)=>item.startsWith("language:"))
  const [input, setInput] = useState(selectedLaguage?.split?.(":")?.[1]??"");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="btn btn-sm btn-outline  rounded-2xl">{selectedLaguage??"filter by a language"}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter by a language</DialogTitle>
          <DialogDescription>
           Github search allows filter syntax like language:javascript
          </DialogDescription>
        </DialogHeader>
        <div className="w-full  flex flex-col gap-4 items-center justify-center">
        <div className="w-full  flex flex-col  gap-1 justify-center">
          <Label htmlFor="language">filter by language</Label>
          <Input
            id="language"
            type="text"
            placeholder="Type to search more"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // @ts-expect-error
              setLangs((prev) => {
                const newArray = githubLanguages.filter((pp) => {
                  return pp.toLowerCase().includes(e.target.value.toLowerCase());
                });
                return newArray;
              });
            }}
          />
          </div>
          <ul className="w-full flex flex-wrap gap-2">
            {langs.slice(0, 10).map((item) => {
              return (
                <button
                  onClick={() => {
                    setInput(item);
                    setAllFilters((prev) => {
                      const newFilters = prev.filter((f) => !f.startsWith("language:"));
                      return [...newFilters, `language:${item}`];
                    });
                    setOpen(false);
                  }}
                  key={item}
                  className="btn btn-sm btn-outline btn-primary rounded-2xl ">
                  {item}
                </button>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
