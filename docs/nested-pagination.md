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



if i had to degine relay (graphql client) i would say it makes easy things hard to do and hard things easy to do (compared to apollo, urql and the rest)
1:06 PM · Feb 14, 2025
·
66
 Views
View post engagements

Dennis 🇰🇪
@tigawanna
·
3h
nested pagination is one of the thing that will make you cry in apollo ( even single depth agination is not fun since you have to merge the object in chache yourself )

Relay on the other hand makes you write their not sostraight forward DSL and it handle the rest with ease
Dennis 🇰🇪
@tigawanna
·
2h
query will fetch your first 3 branches with thier first 5 nested commits each and you can hit load more at any level without worrying  about how they're stiched together in the cache
