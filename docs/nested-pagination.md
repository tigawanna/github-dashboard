```ts
// many branches
  const fragData = usePaginationFragment<
    OneUserRepoPageQuery,
    Branches_refs$key
  >(Branchesfragment, data);
  const branches = fragData.data;


    ....other code
<div>
      {fragData.isLoadingNext ? (
        <div className="w-full flex-center">loading more...</div>
      ) : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:text-primary/70 shadow-lg hover:shadow-purple"
          onClick={() => {
            fragData.loadNext(5);
          }}
        >
          --- load more ---
        </button>
      ) : null}
    </div>

    ....otger code

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
```


```tsx
// Commits on the branch
  const fragData = usePaginationFragment<
    OneUserRepoPageQuery,
    Commits_history$key
  >(CommitsOnBranchFragment, data);
  const commits = fragData?.data;

....other code


    <div>
      {fragData.isLoadingNext ? (
        <div className="w-full flex-center">loading more...</div>
      ) : null}

      {!fragData.isLoadingNext && fragData.hasNext ? (
        <button
          className="m-2 hover:text-accent shadow-lg hover:shadow-base-300"
          onClick={() => {
            fragData.loadNext(5);
          }}
        >
          --- load more ---
        </button>
      ) : null}
      </div>


....other code


export const CommitsOnBranchFragment = graphql`
  fragment Commits_history on Commit
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "String" }
  )
  @refetchable(queryName: "CommitsPaginationQuery") {
    history(first: $first, after: $after) @connection(key: "Commits_history") {
      totalCount
      edges {
        node {
          committedDate
          author {
            name
            email
          }
          message
          url
          pushedDate
          authoredDate
          committedDate
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

```
