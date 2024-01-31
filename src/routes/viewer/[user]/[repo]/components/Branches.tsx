import React from "react";
import { FragmentRefs } from "relay-runtime";
import { Commits } from "./Commits";
import { Branches_refs$key } from "./__generated__/Branches_refs.graphql";
import { ChevronDown } from "lucide-react";
import { usePaginationFragment, graphql } from "@/lib/graphql/relay/modules";
interface BranchesProps {
  data: Branches_refs$key | null;
}

export function Branches({ data }: BranchesProps) {
  const fragData = usePaginationFragment<any, Branches_refs$key>(
    Branchesfragment,
    data,
  );
  const branches = fragData.data;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-full  flex-center text-lg font-semibold">Branches</div>
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

export const Branch: React.FC<BranchProps> = ({ branch }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-[97%] flex-col-center p-2 m-1 border-2 ">
      <div className="w-[100%]  flex items-center justify-between">
        <div className="text-lg  font-mono font-bold ">
          {branch?.node?.name} branch
        </div>

        {/* <TheIcon Icon={RiArrowDropDownLine} size={"40"} color={"blue"}
        iconAction={() => setOpen(!open)}
        iconstyle={"mx-2 hover:border hover:border-purple-900 rounded-[50%]"} /> */}
        <ChevronDown onClick={() => setOpen(!open)}/>
      </div>

      {open ? (
        <div className="w-full ">
          <Commits data={branch?.node?.target} />
        </div>
      ) : null}
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
