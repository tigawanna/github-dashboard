
import { PageProps, useSSQ } from "rakkasjs";
export default function TestPage({}: PageProps) {
  const query = useSSQ(() => {
    const PAT = import.meta.env
    console.log(" ====== PAT ====== ", PAT)
    return "yoly"
  });

  return (
    <div className="w-full h-full flex items-center justify-center bg-yellow-700">
      <div className="text-xl font-bold">{query.data}</div>
    </div>
  );
}
