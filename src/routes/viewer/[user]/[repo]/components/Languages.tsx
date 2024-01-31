import React from "react";
import { usePaginationFragment, graphql } from "@/lib/graphql/relay/modules";
import {  Languages_languages$key } from "./__generated__/Languages_languages.graphql";

interface LanguagesProps {
  data:Languages_languages$key | null
}

export const Languages: React.FC<LanguagesProps> = ({data}) => {
const fragData = usePaginationFragment<any, Languages_languages$key>(
  LanguagesFragment,
  data,
);
  const langs = fragData?.data 
  
  return (
    <div className="w- full flex flex-wrap text-color">
      {langs?.languages?.edges?.map((item) => {
        return (
          <div
            key={item?.node.id}
            style={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: item?.node.color??" ",
              borderRadius: "10%",
            }}
            className="px-[2px] mx-[3px] text-[10px]  md:text-[12px] font-bold  break-all"
          >
            {item?.node.name}
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


