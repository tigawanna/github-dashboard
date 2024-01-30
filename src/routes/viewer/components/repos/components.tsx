export function ViewerReposSuspenseFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className="flex flex-wrap gap-2 w-full items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => {
          return (
            <li
              key={i}
              className="bg-base-200 p-5 rounded-lg h-60 w-[95%] md:w-[40%]
               xl:w-[30%] flex-grow flex flex-col justify-between gap-2">
              <div className="h-5 w-[60%] bg-base-100 rounded-md skeleton"></div>
              <div className="h-5 w-[80%] bg-base-100 rounded-md skeleton"></div>
              <div className="h-7 w-[80%] bg-base-100 rounded-lg skeleton"></div>
              <div className="h-24 -[80%] bg-base-100 rounded-lg skeleton"></div>
              <div className="w-full flex gap-2 justify-evenly items-center">
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
                <div className="h-5 w-full bg-base-100 rounded-lg skeleton"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
