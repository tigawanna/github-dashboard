import { PageProps } from "rakkasjs"
import { ViewerReposSuspenseFallback } from "../viewer/components/repos/components"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full ">
    <ViewerReposSuspenseFallback/>
</div>
)}
