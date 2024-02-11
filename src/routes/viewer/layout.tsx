import { LayoutProps } from "rakkasjs";
import ViewerErrorBoundaryComponent from "./components/ErrorBoundaryComponent";
import { useGithubSearch } from "../components/search/hook";
import { SearchInputSection } from "../components/search/SearchInputSection";

export default function Layout({ children }: LayoutProps) {
  const {
    isDebouncing,
    startTransition,
    setDebouncedValue,
    searchType,
    setSearchType,
    debouncedValue
  } = useGithubSearch();
  return (
    <div className="w-full ">
      <div className="w-full sticky top-0">
        <SearchInputSection
        debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          searchType={searchType}
          setDebouncedValue={setDebouncedValue}
          setSearchType={setSearchType}
          startTransition={startTransition}
        />
      </div>
      <ViewerErrorBoundaryComponent>{children}</ViewerErrorBoundaryComponent>
    </div>
  );
}
// Layout.preload = async (ctx: PreloadContext) => {
//   return {
//     head: { title: "Github dashboard" },

//   };
// };
