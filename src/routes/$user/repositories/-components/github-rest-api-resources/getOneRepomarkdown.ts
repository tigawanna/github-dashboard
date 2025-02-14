import { convertMarkdownToHtml } from "./convertMarkdownToHtml";


interface GetRepoREADME {
  repo: string;
  owner: string;
  branch?: string;
}
export async function getGithubREADME({ repo, owner, branch="main" }: GetRepoREADME) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const text = await response.text();
    // console.log(" === readme markdown  === ", text);
    if (!text) {
      throw new Error("no parsable readme");
    }
    const output_html = convertMarkdownToHtml(text);
    return output_html;
  } catch (error) {
    console.log(" === error === ", error);
    return;
  }
}
