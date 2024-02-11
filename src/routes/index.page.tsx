import { PageProps } from "rakkasjs";
import { SearchBar } from "./components/search/SearchBar";

export default function HomePage({}: PageProps) {
  return (
    <main className="flex flex-col items-center justify-center w-full max-h-screen h-full gap-3">
      <h2 className="text-3xl font-bold">Github Dashboard</h2>
      <SearchBar/>
    </main>
  );
}
