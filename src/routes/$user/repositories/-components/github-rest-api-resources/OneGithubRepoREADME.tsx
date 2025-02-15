import { useSuspenseQuery } from "@tanstack/react-query";
import { getGithubREADME } from "./getOneRepomarkdown";


interface OneGithubRepoREADMEProps {
  repo: string;
  owner: string;
  branch?: string;
}

export  function OneGithubRepoREADME({ owner, repo,branch="main" }: OneGithubRepoREADMEProps) {
  // const data = await getGithubREADME({ owner, repo });
  const query = useSuspenseQuery({
    queryKey: ["readme", repo, owner,branch],
    queryFn: async() =>{
      try {
        const data = await getGithubREADME({ owner, repo,branch });
        if(!data){
          return {
            result:null,
            error:"no parsable readme"
          }
        }
        return {
          result:data,
          error:null
        }
      } catch (error) {
        return {
          result:null,
          error:"no parsable readme"
        }
      }
      },
    staleTime: 1000 * 60 * 60 * 24,
  })
  const data = query?.data?.result
  if (!data) {
    return null;
  }
// console.log("=== data === ",data)
  return (
    <div
      id="readme"
      className="w-full h-full bg-primary/10 p-5 rounded-xl ">
      {/* <h2 className="text-2xl font-bold text-start w-full capitalize">{repo} readme</h2> */}
      <div className="markdown" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
