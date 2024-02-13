import React from "react";
import { FragmentRefs } from "relay-runtime";
import { Commits } from "./Commits";
import { Branches_refs$key } from "./__generated__/Branches_refs.graphql";
import { usePaginationFragment, graphql } from "@/lib/relay/modules";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/ui/accordion";
import { RepoFullRepositoryQuery } from "../__generated__/RepoFullRepositoryQuery.graphql";
interface BranchesProps {
  data: Branches_refs$key | null;
}

export function Branches({ data }: BranchesProps) {
  const fragData = usePaginationFragment<
    RepoFullRepositoryQuery,
    Branches_refs$key
  >(Branchesfragment, data);
  const branches = fragData.data;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-full flex gap-3 ">
        <div className="text-center text-lg font-semibold">
          {branches?.refs?.edges?.length}/{branches?.refs?.totalCount}
        </div>
        <div className="text-center text-lg font-semibold">Branches</div>
      </div>
      <div className="w-full  flex-center-col">
        {branches?.refs?.edges?.map((branch, index) => {
          return <Branch branch={branch} key={branch?.node?.id} />;
        })}
      </div>
      {fragData.isLoadingNext ? (
        <div className="w-full flex-center">loading more...</div>
      ) : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
          onClick={() => {
            fragData.loadNext(5);
          }}
        >
          --- load more ---
        </button>
      ) : null}
    </div>
  );
}

interface BranchProps {
  branch:
    | {
        readonly node:
          | {
              readonly id: string;
              readonly name: string;
              readonly target:
                | {
                    readonly " $fragmentSpreads": FragmentRefs<"Commits_history">;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
}

export function Branch({ branch }: BranchProps) {
  if (!branch?.node?.name) return null;
  return (
    <div className="w-[97%] flex-col-center p-2 m-1 border-2 ">
      {/* <div className="w-[100%]  flex items-center justify-between">
        <div className="text-lg  font-mono font-bold ">
          {branch?.node?.name} branch
        </div>
          <ChevronDown onClick={() => setOpen(!open)} />
      </div> */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={branch?.node?.name}>
          <AccordionTrigger>{branch?.node?.name} branch</AccordionTrigger>
          <AccordionContent>
            <div className="w-full ">
              <Commits data={branch?.node?.target} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* {open ? (
        <div className="w-full ">
          <Commits data={branch?.node?.target} />
        </div>
      ) : null} */}
    </div>
  );
};

export const Branchesfragment = graphql`
  fragment Branches_refs on Repository
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 3 }
    after: { type: "String" }
  )
  @refetchable(queryName: "BranchesPaginationQuery") {
    refs(
      refPrefix: "refs/heads/"
      orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
      first: $first
      after: $after
    ) @connection(key: "Branches_refs") {
      totalCount
      edges {

        node {
          name
          id
          target {
            ...Commits_history
          }
        }

      }
    }
  }
`;
