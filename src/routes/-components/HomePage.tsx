import { FlipClock } from "@/components/flip-clock/DigitalFlipClock";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { ResponsiveGenericToolbar } from "./ResponsiveGenericToolbar";

export function HomePage() {
  return (
    <div
      data-test="homepage"
      className="justify-center flex h-full min-h-screen w-full flex-col items-center overflow-auto bg-linear-to-br from-primary/60 via-red/60 to-primary/30"
    >
      <Helmet
        title="My property manager"
        description="Welcome to your property manager"
      />

      <ResponsiveGenericToolbar>
        <div className="flex h-full  w-full flex-col items-center justify-center gap-5 p-3 ">
          <div
            data-test="homepage-section"
            className="grid grid-cols-1 justify-center gap-[5%]  *:flex *:items-center *:rounded-xl *:bg-base-200/40 *:p-5 md:grid-cols-2 lg:w-[80%] lg:grid-cols-2"
          >
            <h1
              data-test="homepage-section-welcome"
              className="break-all text-7xl font-bold text-primary"
            >
              welcome 
            </h1>
            <FlipClock />

          </div>
          <div className="h-24 w-full -z-10 " />
        </div>
      </ResponsiveGenericToolbar>
    </div>
  );
}
