import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-2">
      <Skeleton className="h-8 w-full rounded-lg mb-10" />
      <Skeleton className="h-5 w-[250px] rounded-lg mb-5" />
      <div className="grid max-md:grid-cols-1 max-lg:grid-cols-3 grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
