import SiteIcon from "@/components/icons/Siteicon";

interface RouterPendingComponentProps {}

export function RouterPendingComponent({}: RouterPendingComponentProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <div className="skeleton h-[80vh] w-[95%] flex justify-center items-center rounded-2xl bg-base-300/30" >
      <SiteIcon height={250}/>
      </div>
    </div>
  );
}
