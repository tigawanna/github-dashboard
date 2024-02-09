import { ItemList } from "../types";


export async function deleteRepositories(repos: ItemList[], token: string) {
  try {


    const deleteRepos = repos.map((repo)=>{
      return fetch(`https://api.github.com/repos/${repo.nameWithOwner}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
  const responses = await Promise.all(deleteRepos)
 responses.map((item)=>{

 })
    // for await (const repo of repos) {
    //   const response = await fetch(
    //     `https://api.github.com/repos/${repo.nameWithOwner}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );

    //   if (!response.ok) {
    //     //console.log(`Repository ${repo.nameWithOwner} deleted successfully`);
    //     failed_deltions.push(repo);
    //   } else {
    //     successful_deletions.push(repo);
    //     // return response;
    //   }
    // }
    // return { failed_deltions, successful_deletions };
  } catch (error) {
    //console.log("error deleting viewer repos", error);
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
    return response.statusText
  } catch (error) {
    //console.log("error deleting viewer repos", error);
    throw error;
  }
}
