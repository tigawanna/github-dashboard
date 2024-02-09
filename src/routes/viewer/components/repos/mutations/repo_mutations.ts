import { ItemList } from "../types";

export async function deleteRepositories(repos: ItemList[], token: string) {
  try {
    const deleteRepos = repos.map((repo) => {
      return fetch(`https://api.github.com/repos/${repo.nameWithOwner}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // .then((res) => {
      //   // console.log("======= res ====== ",res)
      //   return res.json().then((dt)=>{
      //     console.log("dt === ",dt)
      //     return dt
      //   })
      // });
    });
    const responses = await Promise.all(deleteRepos);
    // console.log(" === responsess ==== ",responses)
    interface ReducedResponse {
      failed: { repo: string; issue: string }[];
      successfull: {name:string,id:string}[];
    }

    interface FailedResponse {
      message: "Bad credentials";
      documentation_url: string;
    }

    const finalResponse = responses.reduce(
      (prev: ReducedResponse, acc: Response, idx) => {
        // console.log(" ==== accc  ===== ", acc);
        if (!acc.ok) {
          prev.failed.push({
            repo: repos[idx].nameWithOwner,
            issue: acc.statusText,
          });
        } else {
          prev.successfull.push({id:repos[idx].id,name:repos[idx].nameWithOwner});
        }

        return prev;
      },
      { successfull: [], failed: [] },
    );
    return finalResponse 

  } catch (error) {
    console.log("error deleting viewer repos", error);
    throw error;
  }
}
export interface ForkrepoArgs {
  nameWithOwner: string;
  organization?: string;
  new_name?: string;
  default_branch_only?: boolean;
}
export async function forkRepository(repo: ForkrepoArgs, token: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo.nameWithOwner}/forks`,
      {
        method: "POST",
        body: JSON.stringify({
          organization: repo.organization,
          name: repo.new_name,
          default_branch_only: repo.default_branch_only,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fork repository ${repo.nameWithOwner} : ${response.statusText}`,
      );
    }
    return response.statusText;
  } catch (error) {
    //console.log("error deleting viewer repos", error);
    throw error;
  }
}
