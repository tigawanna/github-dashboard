import { graphql, useLazyLoadQuery } from "@/lib/graphql/relay/modules";
import { ViewerReposQuery } from "./__generated__/ViewerReposQuery.graphql";

interface ViewerReposProps {}

export function ViewerRepos({}: ViewerReposProps) {
  const REPOS_QUERY = graphql`
    query ViewerReposQuery {
      viewer {
        repositories(first: 20) {
          edges {
            cursor
            node {
              name
              nameWithOwner
              url
            }
          }
        }
      }
    }
  `;
  const data = useLazyLoadQuery<ViewerReposQuery>(REPOS_QUERY, {});
  const repos = data?.viewer?.repositories?.edges;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className="flex flex-wrap gap-2 w-full items-center justify-center">
        {repos &&
          repos.map((edge) => {
            return (
              <li
                key={edge?.node?.nameWithOwner}
                className="bg-base-300 p-5 rounded-lg w-[30%] flex-grow"
              >
                {edge?.node?.nameWithOwner}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export function ViewerReposSuspenseFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className="flex flex-wrap gap-2 w-full items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <li
              key={i}
              className="bg-base-300 p-5 rounded-lg w-[30%] h-20 flex-grow skeleton"
            ></li>
          );
        })}
      </ul>
    </div>
  );
}
