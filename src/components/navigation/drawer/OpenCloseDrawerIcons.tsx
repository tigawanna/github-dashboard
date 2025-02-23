import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface OpenCloseDrawerIconsProps {

}

export function OpenCloseDrawerIcons({}:OpenCloseDrawerIconsProps){
const { state } = useSidebar();
if(state === "expanded" ){
    return (<ChevronsLeft />)
}
return <ChevronsRight />

}
