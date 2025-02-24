import { FragmentRefs, graphql } from "relay-runtime";
import { SearchRepoResultsFraggment$key } from "./__generated__/SearchRepoResultsFraggment.graphql";
import { useFragment } from "react-relay";
import { Link } from "@tanstack/react-router";

interface SearchRepoResultsProps {
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      "SearchRepoResultsFraggment" | "SearchUserResultsfragment"
    >;
  } | null;
}

export function SearchRepoResults({ refs }: SearchRepoResultsProps) {
  const query = useFragment<SearchRepoResultsFraggment$key>(searchRepoResultsFragment, refs);
  if (!query || !query.nameWithOwner) {
    return null;
  }

 const [user, repo] = query.nameWithOwner?.split("/");
  return (
    <Link
      to={`/$user/repositories/$repo`}
      params={{ user, repo }}
      className="bg-base-300 rounded-lg grow
                min-h-fit  md:h-[250px] w-[95%] md:w-[40%] xl:w-[30%]  flex-col
                 justify-between items-center p-1 relative hover:text-primary">
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
