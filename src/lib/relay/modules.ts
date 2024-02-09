import RelayRuntime from "relay-runtime";
import Relay from "react-relay";



export const {
  RelayEnvironmentProvider,
  useMutation,
  useLazyLoadQuery,
  useFragment,
  usePreloadedQuery,
  usePaginationFragment,
  useRelayEnvironment,

  

} = Relay;
export const { graphql,commitMutation,commitLocalUpdate} = RelayRuntime;

