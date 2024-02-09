import { testGithubToken } from "@/lib/relay/RelayEnvironment";
import { useQuery } from "rakkasjs";

export function useViewer(){
      const query = useQuery({
        queryKey: "viewer",
        queryFn: async (ctx) => {
          try {
            const user = ctx.locals?.pb?.authStore?.model;
            const gh_token = user?.accessToken;

            if (!gh_token) {
              return { viewer: null, error: "no github token" };
            }
            const viewer = await testGithubToken(gh_token);
            // console.log("viewer ==== ",viewer?.data.viewer)
            if (!viewer || !viewer?.data || !viewer?.data?.viewer) {
              return { viewer: null, error: "invalid github token" };
            }
            return { viewer:viewer?.data?.viewer, error: null };
          } catch (error: any) {
            return { viewer: null, error: error.message };
          }
        },
      });
      return query
}
