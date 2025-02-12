interface GeneriicTableSkeletonProps {
  columns?: number;
  rows?: number;
}
export function GeneriicTableSkeleton({
  rows,
  columns,
}: GeneriicTableSkeletonProps) {
  const data = Array.from({ length: rows ?? 12 });
  return (
    <div className="min-h-screen w-full overflow-auto">
        <div className="sticky top-0 h-12 bg-base-300 p-2"/>
      <ul className="flex h-full w-full flex-col gap-2 p-2">
        {data?.map((_, idx) => {
          return <li key={idx} className="min-h-8 rounded-none flex gap-1 w-full" >
            {Array.from({ length: columns ?? 4 }).map((_, idx) => {
              return <div key={idx} className="skeleton w-full bg-base-300 p-1 rounded-none" />;
            })}
          </li>;
        })}
      </ul>
    </div>
  );
}
