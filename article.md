# React-Relay 2 years later , a tale of peak data fetching paradigm and less skill issues


2 years back I stumbled on this GraphQL client that was touted as the best , Needless to say it's not the most popular GraphQL client and the documentation wasn't very beginner friendly so I struggled a bit to get anything done , I had skill issues on skill issues , I couldn't find the correct hooks , struggled with the preloading recommendations , to fighting the typescript types .

I revisited my old project to see if I could do it better , the docs were still bad but we have the GPTs now and I had gotten better at looking at function signatures and figuring out the right thing to pass in 


Last time I was working on widows and the VSCode plugin wasn't working because [watchman](https://facebook.github.io/watchman/) was missing
being on windows I ran this in an admin  powershell instance 

```sh
choco install watchman
``` 

And started reaping the benefits of adding a field into a query and have the types be instantly accessible because the rust GraphQL compiler
did it's thing in the background

Before we go any further let's recall why Relay , The other GraphQL clients are easier to get started with and for basic usage until you need to paginate or even do nested pagination or even cache invalidation

Relay on the other hand makes you pay the upfront cost and make those use cases a breeze

- **Optimized network calls**: Relay minimizes the number of requests and the amount of data transferred by only fetching what is needed for each component.
- **Declarative data requirements**: Relay lets you specify the data shape for each component using GraphQL fragments, which makes it easier to understand and maintain the data dependencies.
- **Powerful features**: Relay supports advanced use cases like pagination, cache invalidation, optimistic updates, subscriptions, and more with built-in or custom hooks and mutations.
- **Type safety**: Relay generates TypeScript types for your queries and components, which helps you catch errors and bugs at compile time.
- **Developer experience**: Relay integrates well with VSCode, watchman, and Rust GraphQL compiler, which provide fast and smooth development workflow.
























Helpful resources

- [Understanding React Relay - Richard Kotze](^1^): A blog post that explains how React Relay works and how to use its methods.
- [Difference between : Redux and Relay - Stack Overflow](^2^): A question and answer that compares React Relay and Redux, another popular state management library.
- [Relay vs. Redux: When to use each | by Anthony Dito | Medium](^3^): An article that discusses the pros and cons of React Relay and Redux, and when to choose one over the other..



