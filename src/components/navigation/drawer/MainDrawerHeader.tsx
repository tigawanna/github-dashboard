import SiteIcon from "@/components/icons/Siteicon";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link } from "@tanstack/react-router";


interface MainDrawerHeaderProps {

}

export function MainDrawerHeader({}:MainDrawerHeaderProps){
  const { setOpenMobile} = useSidebar();
  return (
    <div
      className="flex flex-col gap-3 "
      onClick={() => {
        setOpenMobile(false);
      }}>
      <Link
        to="/"
        className="flex w-full items-center justify-center border-b border-primary py-4 hover:bg-primary/20">
        <SiteIcon height={50} />
      </Link>
    </div>
  );
}
