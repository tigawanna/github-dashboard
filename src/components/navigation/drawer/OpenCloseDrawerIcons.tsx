import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface OpenCloseDrawerIconsProps {

}

export function OpenCloseDrawerIcons({}:OpenCloseDrawerIconsProps){
const { state, isMobile } = useSidebar();
if(state === "expanded" || isMobile){
    return (<ChevronsLeft />)
}
return <ChevronsRight />

}
