
import { FragmentRefs, graphql } from "relay-runtime";
import { SearchUserResultsfragment$key } from "./__generated__/SearchUserResultsfragment.graphql";
import { useFragment } from "react-relay";
import { Link } from "@tanstack/react-router";


interface SearchUserResultsProps {
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      "SearchRepoResultsFraggment" | "SearchUserResultsfragment"
    >;
  } | null;
}

export function SearchUserResults({ refs }: SearchUserResultsProps) {
  const query = useFragment<SearchUserResultsfragment$key>(
    searchUserResultsFragment,
    refs,
  );
  if (!query || !query.login) {
    return null;
  }

  return (
    <Link
      to={"/$user"}
      params={{ user: query?.login }}
      preload={false}
      className="bg-base-300 rounded-lg flex grow gap-2
              w-[95%] md:w-[40%] xl:w-[30%]  
                 justify-between items-center p-1 relative  hover:text-primary">
      <img
        height={50}
        width={50}
        className="w-20 h-20 object-cover dark:brightness-50 "
        loading="lazy"
        src={query?.avatarUrl}
      />
      <div className="w-full  break-all flex flex-col justify-center ">
        <div className="text-2xl font-bold">{query?.name}</div>
        <div className="">@ {query?.login}</div>

        <div className="flex gap-1 items-center">
          <div className="text-sm line-clamp-1">{query?.bio}</div>
        </div>
      </div>
    </Link>
  );
}

export const searchUserResultsFragment = graphql`
  fragment SearchUserResultsfragment on User {
    id
    bio
    name
    avatarUrl(size: 150)
    login
    url
  }
`;
