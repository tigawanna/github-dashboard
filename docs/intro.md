# React-Relay 2 years later , a tale of peak data fetching paradigm and less skill issues


## Why GraphQL and Relay for your React app?

Building complex UIs that fetch data efficiently can be a challenge. That's where **GraphQL** and **Relay** come in, offering a powerful combination for your React application. Here's why you should consider them:

**Reasons for GraphQL:**
* **Flexible data fetching:** Say goodbye to over-fetching or under-fetching data. With GraphQL, you specify the exact data you need in each component, leading to cleaner code and faster performance.
* **Single endpoint:** No more juggling multiple REST APIs. GraphQL provides a unified query language for all your data needs, simplifying your backend and frontend interactions.
* **Strong typing:** Get error checking and autocompletion with GraphQL's schema, ensuring data consistency and reducing bugs.
* **Future-proof:** GraphQL's independent nature allows your server to evolve without breaking your frontend, making it adaptable to changing needs.




**Why Relay over other clients?**

* **Performance:** Relay's compiler optimizes queries and data fetching, leading to lightning-fast and scalable React applications.
* **Declarative approach:** Instead of manually managing data, you declare your data requirements in Relay, and it handles the rest. This reduces boilerplate code and improves maintainability.
* **Type safety:** Relay auto generate typescript/flow types for you, which enforces type safety throughout your application, reducing runtime errors and ensuring data integrity.
* **Automatic data management:** Relay takes care of caching, optimistic updates, and conflict resolution, freeing you to focus on building your UI.



**Compared to other clients:**

* **Apollo Client:** While offering flexibility, Apollo requires more manual data management, potentially sacrificing performance and maintainability in larger apps.
* **URQL:** URQL prioritizes simplicity, but might lack advanced features like Relay's compiler and data prefetching.

**Ultimately, the choice depends on your project's needs.** If you value performance, type safety, and a declarative approach, Relay and GraphQL are a powerful duo for building scalable and maintainable React applications.

But like everything else, GraphQL and Relay have their own strengths and weaknesses.



**Some notable pain points include**

- **Confusing documentation**: The relay docs feel like they were written by someone who knew the library so well that they assumed most of us will just know about some of its features , even on my second attempt to rewrite a previous Application I still found them confusing. 
  
- **Typescript gymnastics**: Relay auto generates the types for you without need for [graphql-codegen](https://the-guild.dev/graphql/codegen) , but you have to pass in the correct generated types to the corresponding hooks to get the type safety , it's not always intuitive and the documentation doesn't properly explain it.

- **Suspense based data fetching**: Suspense is great but it relies on Suspense Boundaries with fallbacks for handling loading state and error boundaries to catch thrown errors , with one fetcher function doing all the data fetching if it throws an error while fetching it makes auto recovering or showing appropriate error UIs difficult as Error boundaries are not supported in server side React  and have a clunky clear error method which isn't the best UX
  
- **The upfront cost**: While Relay is very clever about some common pain points like pagination and  cache invalidation , the upfront code you to write can be overwhelming coupled with the confusing documentation features and the manual work required in other GraphQL client can feel like a better compromise
here the fragment definition fetching all of a Github viewer's repositories



```graphql
export const RepositoriesFragment = graphql`
  fragment ViewerRepos_repositories on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    orderBy: {
      type: "RepositoryOrder"
      defaultValue: { field: PUSHED_AT, direction: DESC }
    }
    isFork: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "RepositoriesPaginationQuery") {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      isFork: $isFork
    ) @connection(key: "Repositories_repositories") {
      totalCount
      edges {
        node {
          id
          name
          nameWithOwner
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
        }
        
    }
}
```
vs 
Apollo equivalent 

```graphql
export const REPOSITORIES_QUERY = gql`
query {
  viewer {
    repositories(first: 10) {
      totalCount
      edges {
        node {
          id
          name
          nameWithOwner
        }
      }
              pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
        }
    }
  }
}
`
```

like 

```tsx
import { useQuery, gql } from '@apollo/client';

function Repositories() {
  // Fetch the first 10 repositories
  const { loading, error, data, fetchMore } = useQuery(REPOSITORIES_QUERY, {
    variables: { first: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { edges, pageInfo } = data.viewer.repositories;

  return (
    <div>
      <h3>Repositories</h3>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.id}>
            {node.nameWithOwner}
          </li>
        ))}
      </ul>
      {pageInfo.hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                first: 10,
                after: pageInfo.endCursor,
              },
            })
          }
        >
          Load more
        </button>
      )}
    </div>
  )
}

```

and on mutation you'd have to manually update the cache of nested fields to inject the response from the mutation response


For example, if you have a mutation that adds a new repository to the viewer's list, you can use the update function to insert the new repository into the cache, like this:

```jsx
import { useMutation, gql } from '@apollo/client';

const ADD_REPOSITORY = gql`
  mutation AddRepository($name: String!) {
    createRepository(input: { name: $name, visibility: PUBLIC }) {
      repository {
        id
        name
        nameWithOwner
      }
    }
  }
`;

function AddRepository() {
  let input;
  const [addRepository, { data, loading, error }] = useMutation(ADD_REPOSITORY);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addRepository({
            variables: { name: input.value },
            update: (cache, { data: { createRepository } }) => {
              // Read the query for the viewer's repositories
              const data = cache.readQuery({
                query: REPOSITORIES_QUERY,
                variables: { first: 10 },
              });
              // Insert the new repository into the cache
              cache.writeQuery({
                query: REPOSITORIES_QUERY,
                variables: { first: 10 },
                data: {
                  ...data,
                  viewer: {
                    ...data.viewer,
                    repositories: {
                      ...data.viewer.repositories,
                      edges: [
                        ...data.viewer.repositories.edges,
                        {
                          __typename: 'RepositoryEdge',
                          node: createRepository.repository,
                        },
                      ],
                    },
                  },
                },
              });
            },
          });
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Repository</button>
      </form>
    </div>
  );
}
```

while in relay the mutation would be much simpler and the cache update would be handled automatically

```tsx
  const [commit, isInFlight] = useMutation<AddRepositoryMutation>(ADD_REPOSITORY);
```
This pain point can be ignored because it sets you up for an easier experienced own the road


**Skill issues I overcame:**:
Some of the issues I had with Relay initially just boiled down to skill issues around  React and Typescript 


- Types for `usePaginatedFragment`
      
    before 
      
    ```tsx
       const frag_data = usePaginationFragment<Fragment_name$data,any>(SomeFragment, refs);
      const some_fragment = frag_data.data as Fragment_name$data;
    ```
    Doing an as type casting felt wrong and rightly so. because the fix was so simple 
    ```tsx
      const frag_data = usePaginationFragment<MainQuery,Fragment_name$key>(SomeFragment, ref);
      const some_fragment = frag_data.data

    ```
Relay auto generates `Fragment_name$key` and  `Fragment_name$data` types , the  `Fragment_name$key` is what should be passed into the `usePaginationFragment` hook and the `Fragment_name$data` is what the actual fragment will be of type of , it's not supposed to be used directly inside the hooks.

Also note the paginated fragment takes in the `Fragment_name$key` as it's second type parameter unlike the `useFragment` hook that only accepts one type parameter where we pass in `Fragment_name$key`

```tsx
   const frag_data = useFragment<Fragment_name$key>(SomeFragment, ref);
   const paginated_frag_data = usePaginationFragment<MainQuery,Fragment_name$key>(SomeFragment, ref);
```
The `MainQuery` type is the type for the main query that the fragment is part of
```graphql
export const mainQuery = graphql`
  query MainQuery() {
    stuff {
      ...Fragment_name
    }
  }
`;
```
 - Fragment Refs

```tsx
  const query = useLazyLoadQuery<MainQuery>(mainQuery)
```
this query then becomes a ref that should be passed into the fragment query hooks as the second argument the first argument being the fragment 

```graphql
export const SomeFragment = graphql`
  fragment Fragment_name on Stuff {
  edges {
    node {
      id
      name
      createdAt
    }
  }  

  }
`
```

```tsx
      const frag_data = usePaginationFragment<MainQuery,Fragment_name$key>(SomeFragment, ref);
      const some_fragment = frag_data.data
```

which leads me to another accidental discovery I made while figuring out a way to pass the refs into the fragment components with the correct types , a typescript helper type `FragmentRef` is exposed by relay 

```tsx
  refs?: {
    readonly " $fragmentSpreads": FragmentRefs<
      | "Fragment_name"
      | "Fragment_history"
  >;
  } | null;
```

Will have a type we can pass into a component that houses the components for `Fragment_name` and `Fragment_history` avoiding  having to use the `any` type

- Dealing with read only types

Relay will return all query types and read only and this might become a problem if you have a query result that returns an array of 
```ts
type OneItem = {
id
name 
createdAt
}
```
Normally if you wanted to have an ItemCard component you would simply

```tsx
type ItemList = OneItem[]
{items.mao((item) => (
  <ItemCard key={item.id} item={item} />
))}
type ItemCardItem = ItemList[number]

finction ItemCard({ item }:ItemCardItem) {
  return <div>{item.name}</div>;
}
```
But indexing with a number is  not allowed with readonly arrays in Typescript

```ts
type Items = ReadOnlyArray<ItemList>
// ❌ not allowed
type ItemCardItem = ItemList[number]
```
So i made a helper type to convert ReadOnlyArray to Array

```ts
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
type Items = ReadOnlyArray<ItemList>
type ItemCardItem = ReadonlyToRegular<ItemList>[number]
```

- How to use React 18 features
  - Suspense boundaries
  These are mostly used to wrap components that are doing data fetching , but I kept making the mistake of forgetting them and triggering the global Suspense boundary causing the whole page to flicker when data was loading  ,
  Or I would wrap the list instead of the whole component 

```tsx
<!-- ❌ -->
  function SomeList() {
    const { loading, error, data } = useQuery(SOME_QUERY, {
      variables: { first: 10 },
    })
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <div>This is a data fetching component</div>;
      </Suspense>
    ) 
  }
  ```
```tsx
<!--  ✅ -->
function ParentComponent() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <SomeList />
      </Suspense>

  )
  
}
  function SomeList() {
    const { loading, error, data } = useQuery(SOME_QUERY, {
      variables: { first: 10 },
    })
    return(
        <div>This is a data fetching component</div>;
    ) 
  }
  ```
  - Skipping the suspense fallback with `useTransition`
      I had a search component which would make a bunch or request  while one is typing which would trigger the suspense boundary of the parent component covering the whole page the search box included ,one possible work around could have been to hoist the input and the associated `useState` and pass in the current keyword to the SearchResults component which would also house the data fetching logic and wrap that with a suspense boundary .
      Or we could wrap the `setState` with a startTransition to mark the key inputs as more important and render everything else in the background and show the results when ready without a suspense boundary.
      
      ```tsx
        const [, startTransition] = useTransition();
        const [keyword, setKeyword] = useState("");

        const { loading, error, data } = useQuery(SOME_QUERY, {
          variables: { query: keyword, first:19 },

        })

        return(
          <div>
            <input value={keyword} 
            <!-- ❌ will cause flickers
            onChange={(e) => {
              setKeyword(e.target.value)
   
            }} -->
            <!-- ✅ -->
            onChange={(e) => {
              startTransition(() => {
              setKeyword(e.target.value)
              })
            }}
            />
  
            <Suspense fallback={<div>Loading...</div>}>
              <SearchResults data={data} />
            </Suspense>
          </div>
        )

      ```

      As an addition i also relied on the URL and serach params to store the variables , makes shring URls eas and state is still maitatined after a refresh

```tsx
export function useDebouncedValue<T = any>(value: T, delay: number) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue, setDebouncedValue,isDebouncing };
}


import { useTransition, useState, useEffect } from "react";
import { navigate, useLocation } from "rakkasjs";
import { SearchType } from "./__generated__/SearchListQuery.graphql";

export function useGithubSearch() {
  const { current } = useLocation();
  const initSearchType = current.searchParams.get("st") as SearchType | null;
  const initSearchValue = current.searchParams.get("sq") ?? "";

  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    initSearchValue,
    5000,
  );
  const [searchType, setSearchType] = useState<SearchType>(
    initSearchType ?? "REPOSITORY",
  );
  useEffect(() => {
    if (debouncedValue !== initSearchValue) {
      setDebouncedValue(initSearchValue);
    }
  }, []);
  useEffect(() => {
    const new_url = new URL(current);
    if (debouncedValue && debouncedValue !== initSearchValue) {
      new_url.searchParams.set("sq", debouncedValue);
    }
    if (searchType && searchType !== initSearchType) {
      new_url.searchParams.set("st", searchType);
    }
    startTransition(() => {
      navigate(new_url.toString());
    });
  }, [debouncedValue, searchType]);

  return {
    debouncedValue,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    current,
  };
}

```


**It's still awesome though:**
With all that said relay is still awesome , so awesome it inspired the React server components and the best way to do GraphQL in react





