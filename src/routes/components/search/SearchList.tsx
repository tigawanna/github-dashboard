import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { SearchRepoResults } from "./SearchRepoResults";
import {
  SearchListQuery,
  SearchType,
} from "./__generated__/SearchListQuery.graphql";
import { Suspense, useTransition } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { ViewerReposSuspenseFallback } from "@/routes/viewer/components/repos/components";
import { SearchUserResults } from "./SearchUserResults";

interface SearchListProps {
  searchvalue: string;
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function SearchList({
  searchType,
  searchvalue,
  setSearchType,
}: SearchListProps) {
  const [, startTransition] = useTransition();
  const query = useLazyLoadQuery<SearchListQuery>(searchListQuery, {
    query: searchvalue,
    type: searchType,
  });

  return (
    <div className="w-full h-full flex  overflow-auto">
      <Tabs
        value={searchType}
        onValueChange={(e) =>
          startTransition(() => setSearchType(e as SearchType))
        }
        className="w-full h-full "
      >
        <TabsList className="grid w-full grid-cols-2 sticky top-0 z-50">
          <TabsTrigger value="REPOSITORY">Repositories</TabsTrigger>
          <TabsTrigger value="USER">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="REPOSITORY" className="z-30">
          <Suspense fallback={<ViewerReposSuspenseFallback />}>
            {query?.search?.edges && (
              <div className="w-full flex flex-wrap gap-4 p-2">
                {query?.search?.edges.length === 0 && (
                  <p className="w-full h-full flex items-center justify-center text-center">
                    No results found
                  </p>
                )}
                <Suspense fallback={<SearchListSuspenseFalllback />}>
                  {query?.search?.edges.map((item, idx) => {
                    return <SearchRepoResults refs={item?.node} key={idx} />;
                  })}
                </Suspense>
              </div>
            )}
          </Suspense>
        </TabsContent>
        <TabsContent value="USER" className="z-30">
          {query?.search?.edges && (
            <div className="w-full flex flex-wrap gap-4 p-2">
              {query?.search?.edges.length === 0 && (
                <p className="w-full h-full flex items-center justify-center text-center">
                  No results found
                </p>
              )}
              <Suspense fallback={<SearchListSuspenseFalllback />}>
                {query?.search?.edges.map((item, idx) => {
                  return <SearchUserResults refs={item?.node} key={idx} />;
                })}
              </Suspense>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SearchListSuspenseFalllback({}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {Array.from({ length: 12 }).map((_, index) => {
        return (
          <div key={index} className="h-32 bg-base-300 skeleton">
            <div className="h-10 w-full bg-base-100 animate-pulse"></div>
            <div className="h-7 w-full bg-base-100 animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
}

export const searchListQuery = graphql`
  query SearchListQuery($query: String!, $type: SearchType!) {
    search(first: 10, query: $query, type: $type) {
      codeCount
      discussionCount
      issueCount
      repositoryCount
      userCount
      wikiCount
      edges {
        cursor
        node {
          ...SearchRepoResultsFraggment
          ...SearchUserResultsfragment
        }
      }
    }
  }
`;
