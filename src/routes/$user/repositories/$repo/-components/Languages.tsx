import React from "react";
import {  Languages_languages$key } from "./__generated__/Languages_languages.graphql";
import { graphql, usePaginationFragment } from "react-relay";
import { OneUserRepoPageQuery } from "./__generated__/OneUserRepoPageQuery.graphql";

interface LanguagesProps {
  data:Languages_languages$key | null
}

export const Languages: React.FC<LanguagesProps> = ({data}) => {
const fragData = usePaginationFragment<
  OneUserRepoPageQuery,
  Languages_languages$key
>(LanguagesFragment, data);
  const langs = fragData?.data 
  
  return (
    <div className="flex flex-wrap text-color">
      {langs?.languages?.edges?.map((item) => {
        if (!item) return null;
        return (
          <div
            key={item.node.id}
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: item?.node?.color ?? "",
            }}
            className="p-[1px] m-[1px] rounded-lg text-xs  break-all px-1"
          >
            {item.node.name}
          </div>
        );
      })}
    </div>
  );
};

export const LanguagesFragment = graphql`
  fragment Languages_languages on Repository
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 20 }
    after: { type: "String" }
  )
  @refetchable(
    queryName: "LanguagesPaginationQuery"
  ) {
  languages(first: $first, after: $after) 
  @connection(key: "Languages_languages") {
    edges {
      node {
      id,
      color,
      name
      }
  },
    pageInfo {
    endCursor,
      hasNextPage,
      hasPreviousPage,
      startCursor
  },
  totalCount
    }
  }
`;


