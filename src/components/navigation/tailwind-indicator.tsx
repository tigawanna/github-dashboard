export function TailwindIndicator() {
  if (!import.meta.env.DEV) return null;

  return (
    <div className=" flex items-center rounded-2xl p-1  justify-center bg-primary font-bold">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
export function TailwindContainerIndicator() {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex gap-2 bg-primary p-1 rounded-2xl">
      <div className="@sm:flex @md:hidden hidden">Container SM</div>
      <div className="@sm:hidden @md:flex @lg:hidden hidden">Container MD</div>
      <div className="@md:hidden @lg:flex @xl:hidden hidden">Container LG</div>
      <div className="@sm:hidden @md:hidden @lg:hidden @xl:flex @2xl:hidden hidden">Container XL</div>
      <div className="@md:hidden @lg:hidden @xl:hidden @2xl:flex hidden">Container 2XL</div>
    </div>
  );
}
