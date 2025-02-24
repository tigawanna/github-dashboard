import { queryOptions, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Navigate, useRouteContext, useRouter } from "@tanstack/react-router";



const GITHUB_API_URL = "https://api.github.com/user";

export function viewerQueryOptions(token: string) {
  return queryOptions({
    queryKey: ["viewer"],
    queryFn: async () => {
      return fetchCurrentViewer(token);
    },
    staleTime: 1000 * 60 * 60,
  });
}
export function useViewer() {
  const { PAT } = useRouteContext({
    from: "__root__",
  });
 const viewerQuery = useSuspenseQuery(viewerQueryOptions(PAT ?? ""));
 const viewer = viewerQuery.data;
 const router = useRouter({});
  function logoutMutationFn() {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          removePAT();
          resolve(true);

        } catch (error) {
          resolve(false);
        }
      }, 5000);
    });
  }
  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess:async(data, variables, context)=> {
      if (data) {
          await router.invalidate()          
      }
    },
  });
  return { viewer, logoutMutation };
}

// Replace with your GitHub token

export interface GitHubViewer {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function fetchCurrentViewer(token: string): Promise<GitHubViewer | null> {
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (response.status === 401) {
    console.error("Github Viewer Unauthorized");
    return null
  }
  if (!response.ok) {
    console.error("Github Viewer Unauthorized");
    return null
  }
  const user = (await response.json()) as GitHubViewer | null;
  // console.log("Github Viewer === ", user);
  return user;
}

export function getPAT() {
  // if (envVariables.VITE_PAT) {
  //   return envVariables.VITE_PAT;
  // }
  if (typeof window !== "undefined") {
    const PAT = localStorage.getItem("PAT");
    if (!PAT) {
      return;
    }

    return PAT;
  }
}
export function savePAT(PAT: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("PAT", PAT);
  }
}
export function removePAT() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("PAT");
  }
}
export async function getVerifiedPAT() {
  // if (envVariables.VITE_PAT) {
  //   console.log(" ⚠️⚠️ Using VITE_PAT ⚠️⚠️ ", envVariables.VITE_PAT);
  //   return await verifyGithubPAT(envVariables.VITE_PAT);
  // }
  if (typeof window !== "undefined") {
    const PAT = localStorage.getItem("PAT");
    if (!PAT) {
      return;
    }
    const viewer = await verifyGithubPAT(PAT);
    if(!viewer){
      localStorage.removeItem("PAT");
  }
    return PAT
  }
}

export async function verifyGithubPAT(token: string) {
  try{
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 401) {
      console.error("Github Viewer Unauthorized");
      return;
    }
    if (!response.ok) {
      console.error("Github Viewer Unauthorized");
      return;
    }
    const user = (await response.json()) as GitHubViewer | undefined;
    // console.log("Github Viewer === ", user);
    if(typeof window !== "undefined"){
      localStorage.setItem("PAT", token);
    }
    return user;
  }catch (error) {
    console.error("Github Viewer Unauthorized");
    return;
  }
}
