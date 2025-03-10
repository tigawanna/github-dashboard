import { graphql,  useLazyLoadQuery } from "react-relay";
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

import { SearchUserResults } from "./SearchUserResults";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { twMerge } from "tailwind-merge";

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

  // console.log("==== query  ==== ",query)
  return (
    <div className="w-full h-full flex  overflow-auto ">
      <Tabs
        value={searchType}
        onValueChange={(e) => startTransition(() => setSearchType(e as SearchType))}
        className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2 sticky top-0 z-50 ">
          <TabsTrigger value="REPOSITORY">
            Repositories{" "}
            {query?.search?.repositoryCount === 0 ? "" : query?.search?.repositoryCount}
          </TabsTrigger>
          <TabsTrigger value="USER">
            Users {query?.search?.userCount === 0 ? "" : query?.search?.userCount}{" "}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="REPOSITORY" className="z-30 ">
          <Suspense fallback={<CardsListSuspenseFallback />}>
            {query?.search?.edges && (
              <div className="w-full flex flex-wrap justify-center gap-4 p-2 @container/repos">
                {query?.search?.edges.length === 0 && <SearchInputNoItems />}
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
              {query?.search?.edges.length === 0 && <SearchInputNoItems />}
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


interface CardsListSuspenseFallbackProps {
  cards?: number;
  cardClassName?: string;
  containerClassName?: string;
}

export function SearchListSuspenseFalllback({
  cardClassName,
  containerClassName,
  cards = 12,
}: CardsListSuspenseFallbackProps) {
  return (
    <ul
      className={twMerge(
        "grid h-[99%] w-full grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-4",
        containerClassName
      )}>
      {Array.from({ length: cards }).map((_, i) => (
        <li
          key={i}
          className={twMerge(
            "skeleton flex h-56 w-full flex-col gap-2 rounded-lg bg-base-300/70 p-2",
            cardClassName
          )}
        />
      ))}
    </ul>
  );
}

export function SearchInputNoItems() {
  return (
    <div className="w-full min-h-[50vh] h-full flex justify-center items-center  rounded-lg ">
      <div className="flex flex-col items-center justify-center gap-2 bg-base-200 rounded-lg p-5 ">
        <p> No results found, try some keywords </p>
      </div>
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
