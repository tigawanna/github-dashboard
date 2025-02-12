import { envVariables } from "@/env";
import {  useRouteContext, } from "@tanstack/react-router";

export function useViewer() {
  // const routeApi = getRouteApi("__root__");
  // const data = routeApi.useLoaderData();
    const {viewer,PAT} = useRouteContext({
    from: '__root__',
  })
  function logoutMutation() {
    return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    })
    })
  }
  return {viewer,logoutMutation};
}



const GITHUB_API_URL = "https://api.github.com/user";
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

export async function fetchCurrentViewer(token: string): Promise<GitHubViewer|undefined > {
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
  console.log("Github Viewer === ", user);
  return user;
}


export function getPAT(){
  if(envVariables.VITE_PAT){
    return envVariables.VITE_PAT
  }
  if(typeof window !== "undefined"){
    const PAT = localStorage.getItem("PAT")
    if(!PAT){
      return
    }
    return PAT
  }
}
