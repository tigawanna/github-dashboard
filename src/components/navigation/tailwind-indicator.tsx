export function TailwindIndicator() {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed left-[50%] top-[1.5%] z-50 flex size-8 items-center justify-center bg-base-100 font-bold">
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
    <div className="flex gap-2">
      <div className="@sm:flex @md:hidden hidden">SM</div>
      <div className="@sm:hidden @md:flex @lg:hidden hidden">MD</div>
      <div className="@md:hidden @lg:flex @xl:hidden hidden">LG</div>
      <div className="@md:hidden @lg:hidden @xl:flex hidden">XL</div>
      <div className="@md:hidden @lg:hidden @xl:hidden @2xl:flex hidden">2XL</div>
    </div>
  );
}
