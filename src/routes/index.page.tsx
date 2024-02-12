import { PageProps } from "rakkasjs";
import { SearchBar } from "./components/search/SearchBar";

export default function HomePage({url}: PageProps) {
  // console.log(" ===== url in home ===== ",url)
  return (
    <main className="  w-full flex flex-col gap-3 ">
      <h2 className="text-3xl font-bold">Github Dashboard</h2>
      <SearchBar/>
    </main>
  );
}
