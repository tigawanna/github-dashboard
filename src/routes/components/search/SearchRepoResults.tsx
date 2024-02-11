import { graphql } from "@/lib/relay/modules";
import { useFragment } from "react-relay";
import { FragmentRefs } from "relay-runtime";
import { SearchRepoResultsFraggment$key } from "./__generated__/SearchRepoResultsFraggment.graphql";
import { Link } from "rakkasjs";
interface SearchRepoResultsProps {
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      "SearchRepoResultsFraggment" | "SearchUserResultsfragment"
    >;
  } | null;
}

export function SearchRepoResults({ refs }: SearchRepoResultsProps) {
  const query = useFragment<SearchRepoResultsFraggment$key>(
    searchRepoResultsFragment,
    refs,
  );
  if (!query) {
    return null;
  }
  return (
    <Link
      href={`/viewer/${query?.nameWithOwner}`}
      className="bg-base-300 rounded-lg flex-grow
                min-h-fit  md:h-[250px] w-[95%] md:w-[40%] xl:w-[30%]  flex-col
                 justify-between items-center p-1 relative hover:text-blue-400"
    >
      <img
        height={300}
        width={300}
        className=" w-full md:h-[180px] object-cover dark:brightness-50 "
        loading="lazy"
        src={query?.openGraphImageUrl}
      />
      <div className=" break-all flex flex-col justify-center ">
        <div className="text-xl font-bold line-clamp-1">{query?.nameWithOwner}</div>
        <div className="flex gap-1 items-center ">
          <div className="text-sm line-clamp-1">{query.description}</div>
        </div>
      </div>
    </Link>
  );
}

export const searchRepoResultsFragment = graphql`
  fragment SearchRepoResultsFraggment on Repository {
    id
    nameWithOwner
    description
    openGraphImageUrl
    createdAt
  }
`;
