import { commitLocalUpdate, useRelayEnvironment } from "@/lib/relay/modules";


export const useInvalidateRelayStore = () => {
  const environment = useRelayEnvironment();
  return () => {
    commitLocalUpdate(environment, store => {
      store.invalidateStore()
    });
  }
}
