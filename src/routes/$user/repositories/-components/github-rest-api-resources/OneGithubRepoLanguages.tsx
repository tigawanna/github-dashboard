import { use } from "react";
import * as colors from "./colors.json";
import { useSuspenseQuery } from "@tanstack/react-query";

interface OneGithubRepoLanguagesProps {
  repo: string;
  owner: string;
}

export function OneGithubRepoLanguages({ repo, owner }: OneGithubRepoLanguagesProps) {
  async function fetchLanguages() {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${owner}/${repo}`);
      }
      const data = await response.json();
      return {result:data as Record<string, number>,error:null}
    } catch (error:any) {
      return {
        result:null,
        error:error.message
      }
    }
  }
  const query = useSuspenseQuery({
    queryKey:["languages",repo,owner],
    queryFn: fetchLanguages,
    staleTime: 1000 * 60 * 60 * 24,
  });
  const data= query.data.result
  // console.log( "OneGithubrepolanguage data ==== ",data)
  if (!data) {
    return null;
  }

  return (
    <div className="bg-base-200 rounded-lg p-3 flex items-center justify-center">
      <GithubLanguages data={data} width={500} />
    </div>
  );
}

export interface GithubLanguagesProps {
  data: Record<string, number>;
  width: number;
  textColor?: string;
  lightColor?: string;
}

export function GithubLanguages(props: GithubLanguagesProps) {
  if (!props.data) {
    return null;
  }
  const total = Object.values(props.data).reduce((a, b) => a + b, 0);
  return (
    <div className="flex flex-col gap-1 w-full">
      <h2 className="text-2xl">Languages</h2>
      <div className="w-full">
        <ul className="w-full flex flex-wrap list-none m-0 p-0 gap-2 overflow-hidden ">
          {Object.entries(props.data).map(([k, v], index: number) => {
            const percent = (v / total) * 100;
            const percetage = percent < 5 ? percent + 5 : percent;
            return (
              <li
                key={k}
                className="md:max-w-[80%]"
                style={{
                  width: `${percetage}%`,
                }}>
                <div
                  className="min-w-3  rounded-lg w-full h-4"
                  style={{
                    backgroundColor: colors[k as keyof typeof colors]["color"] ?? "",
                  }}>
                  .
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full">
        <ul className="flex flex-wrap list-none m-0 p-0 gap-2 overflow-hidden">
          {Object.keys(props.data).map((language: string) => {
            return (
              <li key={`${language}-name`} className="flex  items-center">
                <span
                  className="w-3 h-3"
                  style={{
                    backgroundColor: colors[language as keyof typeof colors]["color"] ?? "",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontWeight: 700,
                    marginLeft: 5,
                    marginRight: 5,
                    color: props.textColor,
                  }}>
                  {language}
                </span>
                <span style={{ color: props.lightColor || "gray" }}>
                  {((props.data[language] / total) * 100).toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
