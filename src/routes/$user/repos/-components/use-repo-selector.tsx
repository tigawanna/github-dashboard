import { useState } from "react";
import { OneRepoEdge } from "./repo-card/RepoCard";
import { ItemList } from "./types";


export function useRepoSelector() {
  const [selected, setSelected] = useState<ItemList[] | undefined | null>(null);
  const selectItem = (item: ItemList) => {
    setSelected((prev) => {
      if (!prev) {
        return [item];
      }
      return [...prev, item]; // Using spread operator to create a new array
    });
  };
  const unselectItem = (item: ItemList) => {
    setSelected((prev) => {
      if (!prev) {
        return [item];
      }
      return [...prev.filter((i) => i.id !== item.id)]; // Using spread operator to create a new array
    });
  };

  const selectAll = (repos?: OneRepoEdge[]) => {
    setSelected((prev) => {
      if (repos) {
        return repos
          .filter((i) => i?.node?.viewerPermission === "ADMIN")
          ?.map((i) => {
            return {
              id: i?.node?.id ?? "",
              name: i?.node?.name ?? "",
              nameWithOwner: i?.node?.nameWithOwner ?? "",
            };
          });
      }
      return prev;
    });
  };

  const deselectAll = () => {
    setSelected(null);
  };

  return {
    selected,
    selectItem,
    unselectItem,
    selectAll,
    deselectAll,
    setSelected,
  };
}
