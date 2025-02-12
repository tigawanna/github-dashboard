import { ListPagination } from "@/components/pagination/ReactresponsivePagination";
import { pb, type CollectionName } from "@/lib/pb/client";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { and, like } from "@tigawanna/typed-pocketbase";

export type PBListCollectioncolumn<T extends Record<string, any>> = {
  [key in keyof T]: {
    name: string;
  };
};

interface PBListCollectionProps<T extends Record<string, any>> {
  filterBy: keyof T;
  columns: Partial<PBListCollectioncolumn<T>>;
  maxSelected?: number;
  collectionName: CollectionName;
  searchParamKey: string;
  debouncedValue: string;
  searchParam: string;
  selectedRows: T[];
  setSelectedRows: (selectedRows: T[]) => void;
}

export function PBListCollection<
  T extends Record<string, any> = Record<string, any>,
>({
  selectedRows,
  setSelectedRows,
  maxSelected = 1,
  collectionName,
  debouncedValue,
  searchParam,
  filterBy,
  columns,
}: PBListCollectionProps<T>) {
  if (isNaN(+searchParam)){
    searchParam="1"
  } 
    const page = debouncedValue.length > 0 ? 1 : searchParam;
const query = useSuspenseQuery({
    queryKey: [collectionName, String(page), debouncedValue],
    queryFn: () => {
      return pb?.from(collectionName).getList(+page, 12, {
        filter: and(
          // @ts-expect-error
          like(filterBy, debouncedValue),
          // eq("verified", "yes")
        ),
      });
    },
  });

  const data = query?.data?.items ?? [];

  function selectItem(one_item: T) {
    if (maxSelected > 1) {
      const is_in_array = selectedRows.find((item) => item.id === one_item.id);
      if (is_in_array) {
        setSelectedRows(selectedRows.filter((item) => item.id !== one_item.id));
      } else {
        setSelectedRows([...selectedRows, one_item]);
      }
    } else {
      setSelectedRows([one_item]);
    }
  }

  return (
    <div className="h-full w-full overflow-auto ">
      <ul className="flex h-full w-full flex-col gap-2 p-2 pb-5">
        {data?.map((i) => {
          const checked = selectedRows.find((item) => item.id === i.id);
          return (
            <div
              className="flex w-full items-center gap-2 rounded-lg bg-base-200 p-2"
              key={i.id}
            >
              <Checkbox
                checked={checked !== undefined}
                onCheckedChange={() => selectItem(i as any)}
              />
              {Object.entries(columns).map(([key, value]) => {
                return (
                  <div key={key + i.id} className="">
                    <div>{i[key as any as keyof typeof i]}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="w-full">
          {query?.data?.totalPages > 1 && (
            <ListPagination total_pages={query?.data?.totalPages ?? 1} />
          )}
        </div>
      </ul>
    </div>
  );
}
