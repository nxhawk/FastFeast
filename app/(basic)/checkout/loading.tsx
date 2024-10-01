import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex max-md:flex-col gap-5 pt-8">
      <div className="w-7/12 max-md:w-full">
        <Skeleton className="h-60 w-full rounded-lg mb-8" />
        <Skeleton className="h-5 w-32 rounded-lg mb-4" />
        <Skeleton className="h-16 w-60 rounded-lg" />
      </div>
      <div className="w-5/12 max-md:w-full">
        <Skeleton className="h-[24rem] w-full rounded-lg mb-3" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default Loading;
